from django.contrib import admin
from .models import Article, Message, File, Page

admin.site.register(Article)
admin.site.register(Message)
admin.site.register(Page)
admin.site.register(File)