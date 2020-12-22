from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions
from rest_framework.decorators import permission_classes

from account.api.serializers import RegistrationSerializer, LoginSerializer, AccountPropertiesSerializer
from rest_framework.authtoken.models import Token

from ..models import Account
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from django.shortcuts import redirect
from django.http import HttpResponsePermanentRedirect,HttpResponse

from rest_framework import generics, permissions
from django.template.loader import render_to_string, get_template

from cryptography.fernet import Fernet

import base64

from django.core.files.base import ContentFile
from time import time

"""
View for registering the user or the owner
"""
@api_view(['POST', ])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'successfully registered new user.'
            data['email'] = account.email
            data['username'] = account.username
            data['phone_number'] = account.phone_number
            token = Token.objects.get(user=account).key
            data['token'] = token

            user_data = serializer.data
            user = Account.objects.get(email=account.email)
            token = Token.objects.get(user=account).key

            key = Fernet.generate_key()
            encryption_type = Fernet(key)
            byte_token = bytes(token, 'utf-8')
            encrypted_token = encryption_type.encrypt(byte_token)

            current_site = get_current_site(request)
            relativeLink = reverse('email-verify')
            absurl = 'http://'+current_site.domain+relativeLink+"?token="+str(encrypted_token.decode("utf-8"))+"&key="+key.decode("utf-8")
            email_body = 'Hi '+user.username + \
                ' Use the link below to verify your email \n' + absurl
            send_confirm_email_data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Verify your email'}
            message = render_to_string('users/confirm_email.html', {
                'user': user,
                'domain': current_site.domain,
                'token': token,
                'absurl':absurl
            })
            
            Util.send_email(send_confirm_email_data,message)
        else:
            data = serializer.errors
        return Response(data)

"""
View for sending confirmation email after user register
"""
class ResendConfirmEmail(generics.GenericAPIView):

    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        try:
            data = request.data
            user = Account.objects.get(email=data.get('email'))
            token = Token.objects.get(user=user).key
            
            if user != request.user:
                return Response({'response':"You don't have permission to send confirm email"})
            else:
                key = Fernet.generate_key()
                encryption_type = Fernet(key)
                byte_token = bytes(token, 'utf-8')
                encrypted_token = encryption_type.encrypt(byte_token)

                current_site = get_current_site(request)
                relativeLink = reverse('email-verify')
                absurl = 'http://'+current_site.domain+relativeLink+"?token="+str(encrypted_token.decode("utf-8"))+"&key="+key.decode("utf-8")
                email_body = 'Hi '+user.username + \
                    ' Use the link below to verify your email \n' + absurl
                send_confirm_email_data = {'email_body': email_body, 'to_email': user.email,'email_subject': 'Verify your email'}
                message = render_to_string('users/confirm_email.html', {
                    'user': user,
                    'domain': current_site.domain,
                    'token': token,
                    'absurl':absurl
                }) 
                Util.send_email(send_confirm_email_data,message)
                return Response({'response':"Successfully sent another confimation email"})
        except Account.DoesNotExist:
            return Response({'response':"User doesn't exist"})

"""
View for when user login get all the essential info after login
"""
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                       context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'email': user.email,
            'phone_number':user.phone_number,
            'verified':user.is_verified
        })

"""
View for verification of the email upon clicking on the link
"""
class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        key = request.GET.get('key')

        byte_token = bytes(token, 'utf-8')
        byte_key = bytes(key, 'utf-8')

        encryption_type = Fernet(byte_key)
        decrypted_token = encryption_type.decrypt(byte_token)
        try:
            user = Token.objects.get(key=decrypted_token.decode("utf-8")).user
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return HttpResponse('Your account has been activate successfully')
        except:
            return HttpResponse('Activation link is invalid!')

"""
View for getting user properties of the user
"""
@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def account_properties_view(request):
    try:
        account = request.user
    except Account.DoesNotExist:
        return Response(status = status.HTTP_400_NOT_FOUND)
    if request.method == 'GET':
        serializer = AccountPropertiesSerializer(account)
        return Response(serializer.data)

"""
View for updating user properties of the user
"""
@api_view(['PATCH',])
@permission_classes((IsAuthenticated,))
def update_account_view(request):
    try:
        account = Account.objects.get(email=request.data.get('old_email'))
        user = request.user
        
        if account != user:
            return Response({'response':"You don't have permission to change"})
        try:
            account = request.user
        except Account.DoesNotExist:
            return Response(status = status.HTTP_400_NOT_FOUND)
        if request.method == 'PATCH':
            data = request.POST.copy()
            if data.get('b64') != None:
                print('Worked on b64')
                format, imgstr = data['b64'].split(';base64,') 
                ext = format.split('/')[-1] 

                data['avatar'] = ContentFile(base64.b64decode(imgstr), name=str(int(time()))+'.' + ext)
            else:
                data = request.data

            serializer = AccountPropertiesSerializer(account,data=data,partial=True)
            data = {}
            if serializer.is_valid():
                serializer.save()
                data['response'] = "Account Update success"
                data['username'] = serializer.data['username']
                data['email'] = serializer.data['email']
                data['avatar'] = serializer.data['avatar']
                return Response(data=data)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    except Account.DoesNotExist:
        return Response({'response':"Permission Denied"})

def qdict_to_dict(qdict):
    """Convert a Django QueryDict to a Python dict.

    Single-value fields are put in directly, and for multi-value fields, a list
    of all values is stored at the field's key.

    """
    return {k: v[0] if len(v) == 1 else v for k, v in qdict.lists()}

