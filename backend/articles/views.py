from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
import os
from .models import Article, Occuped, File, Message, Page
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import fitz
import zipfile

def formatDate(date):
    new_date = date.strftime("%d %B %Y, %H:%M").split()
    new_date[1] = new_date[1].capitalize()
    new_date = " ".join(new_date)
    return new_date


def articles(request):
    articlesRaw = Article.objects.all().order_by("position")
    articles = [[], [], []]
    for article in articlesRaw:{
        articles[int(article.col) - 1].append({
            "id" : article.pk,
            "pag" : article.pag,
            "title" : article.title,
            "text" : article.text,
            "date" : formatDate(article.date)
        })
    }
    return JsonResponse(articles, safe=False)


@csrf_exempt
def addArticle(request):
    data = JSONParser().parse(request)
    newArticle = Article.objects.create(
        pag = data['pag'],
        title = data['title'],
        text = data['text'],
        col = data['col'],
        position = Article.objects.filter(col = data['col']).count()
    )
    newArticle.save()
    return JsonResponse({"status" : "Succes"}, safe=False)


@csrf_exempt
def deleteArticle(request, id):
    Article.objects.get(id = id).delete()
    return JsonResponse({"status" : "Succes"}, safe=False)


@csrf_exempt
def changeCol(request):
    data = JSONParser().parse(request)
    i = 0
    for id in data['order']:
        article = Article.objects.get(id = id)
        article.col = data['col']
        article.position = i
        i += 1
        article.save() 
    return JsonResponse({"status" : "Succes"}, safe=False)


@csrf_exempt
def changeArticle(request):
    data = JSONParser().parse(request)
    article = Article.objects.get(id = data['id'])
    article.title = data["title"]
    article.text = data["text"]
    article.pag = data["pag"]
    article.save()
    return JsonResponse({"status" : "Succes"}, safe=False)


@csrf_exempt
def getStatus(request):
    status = Occuped.objects.get_or_create(id = 0)[0]
    return JsonResponse({"occuped" : status.status}, safe=False)


@csrf_exempt
def changeStatus(request):
    data = JSONParser().parse(request)
    status = Occuped.objects.get_or_create(id = 0)[0]
    status.status = data['status']
    status.save()
    return JsonResponse({"status" : "Succes"}, safe=False)


@csrf_exempt
def getMessages(request):
    messages_raw = Message.objects.order_by("-date")
    messages = []
    for i in messages_raw:
        messages.append({
            "text" : i.text,
            "date" : formatDate(i.date)
        })
    return JsonResponse({"messages" : messages}, safe=False)


@csrf_exempt
def sendMessage(request):
    data = JSONParser().parse(request)
    newMessage = Message.objects.create(text = data['text'])
    newMessage.save()
    return JsonResponse({"status" : "Succes"}, safe=False)


@csrf_exempt
def getPages(request):
    pages = []
    for i in range(8):
        page = Page.objects.get_or_create(id = i)[0]
        pages.append("http://127.0.0.1:8000/api/media/pages/" + os.path.basename(page.file.name))
    return JsonResponse({"pages" : pages}, safe=False)


@csrf_exempt
def setPages(request):
    file = request.FILES['file']
    path = default_storage.save('main.pdf', ContentFile(file.read()))
    doc = fitz.open(os.path.join(settings.MEDIA_ROOT, path))
    for i in range(8):
        page = doc.load_page(i)
        pix = page.getPixmap()
        pix.writePNG(settings.MEDIA_ROOT + '/pages/page' + str(i + 1) + ".png")
        newPage = Page.objects.get_or_create(id = i)[0]
        newPage.file = settings.MEDIA_ROOT + '/pages/page' + str(i + 1) + ".png"
        newPage.save()
    return JsonResponse({"status" : "Succes"}, safe=False)


@csrf_exempt
def getFiles(request):
    data = JSONParser().parse(request)
    lk = data['lk']
    response = {}
    files = []
    for i in File.objects.order_by("-date")[ : 20 * lk]:
        files.append({
            "id" : i.id,
            "file" : "http://127.0.0.1:8000/api/media/" + os.path.basename(i.file.name),
            "name" : i.file.name,
            "date" : formatDate(i.date),
            "newEdition" : i.newEdition,
            "downloaded" : i.downloaded
        })
    response = {
        'files' : files,
        'last' : (File.objects.all().count() - 20 * (lk - 1)) < 20
    }
    return JsonResponse(response, safe=False)


@csrf_exempt
def downloadFile(request):
    file = File.objects.create(file = request.FILES['file'])
    file.save()
    return JsonResponse({"status" : "succes"}, safe=False)

@csrf_exempt
def prepareDownload(request):
    data = JSONParser().parse(request)
    with zipfile.ZipFile('media/file-uri.zip', 'w') as zipObj:
        for i in data['files']:
            obj = File.objects.get(id = i)
            zipObj.write(obj.file.path, obj.file.name)
            obj.downloaded = True
            obj.save()
    zipObj.close()
    return JsonResponse({"status" : "succes"}, safe=False)


@csrf_exempt
def nextGeneration(request):
    for article in Article.objects.filter(col = 3):
        article.delete()
    for article in Article.objects.filter(col = 2):
        article.col = 3
        article.save()
    fileObj = File.objects.last()
    fileObj.newEdition = True
    fileObj.save()
    return JsonResponse({"status" : "succes"}, safe=False)