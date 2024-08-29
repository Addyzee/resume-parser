from django.shortcuts import render
from django.http import HttpRequest, JsonResponse

# Create your views here.
def home(request: HttpRequest):
    return render(request, 'index.html')

def upload_resume(request: HttpRequest):
    if request.method == "POST" and request.FILES.get("file"):
        ...
    return JsonResponse({"error":"Invalid Request"}, status = 400)
