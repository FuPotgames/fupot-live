from django.db import models
from django.conf import settings
from fcm_django.models import AbstractFCMDevice
from django.core.validators import RegexValidator

from django.contrib.gis.geos import Point
from django.contrib.gis.db import models as gis_models
from django.db.models.manager import Manager


class Group(models.Model):
   """
   This will allow us to manage owners' group.
   """
   name = gis_models.CharField(max_length=255, unique=False)
   address = gis_models.CharField(max_length=255, unique=True)
   establishment_type = gis_models.CharField(max_length=255, null =True,blank=True)
   email = gis_models.EmailField(verbose_name="email", max_length=60, blank=True,null=True)
   phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
   phone_number = gis_models.CharField(validators=[phone_regex], max_length=17,null=True, blank=True) # validators should be a list

   latitude = gis_models.FloatField(null=True,blank=True)
   longitude = gis_models.FloatField(null=True,blank=True)
   
   location = gis_models.PointField(geography=True, srid=4326,null=True,blank=True)
   group_img = models.ImageField(upload_to='fupot/owner/img/',blank=True,null=True)

   user = gis_models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
   owner = gis_models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="+",blank=True)

   objects = Manager()

   def save(self, **kwargs):
       self.location = Point(self.longitude, self.latitude)
       super(Group, self).save(**kwargs)
   
   def __str__(self):
      return self.name

class MyDevice(AbstractFCMDevice):
    """
    This will allow us to store token for android and ios devices
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Question(models.Model):
    """
    The questions that will be created
    """
    bg_img = models.ImageField(upload_to='fupot/questions/backgrounds/',blank=True, null=True)
    title = models.CharField(max_length=255, unique=False)
    prompt = models.TextField(max_length=1027, unique=False, blank=True, null=True)
    starts_at = models.TimeField()
    ends_at = models.TimeField()

    winner_title = models.CharField(max_length=255, unique=False, blank=True, null=True)
    loser_title = models.CharField(max_length=255, unique=False, blank=True, null=True)
    winner_body = models.TextField(max_length=1027, unique=False, blank=True, null=True)
    loser_body = models.TextField(max_length=1027, unique=False, blank=True, null=True)
    extra_data = models.CharField(max_length=255, unique=False, blank=True, null=True)
    
    closed = models.BooleanField(default=False)
    has_winner = models.BooleanField(default=False)
    num_submissions = models.IntegerField(default=0)
    sent = models.BooleanField(default=False)
    
    
    answers_1 = models.CharField(max_length=1000,
                               null=True,
                               help_text="Enter the answer text that \
                                            you want displayed",)
    answers_2 = models.CharField(max_length=1000,
                               null=True,
                               help_text="Enter the answer text that \
                                            you want displayed",)
    answers_3 = models.CharField(max_length=1000,
                               null=True,
                               help_text="Enter the answer text that \
                                            you want displayed",)
    answers_4 = models.CharField(max_length=1000,
                               null=True,
                               help_text="Enter the answer text that \
                                            you want displayed",)

    correct_answer = models.CharField(max_length=255, unique=False, null=False,blank=False)

    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,blank=True)
    location = models.CharField(max_length=255)


    def __str__(self):
        if self.prompt is None:
            return ''
        else:
            return self.prompt

class Submission(models.Model):
    """
	Answer submission the users make to guess on questions
	"""
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    created_at = models.TimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    correct = models.BooleanField(blank=False,
                                  default=False,
                                  help_text="Is this a correct answer?",
                                  verbose_name="Correct")

    
    def __str__(self):
      return self.answer

class Result(models.Model):
    """
    This will save the result notification after each question checked and notified by the owner
    """
    group_instance = models.ForeignKey(Group, on_delete=models.CASCADE,null=True)
    question = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=255)
    user_answer = models.CharField(max_length=255)
    correct = models.BooleanField(blank=False,
                                  default=False,
                                  help_text="Is this a correct answer?",
                                  verbose_name="Correct")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
      return self.user_answer

class GroupNotification(models.Model):
    """
    This will save each of the owners notification in the database
    """
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, blank=True,null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
      return self.message

class OwnerStatistics(models.Model):
    """
    This will store all the statistics for the owner profile
    """
    question_asked = models.IntegerField(default=0,blank=True,null=True)
    prizes_issued = models.IntegerField(default=0,blank=True,null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)

class UserStatistics(models.Model):
    """
    This will store all the statistics for the user profile
    """
    questions_answered = models.IntegerField(default=0,blank=True,null=True)
    groups_joined = models.IntegerField(default=0,blank=True,null=True)
    prizes_won = models.IntegerField(default=0,blank=True,null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)

""" from django.contrib.gis.geos import Point
from django.contrib.gis.db import models as gis_models
from django.db.models.manager import Manager

class Store(models.Model):
    name = gis_models.CharField(max_length=100)
    location = gis_models.PointField(geography=True, srid=4326,null=True,blank=True)
    longitude = gis_models.FloatField()
    latitude = gis_models.FloatField()
    objects = Manager()
    def save(self, **kwargs):
        self.location = Point(self.longitude, self.latitude)
        super(Store, self).save(**kwargs) """