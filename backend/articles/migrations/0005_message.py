# Generated by Django 3.2.3 on 2021-05-30 08:54

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_article_position'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('text', models.TextField()),
                ('date', models.DateTimeField(default=datetime.datetime(2021, 5, 30, 8, 54, 38, 105410, tzinfo=utc))),
            ],
        ),
    ]