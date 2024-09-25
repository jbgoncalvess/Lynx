# Generated by Django 4.2.11 on 2024-09-25 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_rename_container_id_containermetrics_container_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='containermetrics',
            name='rps',
        ),
        migrations.AddField(
            model_name='containermetrics',
            name='disk_usage',
            field=models.FloatField(default=0),
        ),
    ]