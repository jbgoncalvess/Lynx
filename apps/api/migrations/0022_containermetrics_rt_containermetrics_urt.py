# Generated by Django 4.2.11 on 2024-10-05 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_rename_http_errors_containermetrics_processes_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='containermetrics',
            name='rt',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='containermetrics',
            name='urt',
            field=models.FloatField(default=0),
        ),
    ]
