from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # Add URL patterns for delete and complete actions
    path('delete/<int:pk>/', views.delete_task, name='delete_task'),
    path('complete/<int:pk>/', views.complete_task, name='complete_task'),
]