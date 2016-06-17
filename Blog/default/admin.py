from django.contrib import admin

from .models import Post, Tag
# Register your models here.
admin.site.site_header = "Blog administration"
admin.site.site_title = "Blog administration"

class TagAdmin(admin.ModelAdmin):
    fieldsets = (
    (None, {'fields': ('name',)}),
    )

class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'pub_date', 'draft']
    list_filter = ['draft', 'pub_date']
    filter_horizontal = ('tags',)
    fieldsets = (
    (None, {'fields': ('title', 'tags','subtitle', 'content', 'pub_date', 'draft')}),
    )

admin.site.register(Tag, TagAdmin)
admin.site.register(Post, PostAdmin)
