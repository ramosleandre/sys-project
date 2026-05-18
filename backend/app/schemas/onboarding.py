from pydantic import BaseModel
from typing import List, Optional, Literal
from datetime import time, date, datetime

class Questions(BaseModel):
    id: int
    text: str

    model_config = {"from_attributes": True}

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

class Habit(BaseModel):
    title: str

    start_time: time
    duration_minutes: int
    days: List[
        Literal[
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        ]
    ]

class GeneratedPlanPayload(BaseModel):
    title: str
    summary: str
    main_problem: Literal[
        "social_networks",
        "sleep",
        "productivity",
        "bad_habits",
        "other"
    ]
    blocked_apps: List[str]
    user_goal: str
    plan_type: Literal[
        "progressive_reduction",
        "strict_blocking",
        "habit_building",
        "mixed"
    ] = "progressive_reduction"

    start_date: date
    duration_weeks: int = 4

    initial_daily_screen_time_minutes: int
    initial_weekly_screen_time_minutes: int

    target_daily_screen_time_minutes: int
    target_weekly_screen_time_minutes: int

    daily_reduction_minutes: int
    weekly_time_saved_minutes: int
    monthly_time_saved_hours: float
    yearly_time_saved_hours: float

    habits: List[Habit]

    needs_social_apps_for_work: bool = False
    work_allowed_apps: Optional[List[str]] = []

    motivational_sentence: str


class GeneratedPlan(GeneratedPlanPayload):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
