from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'FitTrack API is running!',
        'endpoints': {
            'workouts': '/api/workouts/',
            'auth': '/api/auth/',
            'admin': '/admin/'
        }
    })

urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/', include('workouts.urls')),
]