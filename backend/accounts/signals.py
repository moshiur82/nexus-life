from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import BioProfile

@receiver(post_save, sender=User)
def create_user_bio_profile(sender, instance, created, **kwargs):
    if created:
        BioProfile.objects.create(
            user=instance,
            biological_index=75.0, # ডিফল্ট স্টার্টিং ডাটা
            resilience=80,
            neural_flow=85,
            cardiac_rhythm=72,
            oxygen_saturation=98
        )