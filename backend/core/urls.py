from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/intelligence/', include('intelligence.urls')), # এই লাইনটি অবশ্যই থাকতে হবে
]