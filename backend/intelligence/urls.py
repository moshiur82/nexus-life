from django.urls import path
from .views import NovaAIView, SimulationView # SimulationView ইম্পোর্ট নিশ্চিত করুন

urlpatterns = [
    path('query/', NovaAIView.as_view(), name='nova_query'),
    path('simulate/', SimulationView.as_view(), name='simulate'), # এই লাইনটি চেক করুন
]