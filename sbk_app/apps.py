from django.apps import AppConfig


class SbkAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sbk_app'

    def ready(self):
        from config.scheduler import start
        from config.check_comp import archiviazione_post_datata

        #check al riavvio per eventuali task non archiaviate ma completate
        #archiviazione_post_datata()

        #avvia lo script su thread separato per l'archiviazione a fine giornata
        start()