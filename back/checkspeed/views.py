from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view
import speedtest

@api_view(["GET"])
def getSpeed(request):
    test = speedtest.Speedtest()
    download = test.download() /1024/1024
    upload = test.upload() /1024/1024
    return Response({'download':download,'upload':upload})