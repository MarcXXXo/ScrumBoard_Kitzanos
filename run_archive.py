import os
import django

# Configura l'ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')  # usa il nome giusto se non è "config"
django.setup()

from config.scheduler import move_completed_tasks_to_history

move_completed_tasks_to_history()