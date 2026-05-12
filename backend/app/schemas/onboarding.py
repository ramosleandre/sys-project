from datetime import datetime

from pydantic import BaseModel


class AnswersResponse(BaseModel):
    id: int
    user_id: int
    question_id: int
    answer_value: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class AnswersRequest(BaseModel):
    question_id: int
    answer_value: str
