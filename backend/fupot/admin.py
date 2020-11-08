from django.contrib import admin
from .models import Submission,Win,Question, Group, MyDevice , GameRoom

admin.site.register(Submission)
admin.site.register(GameRoom)

admin.site.register(Question)
admin.site.register(Group)

admin.site.register(MyDevice)