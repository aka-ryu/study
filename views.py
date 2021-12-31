from django.http.response import HttpResponse
from django.shortcuts import render, HttpResponse, redirect
import random
from django.views.decorators.csrf import csrf_exempt


nextid = 4
topics = [
    {'id':1, 'title':'routing', 'body':'Routing is ..'},
    {'id':2, 'title':'view', 'body':'view is ..'},
    {'id':3, 'title':'Model', 'body':'Model is ..'}
]

def HTMLTemplate(articleTag, id=None):
    global topics
    contextUI = ''
    if id != None :
        contextUI = F'''
            <li>
                <form action="/delete" method="post">
                    <input type="hidden" name="id" value={id}>
                    <input type="submit" value="delete">
                </form>
            </li>
        '''
    ol = ''
    
    for topic in topics:
        ol += f'<li><a href="/read/{topic["id"]}">{topic["title"]}</a></li>'
    
    return f'''
    <html>
    <body>
        <h1><a href="/">Django</a></h1>
        <ul>
            {ol}
        </ul>
        {articleTag}
        <ul>
            <li><a href="/create">create</a></li>
            {contextUI}
        </ul>
    </body>
    </html>
    '''


def index(req):
    article = '''
        <h2>Welcome</h2>
        Hello, Django
    '''
    return HttpResponse(HTMLTemplate(article))


def read(req, id):
    global topics
    article = ''
    for topic in topics:
        print(type(topic['id']), type(id))
        if topic['id'] == int(id):
            article = f'<h2>{topic["title"]}</h2>{topic["body"]}'
    return HttpResponse(HTMLTemplate(article, id))

@csrf_exempt
def create(req):
    global nextid
    if req.method == 'GET' :
        article = '''
            <form action="/create" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p><textarea name="body" placeholder="body"></textarea></p>
                <p><input type="submit"></p>
            </form>
        '''
        return HttpResponse(HTMLTemplate(article,))
    
    elif req.method == 'POST' :
        title = req.POST['title']
        body = req.POST['body']
        newTopic = {"id":nextid, "title":title, "body":body}
        topics.append(newTopic)
        url='/read/' + str(nextid)
        nextid = nextid + 1
        return redirect(url)


@csrf_exempt
def delete(req):
    global topics
    if req.method == 'POST' :
        id = req.POST['id']
        newTopics = []
        for topic in topics:
            if topic['id'] != int(id):
                newTopics.append(topic)
        topics = newTopics
        return redirect('/')