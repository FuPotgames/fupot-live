from django.urls import path
from django.contrib.auth import views as auth_views


from fupot.api.views import CreateGetNotificationView,\
         JoinGroup, GetJoinedGroups, CreateGroup, EditGroup, CreateQuestionView, GetOwnerQuestions, GetUserQuestions,\
             EditQuestion, CreateSubmissionView, NotifyResults,SendNotificationToGroup,GetGroupMessages,ResultStatus,\
             RemoveStatus, CreateOwnerStatistics, CreateUserStatistics, UpdateOwnerStatistics, UpdateUserStatistics,\
             GetOwnerStatistics, GetUserStatistics,ListSearchGroups, GetGroupMembers, GetUserSubmissions
app_name = 'fupot'


""" REST-FRAMEWORK MAIN URLS """

urlpatterns = [

    path('get-group-messages', GetGroupMessages.as_view(), name="get-group-messages"),

    path('remove-status/<int:pk>', RemoveStatus.as_view(), name="remove-status"),
    path('get-result-status', ResultStatus.as_view(), name="get-result-status"),
    

    # Users APIs
    path('search-groups', ListSearchGroups.as_view(), name="search-groups"),
    path('join-group', JoinGroup.as_view(), name="join-group"),
    path('get-joined-groups', GetJoinedGroups.as_view(), name="get-joined-groups"),

    path('get-user-questions', GetUserQuestions.as_view(), name="get-user-question"),
    path('answer-question', CreateSubmissionView.as_view(), name="answer-question"),
    path('get-user-submissions', GetUserSubmissions.as_view(), name="get-user-submissions"),

    path('create-user-statistics', CreateUserStatistics.as_view(), name="create-user-statistics"),
    path('update-user-statistics', UpdateUserStatistics.as_view(), name="update-user-statistics"),

    path('get-user-statistics', GetUserStatistics.as_view(), name="get-user-statistics"),
    

    # Owners APIs
    path('create-group', CreateGroup.as_view(), name="create-group"),
    path('edit-group/<int:pk>', EditGroup.as_view(), name="edit-group"),

    path('group-members', GetGroupMembers.as_view(), name="group-members"),

    path('create-question', CreateQuestionView.as_view(), name="create-question"),
    path('edit-question/<int:pk>', EditQuestion.as_view(), name="edit-question"),
    path('get-owner-questions', GetOwnerQuestions.as_view(), name="get-owner-question"),

    path('notify_results/<int:pk>', NotifyResults.as_view(), name="notify-results"),

    path('notification', CreateGetNotificationView.as_view(), name="notification"),
    path('notify-group/<int:pk>', SendNotificationToGroup.as_view(), name="notify-group"),

    path('update-owner-statistics/<int:pk>', UpdateOwnerStatistics.as_view(), name="update-owner-statistics"),

    path('create-owner-statistics', CreateOwnerStatistics.as_view(), name="create-owner-statistics"),
    path('get-owner-statistics', GetOwnerStatistics.as_view(), name="get-owner-statistics")
]