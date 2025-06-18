import os
import django

#file da runnare manualmente con python 'run_archive.py' per testare archiviazione automatica

# Configura l'ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')  
django.setup()

from config.scheduler import archiviazione_timerata

archiviazione_timerata()