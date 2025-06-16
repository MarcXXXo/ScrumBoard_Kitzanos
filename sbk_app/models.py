from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    # Scelte per il tipo di task
    TIPO_CHOICES = [
        ('Email', 'Email'),
        ('Telefono', 'Telefono'),
        ('Documento', 'Documento'),
        ('Call', 'Call'),
        ('Task', 'Task'),
        ('Decisione', 'Decisione'),
    ]

    # Scelte per la priorità del task
    PRIORITA_CHOICES = [
        ('UI', 'Urgente e Importante'),
        ('IN', 'Importante Non Urgente'),
        ('UN', 'Urgente Non Importante'),
        ('NN', 'Non Urgente Non Importante'),
    ]

    # Descrizione del task
    descrizione = models.CharField(max_length=25)
    # Tipo del task, con scelte predefinite
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    # Priorità del task, con scelte predefinite
    priorita = models.CharField(max_length=2, choices=PRIORITA_CHOICES)
    # Utente che ha creato il task
    creatore = models.ForeignKey(User, on_delete=models.CASCADE)
    # Utente che ha modificato il task
    modificato_da = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks_modifica')
    # Utente a cui è assegnato il task
    assegnato_a = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name="task_assegnate")
    # Stato di completamento del task
    completata = models.BooleanField(default=False)
    # Data di creazione del task
    data_creazione = models.DateTimeField(auto_now_add=True)
    # Note aggiuntive sul task
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.descrizione} - {self.priorita}"
