from rest_framework import status
from rest_framework.request import Request
from typing import Any
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework import generics, permissions
from rest_framework.decorators import permission_classes
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from account.models import Account

from account.api.serializers import AccountPropertiesSerializer

from fupot.models import Question, Submission,Group,MyDevice,GroupNotification,Result,OwnerStatistics,UserStatistics
from fupot.api.serializers import SubmissionSerializer, ResultSerializer,\
    GroupSerializer, NotificationSerializer, QuestionSerializer, GroupNotificationSerializer,OwnerStatisticsSerializer,\
    UserStatisticsSerializer

from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.core import serializers
import json
import datetime
from collections import OrderedDict
import operator
from django.http.response import JsonResponse

from django.contrib.auth.forms import PasswordResetForm
from django.shortcuts import render

from rest_framework.pagination import PageNumberPagination

from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance

from django.contrib.gis.geos import GEOSGeometry

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
        paginator = PageNumberPagination()
        paginator.page_size = 4

        latitude = float(self.request.GET['lat'])
        longitude = float(self.request.GET['long'])

        # Here you can do the following thing:
        point = Point(longitude, latitude)
        groups = Group.objects.filter(user=self.request.user,location__distance_lte=(point, D(m=1.609e+6))).annotate(distance=Distance('location', point)).order_by('distance')

        result_page = paginator.paginate_queryset(groups, request)

        serializer = GroupSerializer(result_page, many=True)
        return Response(serializer.data)

class ListSearchGroups(ListAPIView):
    """
    Responsible for searching groups and returning 4 nearby places
    """
    serializer_class = GroupSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = PageNumberPagination
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('name','address','establishment_type','owner__username')

    def get_queryset(self):
        try:
            latitude = float(self.request.GET['lat'])
            longitude = float(self.request.GET['long'])

            # Here you can do the following thing:
            point = Point(longitude, latitude)
            groups = Group.objects.filter(location__distance_lte=(point, D(m=1.609e+6))).annotate(distance=Distance('location', point)).order_by('distance')

            # And use it as you wish in the filtering below:

            return groups
        except:
            return []
    
class GetUserQuestions(generics.CreateAPIView):
    """
    Responsible for retreving all user questions based on which group that they are part off 
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = QuestionSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        data = request.GET['group']
        if data is None:
            return Response({'reponse':"group id is required"})
        else:
            try:
                group_instance = Group.objects.get(id = data, user = request.user)
                questions = Question.objects.filter(group = group_instance)
                serializer = QuestionSerializer(questions, many=True)
                return Response(serializer.data)
            except(Group.DoesNotExist):
                return Response({'reponse':"User must join the group first"})

#================================================ Owner's APIs ============================================
            
class CreateGroup(generics.CreateAPIView):
    """
    Responsible for Creating a Group by the Owner
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GroupSerializer

    # creates a group by the owner
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        data = request.data
        group = Group.objects.filter(owner=self.request.user)
        if group.exists():
            tmpJson = serializers.serialize("json",group)
            tmpObj = json.loads(tmpJson)

            return JsonResponse(tmpObj+[{'reponse':"Group already exists with this owner"}], safe=False)
        else:
            try:
                submission = Group.objects.create( \
                    owner=self.request.user,\
                        name = data.get('name'),\
                            address = data.get('address'),\
                                phone_number = self.request.user.phone_number,\
                                    email = self.request.user.email,\
                                        latitude = data.get('latitude'),\
                                            longitude = data.get('longitude'),\
                                                establishment_type = data.get('establishment_type')
                )
                submission.user.add(self.request.user)
                return Response(status=201, data=GroupSerializer(submission).data)
            except:
                return Response(status=201, data={'reponse':"name and address must be unique"})

class EditGroup(APIView):
    """
    Responsible for updating group properties by id
    """
    permission_classes = (permissions.IsAuthenticated,)
    def patch(self, request, pk):
        group = Group.objects.get(id=pk)
        user = request.user

        if group.owner != user:
            return Response({'response':"You don't have permission to edit that"})
        else:
            serializer = GroupSerializer(group, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CreateQuestionView(generics.CreateAPIView):
    """
    Responsible for Creating a question by the owner
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = QuestionSerializer

    # creates a question by the owner
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        data = request.data
        
        group = Group.objects.get(id = data.get('group'))
        user = request.user

        if group.owner != user:
            return Response({'response':"You don't have permission to edit that"})
        else:
            group_instance = Group.objects.get(id = data.get('group'))
            try:
                submission = Question.objects.create( \
                    bg_img=data.get('bg_img'),\
                        title = data.get('title'),\
                            prompt=data.get('prompt'),\
                                starts_at = data.get('starts_at'),\
                                    ends_at = data.get('ends_at'),\
                                        sent = data.get('sent'),\
                                            has_winner = data.get('has_winner'),\
                                                answers_1 = data.get('answers_1'),\
                                                    answers_2 = data.get('answers_2'),\
                                                        answers_3 = data.get('answers_3'),\
                                                            answers_4 = data.get('answers_4'),\
                                                                correct_answer = data.get('correct_answer'),\
                                                                    group = group_instance,\
                                                                        owner = request.user,\
                                                                            location = data.get('location'),\
                                                                                winner_title = data.get('winner_title'),\
                                                                                    loser_title = data.get('loser_title'),\
                                                                                        winner_body = data.get('winner_body'),\
                                                                                            loser_body = data.get('loser_body'),\
                                                                                                extra_data = data.get('extra_data'))
                return Response(status=201, data=QuestionSerializer(submission).data)
            except:
                return Response({'reponse':"title, prompt, starts_at, ends_at,answers_1, answers_2,answers_3, answers_4, correct_answer, location are required  "})

class EditQuestion(APIView):
    """
    Responsible for updating question by question id
    """
    permission_classes = (permissions.IsAuthenticated,)
    def patch(self, request, pk):
        question = Question.objects.get(id = pk)
        user = request.user
        if question.owner != user:
            return Response({'response':"You don't have permission to edit that"})
        else:
            serializer = QuestionSerializer(question, data=request.data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetOwnerQuestions(generics.CreateAPIView):
    """
    Responsible for retreving all owner questions
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = QuestionSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        questions = Question.objects.filter(owner=self.request.user)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

class GetGroupMembers(APIView):
    """
    Responsible for retreving all the grouo members by the group id
    """
    permission_classes = (permissions.IsAuthenticated,)
    # Gets all groups that are joined by this user
    def get(self, request):
        data = request.data
        
        group = Group.objects.get(id = data.get('group'))
        user = request.user

        if group.owner != user:
            return Response({'response':"You don't have permission to see that"})
        
        members = group.user.all().order_by('username')
        
        paginator = Paginator(members, 5)
        page = request.GET.get('page')

        try:
            members = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            members = paginator.page(1)
            return Response({'response':"page number must be integer"})
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            members = paginator.page(paginator.num_pages)
            return Response({'response':"out of range"})
        serializer = AccountPropertiesSerializer(members, many=True)
        return Response(serializer.data)
        

class CreateSubmissionView(generics.CreateAPIView):
    """
    Responsible for submitting answers by the users
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SubmissionSerializer

    # creates a question by the owner
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        data = request.data    
        group = data.get('group')
        answer = data.get('answer')
        question = data.get('question')
        latitude = data.get('lat')
        longitude = data.get('long')
        try:
            group_instance = Group.objects.get(id = group, user = request.user)

            pnt = GEOSGeometry('SRID=4326;POINT('+str(longitude)+' '+str(latitude)+')')
            pnt2 = GEOSGeometry('SRID=4326;POINT('+str(group_instance.longitude)+' '+str(group_instance.latitude)+')')

            # km to ft
            distance_diff = ((pnt.distance(pnt2) * 100) * 3280.84)
            print(distance_diff)
            if distance_diff <= 500:
                question_instance = Question.objects.get(id = question)
                sub = Submission.objects.filter(question = question_instance)
                if sub.exists():
                    return Response(status=201, data=SubmissionSerializer(sub[0]).data)
                else:
                    submission = Submission.objects.create( \
                                        group = group_instance,\
                                            answer = answer,\
                                                question = question_instance,\
                                                    user = request.user
                    )
                    return Response(status=201, data=SubmissionSerializer(submission).data)
            else:
                return Response({'reponse': "You must be at the establishment or near it"})
        except(Group.DoesNotExist):
            return Response({'reponse':"User must join the group first"})


class GetUserSubmissions(generics.CreateAPIView):
    """
    Responsible for retreving all user submissions based on their group
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = SubmissionSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        data = request.GET['group']
        if data is None:
            return Response({'reponse':"group id is required"})
        else:
            try:
                group_instance = Group.objects.get(id = data, user = request.user)
                submissions = Submission.objects.filter(group = group_instance)
                serializer = SubmissionSerializer(submissions, many=True)
                return Response(serializer.data)
            except(Group.DoesNotExist):
                return Response({'reponse':"User must join the group first"})
class NotifyResults(generics.CreateAPIView):
    """
    Responsible for checking a question and notifying users who won and loss and post the results on the results section
    """
    permission_classes = (permissions.IsAuthenticated,)

    # Gets all groups that are joined by this user
    def delete(self, request,pk):
        question_id = request.GET['question_id']
        group = Group.objects.get(id=pk)
        user = request.user

        if group.owner != user:
            return Response({'response':"You don't have permission to check the answers"})

        group_instance = Group.objects.get(id = pk)
        submissions = Submission.objects.filter(group = group_instance)
        question = Question.objects.get(group = group_instance, id = question_id)

        winner_title = question.winner_title
        loser_title = question.loser_title
        winner_body = question.winner_body
        loser_body = question.loser_body
        extra_data = question.extra_data

        correct_answer = question.correct_answer
        prompt = question.prompt

        losers = []
        winners = []

        create_results = []

        for x in submissions:
            if x.answer == correct_answer:
                winners.append({'id':x.id,'question':x.question,'answer':x.answer,'user':x.user,'created_at':x.created_at})
                create_results.append(
                    {
                        'group_instance': group_instance.id,
                        'question': prompt,
                        'correct_answer':correct_answer,
                        'user_answer':x.answer,
                        'correct':True,
                        'user':x.user.id
                    }
                )

            else:
                losers.append({'id':x.id,'question':x.question,'answer':x.answer,'user':x.user,'created_at':x.created_at})
                create_results.append(
                    {
                        'group_instance': group_instance.id,
                        'question': prompt,
                        'correct_answer':correct_answer,
                        'user_answer':x.answer,
                        'correct':False,
                        'user':x.user.id
                    }
                )
        
        winner = sorted(winners, key=lambda k: k['created_at'])[0]
        
        
        
        winner_devices = MyDevice.objects.filter(user=winner['user'].id)
        winner_devices.send_message(title=winner_title, body=winner_body, data={"extra_data": extra_data})

        loser_uids = [loser['user'].id for loser in losers]

        loser_devices = MyDevice.objects.filter(user__in= loser_uids)
        loser_devices.send_message(title=loser_title, body=loser_body, data={"extra_data": extra_data})
        

        serializer = ResultSerializer(data=create_results, many=True)
        question.delete()
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        return Response({'reponse': "Successfully checked the answer for that question, notified users who won and loss and stored them in the database",'Winner': winner['user'].username})

class CreateGetNotificationView(generics.CreateAPIView):
    """
    Responsible for storing notification tokens from associated users
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = NotificationSerializer

    def get(self, request):
        paginator = PageNumberPagination()
        paginator.page_size = 5

        queryset = MyDevice.objects.all()

        result_page = paginator.paginate_queryset(queryset, request)

        serializer = NotificationSerializer(result_page, many=True)
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

class SendNotificationToGroup(generics.CreateAPIView):
    """
    Responsible for sending notifications/messages to a group and stores those notifications on the database(GroupNotifications)
    """
    permission_classes = (permissions.IsAuthenticated,)

    # Gets all groups that are joined by this user
    def create(self, request,pk):
        try:
            data = request.data
            group = Group.objects.get(id=pk)
            user = request.user

            user_ids = []

            if group.owner != user:
                return Response({'response':"You don't have permission to send messages"})
            else:
                for x in group.user.all():
                    user_ids.append(x.id)
                
                print(user_ids)
                devices = MyDevice.objects.filter(user__in= user_ids)
                devices.send_message(title=data.get('title'), body=data.get('body'), data={"extra_data": data.get('extra_data')})

                try:
                    group_notification = GroupNotification.objects.create( \
                        group = group,\
                            owner = request.user,\
                                message = data.get('body'),\
                    )
                    return Response(status=201, data=GroupNotificationSerializer(group_notification).data)
                except:
                    return Response({'reponse':"Doesn't exist"})
                
                return Response({'response':"Successfully sent the message to that group"})

        except Group.DoesNotExist:
            return Response({'response':"Group doesn't exist with that id"})

class CreateOwnerStatistics(generics.CreateAPIView):
    """
    Responsible for Creating a statistic for owner when registered
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = OwnerStatisticsSerializer

    # creates a question by the owner
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        try:
            if OwnerStatistics.objects.filter(owner=request.user).exists():
                return Response(status=201, data={'reponse':"Only one entry per user"})
            else:
                statistics = OwnerStatistics.objects.create(owner=request.user)
                return Response(status=201, data=OwnerStatisticsSerializer(statistics).data)
        except:
            return Response({'reponse':"Something went wrong.."})

class CreateUserStatistics(generics.CreateAPIView):
    """
    Responsible for Creating a statistic for user when registered
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserStatisticsSerializer

    # creates a question by the owner
    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:    
        try:
            if UserStatistics.objects.filter(user=request.user).exists():
                return Response(status=201, data={'reponse':"Only one entry per user"})
            else:
                statistics = UserStatistics.objects.create(user=request.user)
                return Response(status=201, data=UserStatisticsSerializer(statistics).data)
        except UserStatistics.DoesNotExist:
            return Response({'reponse':"Something went wrong.."})

#===============================================General APIs===================================================
class GetGroupMessages(generics.CreateAPIView):
    """
    Responsible for retreving all the group messages by the group_id
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = GroupNotificationSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        group = request.GET['group']
        if group is None:
            return Response({'reponse':"group id is required"})
        else:
            try:
                paginator = PageNumberPagination()
                paginator.page_size = 30

                group_instance = Group.objects.get(id = group, user = request.user)
                group_notifications = GroupNotification.objects.filter(group = group_instance).order_by('created_at')

                

                result_page = paginator.paginate_queryset(group_notifications, request)

                serializer = GroupNotificationSerializer(result_page, many=True)
                return Response(serializer.data)
            except(Group.DoesNotExist):
                return Response({'reponse':"User must join the group first"})

class ResultStatus(APIView):
    """
    Responsible for retreve each of the question status by the user
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ResultSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        try:
            results = Result.objects.filter(user = request.user)
            serializer = ResultSerializer(results, many=True)
            return Response(serializer.data)
        except(Result.DoesNotExist):
            return Response({'reponse':"No results were found with that specific user"})

class RemoveStatus(APIView):
    """
    Responsible for removing status notification
    """
    permission_classes = (permissions.IsAuthenticated,)
    def delete(self, request, pk):
        try:
            result = Result.objects.get(user=request.user,id=pk)
            user = request.user
            if result.user != user:
                return Response({'response':"You don't have permission to remove that"})
            else:
                result.delete()
                return Response({'response':"Status removed!"})
        except Result.DoesNotExist:
            return Response({'reponse':"No results were found with that specific user"})

class UpdateOwnerStatistics(APIView):
    """
    Responsible for updating group properties by id
    """
    permission_classes = (permissions.IsAuthenticated,)
    def patch(self, request, pk):
        group = Group.objects.get(id=pk)
        user = request.user

        if group.owner != user:
            return Response({'response':"Permission Denied"})
        else:
            owner = OwnerStatistics.objects.get(owner = request.user)

            question_asked = int(owner.question_asked)
            prizes_issued = int(owner.prizes_issued)

            newdict={}
            newdict.update(request.data)
            
            if len(newdict.keys()) == 1:
                for x in newdict.keys():
                    if x == 'question_asked':
                        user_input_question_asked = int(''.join(newdict[x]))
                        total = question_asked + user_input_question_asked
                        newdict.update({'question_asked':total})
                        
                    elif x == 'prizes_issued':
                        user_input_prizes_issued = int(''.join(newdict[x]))
                        total = prizes_issued + user_input_prizes_issued
                        newdict.update({'prizes_issued':total})
            
                        
            serializer = OwnerStatisticsSerializer(owner, data=newdict,partial=True)

            if serializer.is_valid():
                serializer.save()
                group_members = Group.objects.get(owner=self.request.user).user.count()
                data = serializer.data
                data['group_members'] = group_members
                return Response(data)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUserStatistics(APIView):
    """
    Responsible for updating group properties by id
    """
    permission_classes = (permissions.IsAuthenticated,)
    def patch(self, request):
        user_stat = UserStatistics.objects.get(user=request.user)
        user = request.user

        if user_stat.user != user:
            return Response({'response':"Permission Denied"})
        else:
            user = UserStatistics.objects.get(user = request.user)

            questions_answered = int(user.questions_answered)
            groups_joined = int(user.groups_joined)
            prizes_won = int(user.prizes_won)

            newdict={}
            newdict.update(request.data)
            
            if len(newdict.keys()) == 1:
                for x in newdict.keys():
                    if x == 'questions_answered':
                        user_input_questions_answered = int(''.join(newdict[x]))
                        total = questions_answered + user_input_questions_answered
                        newdict.update({'questions_answered':total})
                    elif x == 'groups_joined':
                        user_input_groups_joined = int(''.join(newdict[x]))
                        total = groups_joined + user_input_groups_joined
                        newdict.update({'groups_joined':total})
                    elif x == 'prizes_won':
                        user_input_prizes_won = int(''.join(newdict[x]))
                        total = prizes_won + user_input_prizes_won
                        newdict.update({'prizes_won':total})
            
            serializer = UserStatisticsSerializer(user, data=newdict,partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetOwnerStatistics(APIView):
    """
    Responsible for retreving owner statistics
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = OwnerStatisticsSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        statistics = OwnerStatistics.objects.filter(owner=self.request.user)
        group_members = Group.objects.get(owner=self.request.user).user.count()
        serializer = OwnerStatisticsSerializer(statistics, many=True)

        data = serializer.data
        data[0]['group_members'] = group_members
        return Response(data)

class GetUserStatistics(APIView):
    """
    Responsible for retreving user statistics
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserStatisticsSerializer

    # Gets all groups that are joined by this user
    def get(self, request):
        statistics = UserStatistics.objects.filter(user=self.request.user)
        serializer = UserStatisticsSerializer(statistics, many=True)
        return Response(serializer.data)