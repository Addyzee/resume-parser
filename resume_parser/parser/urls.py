from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name='home'),
    path('upload-resume/',views.upload_resume, name="upload_resume")
]
