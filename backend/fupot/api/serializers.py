from rest_framework import serializers
from fupot.models import Question,Submission,Win,Group

class CreateQuestionSerializer(serializers.ModelSerializer):
    """
	Serializes the Question model
    """
    class Meta:
        model = Question
        fields = '__all__'

class UserQuestionSerializer(serializers.ModelSerializer):
    """
	Serializes the User Question model
    """
    class Meta:
        model = Question
        fields = ['id','title', 'prompt', 'bg_img', 'max_winners']

class SubmissionSerializer(serializers.ModelSerializer):
    """
	Serializes the User Submission model
    """
    username = serializers.SerializerMethodField('get_username')
    class Meta:
        model = Submission
        fields ='__all__'
    
    def get_username(self, submission):
        username = submission.user.username
        return username

class WinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Win
        fields = ['submission']
class GroupSerializer(serializers.ModelSerializer):
    """
	Serializes the Group model
    """
    class Meta:
        model = Group
        fields = '__all__'