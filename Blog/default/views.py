from django.shortcuts import render, get_object_or_404
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
    post = get_object_or_404(Post, slug=slug)
    return render(request, 'default/post.html', {'post': post})
