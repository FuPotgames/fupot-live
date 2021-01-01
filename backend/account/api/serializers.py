from rest_framework import serializers

from account.models import Account
from drf_extra_fields.fields import Base64ImageField

"""
Serializer for Login Info
"""
class LoginSerializer(serializers.ModelSerializer):
	class Meta:
		model = Account
		fields = ['email','username','phone_number','token','user_type']

		extra_kwargs = {'password': {'write_only': True}}

	def validate(self, data):
		password = data.get('password')
		email = data.get('email')

"""
Serializer for Registration Info
"""
class RegistrationSerializer(serializers.ModelSerializer):
	def __init__(self, *args, **kwargs):
	    super().__init__(*args, **kwargs)
	    self.fields['phone_number'].required = True
	password2 				= serializers.CharField(style={'input_type': 'password'}, write_only=True)

	class Meta:
		model = Account
		fields = ['email', 'username', 'password', 'password2','phone_number','user_type']
		extra_kwargs = {
				'password': {'write_only': True},
		}	


	def	save(self):
		if Account.objects.filter(phone_number=self.validated_data['phone_number']).exists():
			res = serializers.ValidationError({"error": "This phone number already exists."})
			res.status_code = 200
			raise res
		else:
			account = Account(
					email=self.validated_data['email'],
					username=self.validated_data['username'],
					phone_number=self.validated_data['phone_number'],
					user_type = self.validated_data['user_type']
				)
			password = self.validated_data['password']
			password2 = self.validated_data['password2']
			if password != password2:
				raise serializers.ValidationError({'password': 'Passwords must match.'})
			account.set_password(password)
			account.save()
			return account



"""
Serializer for Account Properties Info
"""
class AccountPropertiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['pk','email','username', 'avatar','is_verified']