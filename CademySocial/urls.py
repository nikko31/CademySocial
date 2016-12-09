"""CademySocial URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include

from django.contrib.auth import views as auth_views
from CademySocial.core import views as core_views
from CademySocial.authentication import views as cademy_auth_views

urlpatterns = [
    url(r'^$', core_views.home, name='home'),
    url(r'^feeds/', include('CademySocial.feeds.urls')),
    # articles
    url(r'^articles/', include('CademySocial.articles.urls')),
    # login
    url(r'^login', auth_views.login, {'template_name': 'core/cover.html'}, name='login'),
    url(r'^logout', auth_views.logout, {'next_page': '/'}, name='logout'),
    # signup
    url(r'^signup/$', cademy_auth_views.signup, name='signup'),
    url(r'^(?P<username>[^/]+)/$', core_views.profile, name='profile'),
    url(r'^i18n/', include('django.conf.urls.i18n', namespace='i18n')),
    url(r'^feeds/', include('CademySocial.feeds.urls')),
    url(r'^settings/$', core_views.settings, name='settings'),

]
