from apscheduler.schedulers.background import BackgroundScheduler
from django.utils import timezone
from sbk_app.models import Task

def move_completed_tasks_to_history():
    now = timezone.now()
    tasks = Task.objects.filter(completata=True, data_archiviazione__isnull=True)
    for task in tasks:
        task.data_archiviazione = now.date()
        task.archiviata = True #Flag per dire che va messa nell'archivio
        #task.completata = False #Flag per toglierla dalle completate
        task.save()
    print(f"[Scheduler] Archiviate {tasks.count()} task completate al {now.date()}.")

def start():
    scheduler = BackgroundScheduler()
    # Pianifica il job ogni giorno a mezzanotte
    scheduler.add_job(move_completed_tasks_to_history, 'cron', hour=23, minute=59)
    scheduler.start()