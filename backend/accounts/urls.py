from django.urls import path
from .views import RegisterView
from .views import RegisterView, BioProfileView # BioProfileView ইম্পোর্ট করুন
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', BioProfileView.as_view(), name='user_profile'),
]