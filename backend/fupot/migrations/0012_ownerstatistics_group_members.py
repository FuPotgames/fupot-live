# Generated by Django 3.1.1 on 2020-12-26 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fupot', '0011_auto_20201226_0547'),
    ]

    operations = [
        migrations.AddField(
            model_name='ownerstatistics',
            name='group_members',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]