from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.answers import Answers
from app.models.user import User
from app.schemas.onboarding import AnswersRequest, GeneratedPlan
from app.services.openai import OpenAI

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

def get_answer_by_user_id(db: Session, user_id: int) -> list[Answers] | None:
    return list(
        db.scalars(
            select(Answers).where(
                Answers.user_id == user_id
            )
        )
    )

def create_plan(db: Session,  current_user: User) -> GeneratedPlan | None:
    user_answers: Answers = get_answer_by_user_id(db, current_user.id)
    diagnosis: list[Answers] = []
    goals: list[Answers] = []
    contraint: Answers = []

    for answer in user_answers:
        if answer.question_id <= 4:
            diagnosis.append(answer)
        if answer.question_id > 4 and answer.question_id <= 6:
            goals.append(answer)
        if answer.question_id == 7:
            contraint = answer
    plan: GeneratedPlan = OpenAI().generate_plan_ai(diagnosis, goals, contraint)

    db.add(plan)
    db.commit()
    db.refresh(plan)

    return plan
