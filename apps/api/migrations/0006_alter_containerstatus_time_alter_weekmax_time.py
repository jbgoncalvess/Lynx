# Generated by Django 4.2.11 on 2024-09-20 00:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_containerstatus_time_alter_weekmax_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='containerstatus',
            name='time',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='weekmax',
            name='time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]