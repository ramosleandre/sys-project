"""create plans table

Revision ID: 20260514_0900
Revises: 20260512_1200
Create Date: 2026-05-14 09:00:00.000000
"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "20260514_0900"
down_revision: Union[str, None] = "20260512_1200"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "plans",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=160), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("main_problem", sa.String(length=50), nullable=False),
        sa.Column("blocked_apps", sa.JSON(), nullable=False),
        sa.Column("user_goal", sa.Text(), nullable=False),
        sa.Column("plan_type", sa.String(length=50), nullable=False),
        sa.Column("start_date", sa.Date(), nullable=False),
        sa.Column("duration_weeks", sa.Integer(), nullable=False),
        sa.Column("initial_daily_screen_time_minutes", sa.Integer(), nullable=False),
        sa.Column("initial_weekly_screen_time_minutes", sa.Integer(), nullable=False),
        sa.Column("target_daily_screen_time_minutes", sa.Integer(), nullable=False),
        sa.Column("target_weekly_screen_time_minutes", sa.Integer(), nullable=False),
        sa.Column("daily_reduction_minutes", sa.Integer(), nullable=False),
        sa.Column("weekly_time_saved_minutes", sa.Integer(), nullable=False),
        sa.Column("monthly_time_saved_hours", sa.Float(), nullable=False),
        sa.Column("yearly_time_saved_hours", sa.Float(), nullable=False),
        sa.Column("habits", sa.JSON(), nullable=False),
        sa.Column("needs_social_apps_for_work", sa.Boolean(), nullable=False),
        sa.Column("work_allowed_apps", sa.JSON(), nullable=False),
        sa.Column("motivational_sentence", sa.Text(), nullable=False),
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_plans_id"), "plans", ["id"], unique=False)
    op.create_index(op.f("ix_plans_user_id"), "plans", ["user_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_plans_user_id"), table_name="plans")
    op.drop_index(op.f("ix_plans_id"), table_name="plans")
    op.drop_table("plans")
