# Generated by Django 3.1.1 on 2020-11-30 04:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fupot', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='question_instance',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='fupot.question'),
        ),
    ]
