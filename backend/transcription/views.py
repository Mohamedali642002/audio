from django.shortcuts import render
from django.http import JsonResponse
import openai
from .models import Transcription
from django.views.decorators.csrf import csrf_exempt


openai.api_key = ''


def transcribe_audio(file_path): 
    with open(file_path, 'rb') as audio_file: response = openai.audio.transcriptions.create( model="whisper-1", file=audio_file, ) 
    return response['text']

@csrf_exempt
def handle_audio_upload(request):
    if request.method == 'POST' and request.FILES.get('file'):
        audio_file = request.FILES['file']
        transcription = Transcription(audio_file=audio_file)
        transcription.save()
        transcription_text = transcribe_audio(transcription.audio_file.path)
        transcription.transcription_text = transcription_text
        transcription.save()
        return JsonResponse({'transcription': transcription_text})
    return JsonResponse({'error': 'Invalid request'}, status=400)
