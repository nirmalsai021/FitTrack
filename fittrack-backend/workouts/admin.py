from django.contrib import admin
from .models import Workout

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'muscle_group', 'sets', 'reps', 'created_at']
    list_filter = ['muscle_group', 'created_at']
    search_fields = ['name']