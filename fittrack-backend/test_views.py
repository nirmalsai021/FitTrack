from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

@csrf_exempt
@require_http_methods(["POST"])
def test_register(request):
    return JsonResponse({'message': 'Register endpoint working'})

@csrf_exempt  
@require_http_methods(["POST"])
def test_login(request):
    return JsonResponse({'message': 'Login endpoint working'})