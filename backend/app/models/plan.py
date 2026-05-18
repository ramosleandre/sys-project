from datetime import date, datetime

from sqlalchemy import Boolean, Date, Float, Integer, JSON, String, Text, text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql.sqltypes import TIMESTAMP

from app.core.database import Base


class Plan(Base):
    __tablename__ = "plans"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    main_problem: Mapped[str] = mapped_column(String(50), nullable=False)
    blocked_apps: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    user_goal: Mapped[str] = mapped_column(Text, nullable=False)
    plan_type: Mapped[str] = mapped_column(String(50), nullable=False)
    start_date: Mapped[date] = mapped_column(Date, nullable=False)
    duration_weeks: Mapped[int] = mapped_column(Integer, nullable=False)
    initial_daily_screen_time_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    initial_weekly_screen_time_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    target_daily_screen_time_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    target_weekly_screen_time_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    daily_reduction_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    weekly_time_saved_minutes: Mapped[int] = mapped_column(Integer, nullable=False)
    monthly_time_saved_hours: Mapped[float] = mapped_column(Float, nullable=False)
    yearly_time_saved_hours: Mapped[float] = mapped_column(Float, nullable=False)
    habits: Mapped[list[dict]] = mapped_column(JSON, nullable=False)
    needs_social_apps_for_work: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    work_allowed_apps: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    motivational_sentence: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        nullable=False,
        server_default=text("now()"),
    )
