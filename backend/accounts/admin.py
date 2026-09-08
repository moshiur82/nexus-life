from django.contrib import admin
from .models import BioProfile

@admin.register(BioProfile)
class BioProfileAdmin(admin.ModelAdmin): # এখানে শুধু admin.ModelAdmin হবে
    list_display = ('user', 'biological_index', 'resilience', 'updated_at')
    search_fields = ('user__username', 'user__email')