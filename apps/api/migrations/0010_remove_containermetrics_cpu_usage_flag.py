# Generated by Django 4.2.11 on 2024-11-14 02:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_delete_cpuusagecontrol_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='containermetrics',
            name='cpu_usage_flag',
        ),
    ]
