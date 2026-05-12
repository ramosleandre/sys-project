from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import CurrentAuth, get_current_auth
from app.core.database import get_db
from app.schemas.onboarding import AnswersRequest, AnswersResponse
from app.services.onboarding import create_answers, get_answer_by_id

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

@router.get("/answers/{answer_id}", response_model=AnswersResponse)
async def get_answer(
    answer_id: int,
    db: Session = Depends(get_db),
    current_auth: CurrentAuth = Depends(get_current_auth),
) -> AnswersResponse:
    answer = get_answer_by_id(db, answer_id, current_auth.user)
    if answer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Answer not found.",
        )

    return answer
