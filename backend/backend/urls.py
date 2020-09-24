from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # REST FRAMEWORK URLS
    
    path('api/fupot/',include('fupot.api.urls','questions_view_api')),
    path('api/fupot/',include('fupot.api.urls','submissions_view_api')),
    path('api/fupot/',include('fupot.api.urls','winners_view_api')),
    path('api/fupot/',include('fupot.api.urls','user_sub_api')),
    path('api/fupot/',include('fupot.api.urls','user_post_questions_api')),
    path('api/account/',include('account.api.urls','account_api')),
    path('api/account/',include('account.api.web','account_api')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
