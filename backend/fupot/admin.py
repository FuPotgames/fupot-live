from django.contrib import admin
from .models import Submission,Question, Group, MyDevice,GroupNotification,Result,OwnerStatistics,UserStatistics

admin.site.register(Submission)

admin.site.register(Question)
admin.site.register(Group)

admin.site.register(MyDevice)
admin.site.register(GroupNotification)
admin.site.register(Result)

admin.site.register(OwnerStatistics)
admin.site.register(UserStatistics)