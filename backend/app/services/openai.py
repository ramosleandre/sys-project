import json
import logging

from openai import OpenAI as OpenAIClient

from app.schemas.onboarding import GeneratedPlanPayload


class PlanGenerator:
    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def generate_plan_ai(self, diagnosis, goals, constraint) -> GeneratedPlanPayload:
        prompt = f"""Tu dois générer un plan pour que l'utilisateur lutte contre la procrastination L'objectif est qu'en fonction de ses informations, le plan va réduire son temps d'utilisation des réseaux sociaux (instagram, tiktok etc) par de bonnes habitudes.
            Voici la liste des questions répondus par l'utilisateur :
            -Diagnostique: {diagnosis}
            -Objectifes: {goals}
            -Contrainte: {constraint}.
            
            Génère UNIQUEMENT un JSON valide, sans markdown, sous ce format:
            {{
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
            }}"""
        
        client = OpenAIClient()

        self.logger.info(f"Envoi du prompt à gpt-5.5: {prompt}")
        response = client.responses.create(
            model="gpt-5.5",
            input=prompt
        )
        self.logger.info(f"Réponse brut de GPT: {response}")

        return GeneratedPlanPayload.model_validate(json.loads(response.output_text))
