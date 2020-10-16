from django.db import models
from django.conf import settings

class Group(models.Model):
   """
   This will allow us to manage our categories.
   
   Categories can relate to other categories for sub-categories
   """
   name = models.CharField(max_length=255, unique=True)
   join_id = models.CharField(max_length=255, unique=True)
   
   def __str__(self):
      return self.name

class Question(models.Model):
    """
    The questions that will be created, posted, answered, and won.
    """
    bg_img = models.ImageField(upload_to='fupot/questions/backgrounds/')
    closed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True,)
    expires_at = models.DateTimeField()
    has_winner = models.BooleanField(default=False)
    max_winners = models.IntegerField(default=1)
    num_submissions = models.IntegerField(default=0)
    prompt = models.TextField(max_length=1027, blank=True, null=True)
    sent = models.BooleanField(default=False)
    starts_at = models.DateTimeField()
    title = models.CharField(max_length=255, unique=True)
    
    answers_1 = models.CharField(max_length=1000,
                               blank=False,
                               help_text="Enter the answer text that \
                                            you want displayed",)
    answers_2 = models.CharField(max_length=1000,
                               blank=False,
                               help_text="Enter the answer text that \
                                            you want displayed",)
    answers_3 = models.CharField(max_length=1000,
                               blank=False,
                               help_text="Enter the answer text that \
                                            you want displayed",)
    answers_4 = models.CharField(max_length=1000,
                               blank=False,
                               help_text="Enter the answer text that \
                                            you want displayed",)

    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    
    def __str__(self):
      return self.prompt

class Submission(models.Model):
    """
	Answer submission the users make to guess on questions
	"""
    group = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    subscribed_notifiaction = models.BooleanField(default=False)
    correct = models.BooleanField(blank=False,
                                  default=False,
                                  help_text="Is this a correct answer?",
                                  verbose_name="Correct")
    
    def __str__(self):
      return self.answer

class Win(models.Model):
    submission = models.ForeignKey(Question, on_delete=models.CASCADE)