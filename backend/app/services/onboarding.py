from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.answers import Answers
from app.models.plan import Plan
from app.models.question import Question
from app.models.user import User
from app.schemas.onboarding import AnswersRequest, GeneratedPlanPayload, Questions
from app.services.openai import PlanGenerator
import logging

logger = logging.getLogger(__name__)


def create_answers(db: Session, payload: AnswersRequest, current_user: User) -> Answers:
    now = datetime.now(timezone.utc)

    answer = Answers(
        user_id=current_user.id,
        question_id=payload.question_id,
        answer_value=payload.answer_value,
        created_at=now,
        updated_at=now,
    )

    db.add(answer)
    db.commit()
    db.refresh(answer)

    return answer


def get_answer_by_id(db: Session, answer_id: int, current_user: User) -> Answers | None:
    return db.scalar(
        select(Answers).where(
            Answers.id == answer_id,
            Answers.user_id == current_user.id,
        )
    )


def delete_answer_by_id(db: Session, answer_id: int, current_user: User) -> bool:
    answer = get_answer_by_id(db, answer_id, current_user)
    if answer is None:
        return False

    db.delete(answer)
    db.commit()

    return True


def get_answer_by_user_id(db: Session, user_id: int) -> list[Answers]:
    return list(
        db.scalars(
            select(Answers).where(
                Answers.user_id == user_id
            )
        )
    )

def create_plan(db: Session, current_user: User) -> Plan:
    user_answers = get_answer_by_user_id(db, current_user.id)
    if not user_answers:
        raise ValueError("Cannot generate a plan without onboarding answers.")

    diagnosis: list[Answers] = []
    goals: list[Answers] = []
    constraint: Answers | None = None

    for answer in user_answers:
        if answer.question_id <= 4:
            diagnosis.append(answer)
        if answer.question_id > 4 and answer.question_id <= 6:
            goals.append(answer)
        if answer.question_id == 7:
            constraint = answer

    generated_plan: GeneratedPlanPayload = PlanGenerator().generate_plan_ai(
        diagnosis,
        goals,
        constraint,
    )
    plan = Plan(user_id=current_user.id, **generated_plan.model_dump())

    db.add(plan)
    db.commit()
    db.refresh(plan)

    return plan

def get_questions(db: Session) -> list[Questions]:
    return list(
        db.scalars(
            select(Question).order_by(
                Question.id
            )
        )
    )
