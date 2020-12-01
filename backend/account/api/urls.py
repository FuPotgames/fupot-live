from django.urls import path
from account.api.views import(
	registration_view,CustomAuthToken,account_properties_view,update_account_view

)
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'account'

urlpatterns = [
	path('register', registration_view, name="register"),
    path('login', CustomAuthToken.as_view(), name="login"),
	path('account-properties', account_properties_view, name="account-properties"),
    path('account-update', update_account_view, name="account-update")
]