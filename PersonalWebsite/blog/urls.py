from django.conf.urls import url

from . import views

app_name = 'blog'

urlpatterns = [
    url(r'^(?:page/(?P<page>\d+)/)?$', views.index, name="home"),
    url(r'^about/$', views.about, name="about"),
    url(r'^contact/$', views.contact, name="contact"),
    url(r'^post/(?P<pk>\d+)/(?P<slug>[\w-]+)/$', views.post, name="post"),
    url(r'^mail/$', views.mail, name="mail"),
    url(r'^tag/(?P<slug>[\w-]+)/(?:page/(?P<page>\d+)/)?$', views.tag, name="tag")
]
