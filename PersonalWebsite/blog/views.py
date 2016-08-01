from django.shortcuts import render, get_object_or_404
from django.http import Http404, HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

import json

from .models import Post, Tag

from .mail import sendmail
from .captcha import verify_recaptcha

# Create your views here.

def index(request, page):
    if page and int(page) == 1:
        raise Http404("Page does not exist.")
    posts = Post.objects.filter(draft=False).order_by('-pub_date')
    paginator = Paginator(posts, 10)
    if not page:
        posts = paginator.page(1)
    else:
        try:
            posts = paginator.page(int(page))
        except EmptyPage:
            raise Http404("Page does not exist.")
    return render(request, 'blog/index.html', {'posts': posts})


def contact(request):
    return render(request, 'blog/contact.html')

def about(request):
    return render(request, 'blog/about.html')

def post(request, pk, slug):
    url = request.build_absolute_uri()
    post = get_object_or_404(Post, pk=pk, slug=slug)
    return render(request, 'blog/post.html', {'post': post,"absurl":url})

def mail(request):
    name = request.POST['name']
    subject = request.POST['subject']
    email = request.POST['email']
    message = request.POST['message']
    if not verify_recaptcha(request):
        return HttpResponse(json.dumps({'result': 'captcha-fail'}),
        content_type='application/json')
    value = sendmail(name, email, subject, message)
    if value:
        return HttpResponse(json.dumps({'result': 'success'}),
        content_type='application/json')
    else:
        return HttpResponse(json.dumps({'result': 'failed'}),
            content_type='application/json')

def tag(request, slug, page):
    if page and int(page) == 1:
        raise Http404("Page does not exist.")
    tag = get_object_or_404(Tag, slug=slug)
    paginator = Paginator(tag.post_set.filter(draft=False).order_by('-pub_date'), 10)
    if not page:
        posts = paginator.page(1)
    else:
        try:
            posts = paginator.page(int(page))
        except EmptyPage:
            raise Http404("Page does not exist.")
    return render(request, 'blog/tag.html', {'posts': posts, 'tag':tag})
