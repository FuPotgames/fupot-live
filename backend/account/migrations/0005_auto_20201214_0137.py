# Generated by Django 3.1.1 on 2020-12-14 01:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_auto_20201214_0135'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='birthday',
        ),
        migrations.RemoveField(
            model_name='account',
            name='fucoins',
        ),
        migrations.RemoveField(
            model_name='account',
            name='login_streak',
        ),
        migrations.RemoveField(
            model_name='account',
            name='num_wins',
        ),
        migrations.RemoveField(
            model_name='account',
            name='sex',
        ),
    ]
