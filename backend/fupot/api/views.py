from rest_framework import status
from rest_framework.request import Request
from typing import Any
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import generics, permissions
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from account.models import Account

from fupot.models import Question, Submission, Win,Group,MyDevice
from fupot.api.serializers import UserQuestionSerializer, SubmissionSerializer, WinSerializer,CreateQuestionSerializer,\
    GroupSerializer, NotificationSerializer, GameRoomSerializer, GameRoom

from django.core.exceptions import ValidationError

#================================================ Users APIs ==============================================================

class JoinGroup(generics.CreateAPIView):
    """
    Responsible for Joining a Group
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GroupSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        groups = Group.objects.filter(user=self.request.user)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

    # Joins a group by group_id
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        data = request.data
        submission = Group.objects.get(id = data['group_id'])
        submission.user.add(self.request.user)
        submission.save()
        return Response(status=201, data=GroupSerializer(submission).data)

class GetJoinedGroups(generics.CreateAPIView):
    """
    Responsible for retreving all joined groups
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GroupSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        groups = Group.objects.filter(user=self.request.user)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

class JoinGameRoom(generics.CreateAPIView):
    """
    Responsible for Joining a GameRoom
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GameRoomSerializer

    # Joins a game room
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        data = request.data
        game_room = GameRoom.objects.filter(group_id = data['group_id'])
        if not game_room.exists():
            return Response("Group doesn't exist")
        else:
            field_value = getattr(game_room[0], 'game_ended')
            if field_value == True:
                return Response("Game has ended, come back later")
            else:
                submission = GameRoom.objects.get(group_id = data['group_id'])
                submission.join_user.add(self.request.user)
                submission.save()
                return Response(status=201, data=GameRoomSerializer(submission).data)

#================================================================== Owner's APIs ============================================

class CreateGameRoom(generics.CreateAPIView):
    """
    Responsible for Creating a GameRoom by the Owner
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GameRoomSerializer

    # creates a group by the owner
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        data = request.data
        group = Group.objects.filter(id = data.get('group_id'))[0]

        if GameRoom.objects.filter(group_id=group).exists():
            return Response("Game Room already exists, please finish the game first!!")
        else:
            # Do something else...
            submission = GameRoom.objects.create( \
                owner=self.request.user,\
                    group_id=group
            )
            return Response(status=201, data=GameRoomSerializer(submission).data)
            

class CreateGroup(generics.CreateAPIView):
    """
    Responsible for Creating a Group by the Owner
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GroupSerializer

    # creates a group by the owner
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        data = request.data
        submission = Group.objects.create( \
            owner=self.request.user,\
                name = data.get('name'),\
                    join_id=data.get('join_id'),\
                        location=data.get('location'),\
        )
        return Response(status=201, data=GroupSerializer(submission).data)

class GetGroups(generics.CreateAPIView):
    """
    Responsible for retreiving groups created by the Owner
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GroupSerializer

    # creates a group by the owner
    def get(self, request):
        groups = Group.objects.filter(owner=self.request.user)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)


# TODO: Research more on topic/group based sending notification
class SendNotification(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    """
    Responsible for sending notifications
    """
    def get(self, request, format=None):
        devices = MyDevice.objects.all()

        devices.send_message(title=request.data['title'], body=request.data['body'], data={"test": "test"})
        
        return Response("Successfuly sent notifications to all users!!")

class CreateGetNotificationView(generics.CreateAPIView):
    """
    Responsible for storing notification tokens from associated users
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = NotificationSerializer

    def get(self, request):
        queryset = MyDevice.objects.all()
        serializer = NotificationSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        data = request.data
        try:
            MyDevice.objects.get(registration_id=data['registration_id'])
            #if we get this far, we have an exact match for this form's data
            return Response("Exists already!!")
        except MyDevice.DoesNotExist:
            #because we didn't get a match
            submission = MyDevice.objects.create( \
                user=request.user,\
                    registration_id = data.get('registration_id'),\
                        name=data.get('name'),\
                            type=data.get('type'),\
            )
        
            return Response(status=201, data=NotificationSerializer(submission).data)

class CreateGetGroupView(generics.ListCreateAPIView):
    """
    Responsible for creating and showing groups in JSON Response
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class UpdateDeleteGroupView(generics.RetrieveUpdateDestroyAPIView):
    """
    Responsible for updating and deleting specific group by id
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class QuestionView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    """
    Responsible for showing questions in JSON Response
    """
    def get(self, request, format=None):
        data = request.data
        questions = Question.objects.filter(group=int(data.get('group')))
        serializer = UserQuestionSerializer(questions, many=True)
        return Response(serializer.data)

class  UserEditQuestionView(generics.UpdateAPIView):
    """
    Responsible for Store Owners Edit Question in JSON Response
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Question.objects.all()
    serializer_class = CreateQuestionSerializer
    
class  UserCreateQuestionView(generics.CreateAPIView):
    """
    Responsible for Store Owners Create Question in JSON Response
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Question.objects.all()
    serializer_class = CreateQuestionSerializer

class CreateUserViewSubmission(generics.CreateAPIView):
    """
    Responsible for users to submit their answers
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserQuestionSerializer

    
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        data = request.data
        user_submissions =Submission.objects.filter(question_id = data.get('question'),user=request.user,group=data.get('group'))
        if user_submissions.count() > 0:
            return Response(status=409)
        submission = Submission.objects.create( \
            user=request.user,\
                question_id = data.get('question'),\
                    answer=data.get('answer'),\
                        group = data.get('group')
        )
        return Response(status=201, data=SubmissionSerializer(submission).data)

class SubmissionView(generics.ListAPIView):
    """
    Responsible for showing submissions in JSON Response
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer


class WinnersView(generics.ListAPIView):
    """
    Responsible for showing winners in JSON Response
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Win.objects.all()
    serializer_class = WinSerializer