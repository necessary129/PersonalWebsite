from django.contrib import admin

from .models import Post
# Register your models here.
admin.site.site_header = "Blog administration"
admin.site.site_title = "Blog administration"
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'pub_date', 'draft']
    list_filter = ['draft', 'pub_date']
    fieldsets = (
    (None, {'fields': ('title', 'subtitle', 'content', 'pub_date', 'draft')}),
    )

admin.site.register(Post, PostAdmin)
