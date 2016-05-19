from django.shortcuts import render
from django.http import Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import Post

# Create your views here.

def index(request, page):
    posts = Post.objects.filter(draft=False).order_by('-pub_date')
    paginator = Paginator(posts, 10)
    if not page:
        posts = paginator.page(1)
    else:
        try:
            posts = paginator.page(int(page))
        except EmptyPage:
            raise Http404("Page does not exist.")
    return render(request, 'default/index.html', {'posts': posts})


def contact(request):
    pass

def about(request):
    pass

def post(request, slug):
    pass
