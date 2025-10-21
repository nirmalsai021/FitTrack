from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.utils import timezone
from datetime import timedelta

class Workout(models.Model):
    MUSCLE_GROUP_CHOICES = [
        ('Arms', 'Arms'),
        ('Legs', 'Legs'),
        ('Chest', 'Chest'),
        ('Back', 'Back'),
        ('Abs', 'Abs'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    muscle_group = models.CharField(max_length=20, choices=MUSCLE_GROUP_CHOICES)
    sets = models.IntegerField(validators=[MinValueValidator(1)])
    reps = models.IntegerField(validators=[MinValueValidator(1)])
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.muscle_group}"

class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def is_valid(self):
        return timezone.now() < self.created_at + timedelta(minutes=10)
    
    def __str__(self):
        return f"OTP for {self.email}"