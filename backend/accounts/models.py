from django.db import models
from django.contrib.auth.models import User

class BioProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    biological_index = models.FloatField(default=0.0)
    resilience = models.IntegerField(default=0)
    neural_flow = models.IntegerField(default=0)
    cardiac_rhythm = models.IntegerField(default=0)
    oxygen_saturation = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile of {self.user.username}"