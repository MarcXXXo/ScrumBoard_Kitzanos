from django.utils import timezone
from sbk_app.models import Task

# Funzione che al riavvio del server controlla che non ci siano task completate pregresse e non archiviate,
# se le trova le archivia con la data di completamento

def archiviazione_post_datata():
    today = timezone.now().date()
    tasks = Task.objects.filter(
        completata=True,
        archiviata=False,
        data_completamento__lt=today  
    )
    for task in tasks:
        task.data_archiviazione = task.data_completamento  
        task.archiviata = True
        task.save()
    print(f"[Startup] Archiviate {tasks.count()} task completate con data pregressa.")