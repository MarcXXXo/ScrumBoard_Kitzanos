from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    TIPO_CHOICES = [
        ('Email', 'Email'),
        ('Telefono', 'Telefono'),
        ('Documento', 'Documento'),
        ('Call', 'Call'),
        ('Task', 'Task'),
        ('Decisione', 'Decisione'),
    ]

    PRIORITA_CHOICES = [
        ('UI', 'Urgente e Importante'),
        ('IN', 'Importante Non Urgente'),
        ('UN', 'Urgente Non Importante'),
        ('NN', 'Non Urgente Non Importante'),
    ]

    #task_id = models.IntegerField(models.UUIDField)
    descrizione = models.CharField(max_length=255)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    priorita = models.CharField(max_length=2, choices=PRIORITA_CHOICES)
    creatore = models.ForeignKey(User, on_delete=models.CASCADE)
    completata = models.BooleanField(default=False)
    data_creazione = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.descrizione} - {self.priorita}"