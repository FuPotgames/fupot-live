# Generated by Django 3.1.1 on 2020-10-30 18:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fupot', '0003_mydevice'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mydevice',
            name='group',
        ),
    ]
