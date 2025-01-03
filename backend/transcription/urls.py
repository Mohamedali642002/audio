from django.urls import path
from .views import handle_audio_upload

urlpatterns = [
    path('', handle_audio_upload, name='handle_audio_upload'),
]
