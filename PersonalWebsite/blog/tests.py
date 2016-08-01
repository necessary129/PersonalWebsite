from django.test import TestCase
from django.test import Client

from django.utils import timezone

from .models import Post, Tag



# Create your tests here.
class DefaultTest(TestCase):
    def setUp(self):
        self.c = Client()

    def test_relations(self):
        tags = [Tag.objects.create(name=str(i)) for i in range(10)]
        for tg in tags:
            tg.save()
        pst = Post.objects.create(title='Test',subtitle='Test',content="# Head",pub_date=timezone.now())
        pst.save()
        pst.tags.add(*tags)
        self.assertEqual(list(pst.tags.all()), tags)
        for tg in tags:
            self.assertEqual(list(tg.post_set.all()), [pst])

    
