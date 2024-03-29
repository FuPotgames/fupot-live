from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

from account.api.views import VerifyEmail, ResendConfirmEmail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('resend-confirm_email/', ResendConfirmEmail.as_view(), name="resend-confirm_email"),
    path('password-reset/',
         auth_views.PasswordResetView.as_view(
             template_name='users/password_reset.html',
             html_email_template_name='users/password_reset_email.html'
         ),
         name='password_reset'),
    path('password-reset/done/',
         auth_views.PasswordResetDoneView.as_view(
             template_name='users/password_reset_done.html'
         ),
         name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(
             template_name='users/password_reset_confirm.html'
         ),
         name='password_reset_confirm'),
    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(
             template_name='users/password_reset_complete.html'
         ),
         name='password_reset_complete'),
    
    # REST FRAMEWORK URLS
    
    path('api/fupot/',include('fupot.api.urls','fupot_rest_api_urls')),
    path('api/account/',include('account.api.urls','account_api'))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
