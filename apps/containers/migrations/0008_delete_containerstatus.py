# Generated by Django 4.2.11 on 2024-09-19 04:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('containers', '0007_rename_timestamp_containerstatus_hora'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ContainerStatus',
        ),
    ]