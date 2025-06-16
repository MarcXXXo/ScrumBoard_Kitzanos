from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# Form personalizzato per la creazione di un utente
class CustomUserCreationForm(UserCreationForm):
     # Campo aggiuntivo per indicare se l'utente è un coordinatore (opzionale)
    is_coordinator = forms.BooleanField(required=False, label="Coordinatore")

    class Meta:
        model = User # Usa il modello User di Django
        # Campi inclusi nel form di registrazione, con il campo personalizzato is_coordinator
        fields = ("username", "password1", "password2", "is_coordinator")