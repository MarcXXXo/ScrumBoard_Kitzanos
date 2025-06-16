from django.urls import path, include
from . import views

urlpatterns = [
    # URL per la pagina principale
    path("", views.home, name="home"),

    # URL per completare un task 
    path("complete_task/", views.complete_task, name='complete_task'),

    # URL per eliminare un task specifico, identificato dall'id task_id
    path("elimina_task/<int:task_id>/", views.elimina_task, name="elimina_task"),

    # URL per il drag and drop delle task 
    path('update_priority/', views.update_priority, name='update_priority'),
]