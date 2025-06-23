"""
Configurazioni di Django per il progetto ScrumBoard_Kitzanos.

Generato con 'django-admin startproject' utilizzando Django 5.2.2.

Per maggiori informazioni su questo file, consulta:
https://docs.djangoproject.com/en/5.2/topics/settings/

Per la lista completa delle impostazioni e i valori possibili, consulta:
https://docs.djangoproject.com/en/5.2/ref/settings/
"""

import os
from pathlib import Path
import dj_database_url

# BASE_DIR indica la cartella radice del progetto
BASE_DIR = Path(__file__).resolve().parent.parent

# ========================
# CONFIGURAZIONE SICUREZZA
# ========================

# IMPORTANTE: mantienere segreta questa chiave in produzione
# Caricarla da variabili ambiente per motivi di sicurezza
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-)#--s@@6wv#wtc2z0very1=&rx7=qgn)z)i^27%kci+y+_9(p3')

# Modalità debug, deve essere False in produzione
DEBUG = os.getenv('DJANGO_DEBUG', 'True') == 'True'

# Host consentiti per eseguire l'applicazione
ALLOWED_HOSTS = ['scrumboard-k.onrender.com', '127.0.0.1']

# URL di reindirizzamento dopo login e logout
LOGIN_REDIRECT_URL = '/home/'
LOGOUT_REDIRECT_URL = '/accounts/login/'

# ========================
# APPLICAZIONI INSTALLATE
# ========================

INSTALLED_APPS = [
    # App di base Django
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # App personalizzate del progetto
    'sbk_app',
    'accounts',
]

# ========================
# MIDDLEWARE
# ========================

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Middleware WhiteNoise per servire file statici in produzione:
    # Da decommentare per deploy su Render.com
    #'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',  # Protezione CSRF
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Gestione autenticazione
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',  # Protezione clickjacking
]

# ========================
# CONFIGURAZIONE URL PRINCIPALE
# ========================

ROOT_URLCONF = 'config.urls'

# ========================
# CONFIGURAZIONE TEMPLATE
# ========================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',  # Motore template Django
        'DIRS': [os.path.join(BASE_DIR, 'templates')],  # Cartella template personalizzati
        'APP_DIRS': True,  # Cerca template dentro le app installate
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',  # Permette di usare "request" nei template
                'django.contrib.auth.context_processors.auth',  # Aggiunge dati utente autenticato al contesto
                'django.contrib.messages.context_processors.messages',  # Aggiunge messaggi di feedback
            ],
        },
    },
]

# ========================
# APPLICAZIONE WSGI
# ========================

WSGI_APPLICATION = 'config.wsgi.application'

# ========================
# CONFIGURAZIONE DATABASE
# ========================

# Imposta il database; di default SQLite per sviluppo
# In produzione usa variabile ambiente per caricare Postgres o altro DB
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{os.path.join(BASE_DIR, 'db.sqlite3')}",
        conn_max_age=600,  # Mantieni connessione aperta per 10 minuti
        ssl_require=not DEBUG,  # Richiedi SSL in produzione
    )
}

#Da decommentare per deploy su Render.com
#DATABASES["default"] = dj_database_url.parse("postgresql://sbk_app_user:vPYCsxvOXpjSi3fkehdEOjiRLeI26d6G@dpg-d15v9uodl3ps7387nu7g-a.frankfurt-postgres.render.com/sbk_app")

# ========================
# VALIDATORI PASSWORD
# ========================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# ========================
# LOCALIZZAZIONE E ORARIO
# ========================

LANGUAGE_CODE = 'it'  # Lingua del progetto

TIME_ZONE = 'UTC'  # Fuso orario

USE_I18N = True  # Supporto internazionalizzazione
USE_L10N = True
USE_TZ = True  # Uso timezone-aware datetime

# ========================
# FILE STATICI (CSS, JS, Immagini)
# ========================

STATIC_URL = '/static/'  # URL base per file statici

# Cartella dove vengono raccolti i file statici con collectstatic in produzione
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Cartelle aggiuntive dove Django cerca file statici in sviluppo
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'sbk_app', 'static')]

# Storage WhiteNoise per migliore gestione file statici compressi e caching
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ========================
# CAMPO PRIMARIO DI DEFAULT PER MODELLI
# ========================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
