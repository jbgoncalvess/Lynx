# Generated by Django 4.2.11 on 2024-09-22 02:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_dailymin'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ContainerStatus',
            new_name='CurrentCount',
        ),
    ]
