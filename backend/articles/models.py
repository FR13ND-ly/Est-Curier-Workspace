from django.conf import settings
from django.db import models
from django.utils import timezone

class Article(models.Model):
    id = models.AutoField(primary_key=True)
    pag = models.CharField(max_length=10)
    title = models.CharField(max_length=200)
    text = models.TextField()
    col = models.CharField(max_length=10)
    date = models.DateTimeField(default=timezone.now)
    position = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class Message(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.text

class Occuped(models.Model):
    id = models.AutoField(primary_key=True)
    status = models.BooleanField(default=False)

class File(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField(blank=False, null=False)
    date = models.DateTimeField(default=timezone.now)
    newEdition = models.BooleanField(default = False)
    downloaded = models.BooleanField(default=False)
    def __str__(self):
        return self.file.name

class Page(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField(blank=False, null=False)
    date = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.file.name