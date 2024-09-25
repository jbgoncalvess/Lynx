# Generated by Django 4.2.11 on 2024-09-20 22:14

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_dailymax_delete_weekmax'),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyMin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(unique=True)),
                ('min_containers', models.IntegerField(default=0)),
                ('time', models.DateTimeField(default=django.utils.timezone.localtime)),
            ],
        ),
    ]