from django.shortcuts import render
from django.http import JsonResponse
from transformers import pipeline
# Create your views here.

summarizer = pipeline('summarization')

def home(request):
    return render(request, 'main/index.html')

def api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get('data', '')
        summary = summarizer(text, max_length=50, min_length=25, do_sample=False)
        return JsonResponse({'summary': summary[0]['summary_text']})
    return JsonResponse({'error': 'Invalid request method'}, status=400)