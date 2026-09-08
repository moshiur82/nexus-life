from django.contrib.auth.models import User
from rest_framework import serializers
from .models import BioProfile

class BioProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BioProfile
        fields = ['biological_index', 'resilience', 'neural_flow', 'cardiac_rhythm', 'oxygen_saturation']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name')

    def create(self, validated_data):
        # create_user ফাংশনটি পাসওয়ার্ড হ্যাশ করার জন্য সবথেকে নিরাপদ
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', '')
        )
        return user