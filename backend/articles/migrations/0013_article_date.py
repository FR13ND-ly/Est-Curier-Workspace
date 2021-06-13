# Generated by Django 3.2.3 on 2021-06-04 15:37

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0012_file_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]