from rest_framework import serializers
from fupot.models import Question,Submission,Result,Group,MyDevice,GroupNotification,UserStatistics,OwnerStatistics


class GroupNotificationSerializer(serializers.ModelSerializer):
    """
	Serializes the GroupNotification model
    """
    class Meta:
        model = GroupNotification
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    """
	Serializes the Notification model
    """
    class Meta:
        model = MyDevice
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    """
	Serializes the Question model
    """
    class Meta:
        model = Question
        fields = '__all__'

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

class ResultSerializer(serializers.ModelSerializer):
    """
	Serializes the Result model
    """
    class Meta:
        model = Result
        fields ='__all__'
class GroupSerializer(serializers.ModelSerializer):
    """
	Serializes the Group model
    """
    class Meta:
        model = Group
        fields = '__all__'

class OwnerStatisticsSerializer(serializers.ModelSerializer):
    """
	Serializes the OwnerStatistics model
    """
    class Meta:
        model = OwnerStatistics
        fields ='__all__'
class UserStatisticsSerializer(serializers.ModelSerializer):
    """
	Serializes the UserStatistics model
    """
    class Meta:
        model = UserStatistics
        fields = '__all__'