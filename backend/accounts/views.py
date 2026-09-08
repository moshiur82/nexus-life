from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, BioProfileSerializer
from .models import BioProfile

# ১. ইউজার রেজিস্ট্রেশন ভিউ
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User Created Successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ২. বায়ো প্রোফাইল ডাটা ভিউ (এখানেই ভুলটি হয়েছিল)
class BioProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BioProfileSerializer

    def get_object(self):
        # লগইন করা ইউজারের প্রোফাইলটি খুঁজে বের করা বা নতুন তৈরি করা
        profile, created = BioProfile.objects.get_or_create(user=self.request.user)
        return profile