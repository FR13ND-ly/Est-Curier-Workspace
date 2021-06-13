from django.urls import path ,include
from django.conf.urls import url
from . import views
from django.conf import settings
from django.views.static import serve
from django.conf.urls.static import static

urlpatterns = [
    path('getStatus/', views.getStatus),
    path('getMessages/', views.getMessages),
    path('sendMessage/', views.sendMessage),
    path('changeStatus/', views.changeStatus),
    path('articles/', views.articles),
    path('addArticle/', views.addArticle),
    path('deleteArticle/<int:id>/', views.deleteArticle),
    path('changeCol/', views.changeCol),
    path('changeArticle/', views.changeArticle),
    path('setPages/', views.setPages),
    path('getPages/', views.getPages),
    path('getFiles/', views.getFiles),
    path('downloadFile/', views.downloadFile),
    path('prepareDownload/', views.prepareDownload),
    path('nextGeneration/', views.nextGeneration),
    url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}), 
]