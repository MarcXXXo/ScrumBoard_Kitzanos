from django.apps import AppConfig


class SbkAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sbk_app'

    def ready(self):
        from config import scheduler
        scheduler.start()