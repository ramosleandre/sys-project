from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import CurrentAuth, get_current_auth
from app.core.database import get_db
from app.schemas.onboarding import AnswersRequest, AnswersResponse, GeneratedPlan, Questions
from app.services.onboarding import (
    create_answers,
    create_plan,
    delete_answer_by_id,
    get_answer_by_id,
    get_answer_by_user_id,
    get_questions
)

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

@router.delete("/answers/answer/{answer_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_answer(
    answer_id: int,
    db: Session = Depends(get_db),
    current_auth: CurrentAuth = Depends(get_current_auth),
) -> None:
    deleted = delete_answer_by_id(db, answer_id, current_auth.user)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Answer not found.",
        )

    return None


@router.get("/answers/answer/{answer_id}", response_model=AnswersResponse)
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

@router.get("/answers/user/{user_id}", response_model=list[AnswersResponse])
async def get_answer(
    user_id: int,
    db: Session = Depends(get_db),
) -> list[AnswersResponse]:
    answers = get_answer_by_user_id(db, user_id)
    if answers is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Answers not found.",
        )

    return answers

@router.post(
    "/generate-plan",
    response_model=GeneratedPlan,
    status_code=status.HTTP_201_CREATED,
)
async def generate_plan(
    db: Session = Depends(get_db),
    current_auth: CurrentAuth = Depends(get_current_auth),
) -> GeneratedPlan:
    try:
        plan = create_plan(db, current_auth.user)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    return plan

@router.get("/questions", response_model=list[Questions])
async def get_api_questions(
    db: Session = Depends(get_db),
) -> list[Questions]:
    return get_questions(db)


# @router.get(
#     "/generate-plan",
#     response_model=GeneratedPlan,
# )
# async def get_plan(
#     db: Session = Depends(get_db),
#     current_auth: CurrentAuth = Depends(get_current_auth),
# ) -> GeneratedPlan:
#     try:
        
