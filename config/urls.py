"""
Configurazione URL per il progetto ScrumBoard_Kitzanos.

Includere un altro URLconf
    1. Importa la funzione include(): from django.urls import include, path
    2. Aggiungi un URL a urlpatterns: path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    # URL per l'admin di Django
    path('admin/', admin.site.urls),

    # Includi le URL dell'app sbk_app
    path('home/', include('sbk_app.urls')),

    # Includi le URL dell'app accounts
    path('accounts/', include('accounts.urls')),

    # Reindirizza dalla root a /home/
    path('', lambda request: redirect('home', permanent=False)), 
]
