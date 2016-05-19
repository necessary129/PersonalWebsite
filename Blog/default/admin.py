from django.contrib import admin

from .models import Post
# Register your models here.
admin.site.site_header = "Blog administration"
admin.site.sit_title = "Blog administration"
class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ['title', 'pub_date', 'draft']
    list_filter = ['draft', 'pub_date']

admin.site.register(Post, PostAdmin)
