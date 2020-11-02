from django.urls import path

from fupot.api.views import SubmissionView, WinnersView, CreateUserViewSubmission, \
     UserCreateQuestionView, UserEditQuestionView, QuestionView, CreateGetGroupView, UpdateDeleteGroupView, CreateGetNotificationView,\
         SendNotification
app_name = 'fupot'

""" REST-FRAMEWORK MAIN URLS """

urlpatterns = [
    path('questions', QuestionView.as_view(), name="questions"),
    path('submissions', SubmissionView.as_view(), name="submissions"),

    
    path('update_delete_groups/<int:pk>', UpdateDeleteGroupView.as_view(), name="update_groups"),
    path('create_retrieve_groups', CreateGetGroupView.as_view(), name="create_groups"),


    path('winners', WinnersView.as_view(), name="winners"),
    path('create_user_submission', CreateUserViewSubmission.as_view(), name="user_sub_view"),
    path('user_edit_questions/<int:pk>', UserEditQuestionView.as_view(), name="user_edit_questions"),
    path('user_create_questions', UserCreateQuestionView.as_view(), name="user_create_questions"),  

    path('notification', CreateGetNotificationView.as_view(), name="notification"),
    path('send-notification', SendNotification.as_view(), name="notification")   
]