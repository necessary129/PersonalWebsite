from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    subtitle = models.CharField(max_length=300)
    content = models.TextField()
    pub_date = models.DateTimeField('date published')
    draft = models.BooleanField(default=lambda: False)

    def __str__(self):
        return self.title
