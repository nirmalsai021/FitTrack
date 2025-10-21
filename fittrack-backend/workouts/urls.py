from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkoutViewSet
from .auth_views import register, login, forgot_password, reset_password
from django.http import JsonResponse

def test_endpoint(request):
    return JsonResponse({'status': 'API working', 'method': request.method})

router = DefaultRouter()
router.register(r'workouts', WorkoutViewSet, basename='workout')

urlpatterns = [
    path('', include(router.urls)),
    path('test/', test_endpoint, name='test'),
    path('auth/register/', register, name='register'),
    path('auth/login/', login, name='login'),
    path('auth/forgot-password/', forgot_password, name='forgot_password'),
    path('auth/reset-password/', reset_password, name='reset_password'),
]