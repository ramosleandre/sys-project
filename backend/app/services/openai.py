from openai import OpenAI
import logging

class OpenAI:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        pass

    def generate_plan_ai(self, diagnosis, goals, contraint):
        prompt = f"""Tu dois générer un plan pour que l'utilisateur lutte contre la procrastination L'objectif est qu'en fonction de ses informations, le plan va réduire son temps d'utilisation des réseaux sociaux (instagram, tiktok etc) par de bonnes habitudes.
            Voici la liste des questions répondus par l'utilisateur :
            -Diagnostique: {diagnosis}
            -Objectifes: {goals}
            -Contrainte: {contraint}.
            
            Génère UNIQUEMENT une réponse sous ce format JSON:
            {{
                id: int
                user_id: int
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

                created_at: datetime
                updated_at: datetime
            }}"""
        
        client = OpenAI()

        self.logger.info(f"Envoi du prompt à gpt_5.5: {prompt}")
        response = client.responses.create(
            model="gpt_5.5",
            input=prompt
        )
        self.logger.info(f"Réponse brut de GPT: {response}")

        return response