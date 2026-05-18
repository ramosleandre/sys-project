"""create questions table

Revision ID: 20260518_0900
Revises: 20260514_0900
Create Date: 2026-05-18 09:00:00.000000
"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "20260518_0900"
down_revision: Union[str, None] = "20260514_0900"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


questions_table = sa.table(
    "questions",
    sa.column("id", sa.Integer()),
    sa.column("text", sa.String(length=255)),
)


def upgrade() -> None:
    op.create_table(
        "questions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("text", sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_questions_id"), "questions", ["id"], unique=False)

    op.bulk_insert(
        questions_table,
        [
            {"id": 1, "text": "Quel est ton principal problème ?"},
            {"id": 2, "text": "Quelles apps utilise tu le plus ?"},
            {"id": 3, "text": "Combien d'heures par jours sur les réseaux ?"},
            {"id": 4, "text": "A quels moment tu décroches ?"},
            {"id": 5, "text": "Qu'est ce que tu aimerais faire à la place ?"},
            {"id": 6, "text": "Objectifs précis ou juste moins ?"},
            {"id": 7, "text": "As tu besoin des réseaux pour le travail ?"},
        ],
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_questions_id"), table_name="questions")
    op.drop_table("questions")
