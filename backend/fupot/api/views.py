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

from fupot.models import Question, Submission, Win,Group
from fupot.api.serializers import UserQuestionSerializer, SubmissionSerializer, WinSerializer,CreateQuestionSerializer,\
    GroupSerializer

class GroupView(generics.ListCreateAPIView):
    """
    Responsible for creating and showing groups in JSON Response
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