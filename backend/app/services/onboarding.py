from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.answers import Answers
from app.models.user import User
from app.schemas.onboarding import AnswersRequest


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

