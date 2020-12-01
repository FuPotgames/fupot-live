from django.core.mail import EmailMessage
from django.template import Context
from django.template.loader import render_to_string, get_template

import threading


class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class Util:
    @staticmethod
    def send_email(data,message):
        message = message
        email = EmailMessage(
            subject=data['email_subject'], body=message, to=[data['to_email']])
        email.content_subtype = 'html'
        EmailThread(email).start()