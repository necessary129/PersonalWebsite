from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    subtitle = models.CharField(max_length=300)
    content = models.TextField()
    pub_date = models.DateTimeField('date published')

    def bool_d():
        return False
    draft = models.BooleanField(default=bool_d)

    def __str__(self):
        return self.title
