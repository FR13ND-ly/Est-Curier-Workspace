# Generated by Django 3.2.3 on 2021-05-27 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0003_alter_article_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='position',
            field=models.PositiveIntegerField(default=0),
        ),
    ]