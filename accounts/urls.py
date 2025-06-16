from django.urls import path
from . import views

urlpatterns = [
    # URL per la pagina di login
    path('login/', views.login_view, name='login'),

    # URL per la pagina di logout
    path('logout/', views.logout_view, name='logout'),

    # URL per la pagina di registrazione
    path('register/', views.register_view, name='register'),

    # Altri url legati agli account possono essere aggiunti qui
]