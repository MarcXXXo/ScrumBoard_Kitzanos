from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("complete_task/", views.complete_task, name='complete_task'),
    #path('', views.dashboard, name='dashboard'),
#    path('accounts/', include('accounts.urls')),
#    path('register/', views.register_view, name='register'),
]