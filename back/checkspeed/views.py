from django.shortcuts import render
from rest_framework.response import Response 
from rest_framework.decorators import api_view
import speedtest

@api_view(["GET"])
def getSpeed(request):
    test = speedtest.Speedtest()
    down_speed = test.download()/1024/1024
    up_speed = test.upload()/1024/1024
    download = round(down_speed,2)
    upload = round(up_speed,2)
    return Response({'download':download,'upload':upload})