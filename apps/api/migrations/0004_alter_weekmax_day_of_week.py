# Generated by Django 4.2.11 on 2024-09-19 23:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_weekmax_day_of_week'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weekmax',
            name='day_of_week',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]