from django.http.response import HttpResponse
from django.shortcuts import render, HttpResponse
import random

# Create your views here.
def index(req):
    return HttpResponse('<h1>Random</h1>!' + str(random.random()))

def create(req):
    return HttpResponse('Create')

def read(req, id):
    return HttpResponse('Read' + id)