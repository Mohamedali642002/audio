from django.db import models

class Transcription(models.Model):
    audio_file = models.FileField(upload_to='audio_files/')
    transcription_text = models.TextField()
