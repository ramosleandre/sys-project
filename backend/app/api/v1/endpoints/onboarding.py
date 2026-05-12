from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import CurrentAuth, get_current_auth
from app.core.database import get_db
from app.schemas.onboarding import AnswersRequest, AnswersResponse
from app.services.onboarding import create_answers

router = APIRouter(prefix="/onboarding")


@router.post("/answers", response_model=list[AnswersResponse])
async def submit_answers(
    questions: list[AnswersRequest],
    db: Session = Depends(get_db),
    current_auth: CurrentAuth = Depends(get_current_auth),
) -> list[AnswersResponse]:
    answers = []
    for question in questions:
        answers.append(create_answers(db, question, current_auth.user))
    return answers
