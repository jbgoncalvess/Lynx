# Generated by Django 4.2.11 on 2024-11-12 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_hostdailymaxmin_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hostdailymaxmin',
            name='time',
            field=models.DateField(unique=True),
        ),
    ]