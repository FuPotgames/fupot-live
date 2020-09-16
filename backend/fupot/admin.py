from django.contrib import admin
from .models import Submission,Win,Question, Group

admin.site.register(Submission)
admin.site.register(Win)

admin.site.register(Question)
admin.site.register(Group)