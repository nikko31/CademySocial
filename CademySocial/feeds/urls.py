# coding: utf-8

from django.conf.urls import url

from CademySocial.feeds import views

urlpatterns = [
    url(r'^$', views.feeds, name='feeds'),
    url(r'^load/$', views.load, name='load'),
]