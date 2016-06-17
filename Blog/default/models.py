from django.db import models

import markdown
import re
# Create your models here.
slre = re.compile(r'[^a-zA-Z0-9-]+')
slre1 = re.compile(r'[ -/\\&]+')
def slugify(txt):
    return slre.sub('', slre1.sub('-', txt)).lower()

class Tag(models.Model):
    name = models.CharField("Name", max_length=50, unique=True)
    slug = models.CharField(max_length=50, null=True)

    def save(self):
        self.slug = slugify(self.name)
        super().save()

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField("Title", max_length=200)
    slug = models.CharField(max_length=200,blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    subtitle = models.CharField("Sub Title", max_length=300)
    content = models.TextField('Entry body', help_text='Use Markdown syntax.')
    pub_date = models.DateTimeField('Date Published')
    body = models.TextField('Entry body as HTML', blank=True, null=True)

    def bool_d():
        return False
    draft = models.BooleanField(default=bool_d)

    def save(self):
        self.body = markdown.markdown(self.content, extensions=['markdown.extensions.codehilite','markdown.extensions.fenced_code'])
        self.slug = slugify(self.title)
        super().save()

    def __str__(self):
        return self.title
