from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Workout
from .serializers import WorkoutSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    
    def get_queryset(self):
        return Workout.objects.all().order_by('-created_at')
    
    def perform_create(self, serializer):
        user, created = User.objects.get_or_create(username='demo_user')
        serializer.save(user=user)