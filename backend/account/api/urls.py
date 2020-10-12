from django.urls import path
from account.api.views import(
	registration_view,CustomAuthToken

)
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'account'

urlpatterns = [
	path('register', registration_view, name="register"),
    path('login', CustomAuthToken.as_view(), name="login"),
]