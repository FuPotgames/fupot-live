# Generated by Django 3.1.1 on 2020-12-14 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_account_is_verified'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='avatar',
            field=models.ImageField(upload_to='fupot/user/avatars/'),
        ),
    ]