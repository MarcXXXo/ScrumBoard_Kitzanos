from apscheduler.schedulers.background import BackgroundScheduler
from django.utils import timezone
from sbk_app.models import Task

def archiviazione_timerata():
    oggi = timezone.now().date()
    tasks = Task.objects.filter(completata=True, data_archiviazione__isnull=True)
    for task in tasks:
        task.data_archiviazione = oggi
        task.archiviata = True #Flag per dire che va messa nell'archivio
        #task.completata = False #Flag per toglierla dalle completate
        task.save()
    print(f"[Scheduler] Archiviate {tasks.count()} task completate al {oggi}.")

def start():
    scheduler = BackgroundScheduler()
    # Pianifica il job ogni giorno a mezzanotte
    scheduler.add_job(archiviazione_timerata, 'cron', hour=23, minute=59)
    scheduler.start()