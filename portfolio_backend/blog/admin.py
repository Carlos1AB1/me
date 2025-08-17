from django.contrib import admin
from .models import Category, BlogPost

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin para categorías del blog
    """
    list_display = ['name', 'slug', 'color', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['is_active']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    """
    Admin para posts del blog
    """
    list_display = ['title', 'status', 'is_featured', 'author', 'views_count', 'created_at']
    list_filter = ['status', 'is_featured', 'categories', 'created_at']
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['status', 'is_featured']
    ordering = ['-created_at']
    filter_horizontal = ['categories']
    
    fieldsets = (
        ('Contenido', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image')
        }),
        ('Categorización', {
            'fields': ('categories', 'tags')
        }),
        ('SEO', {
            'fields': ('meta_description', 'read_time')
        }),
        ('Configuración', {
            'fields': ('status', 'is_featured', 'published_at')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not change:  # Si es un nuevo objeto
            obj.author = request.user
        super().save_model(request, obj, form, change)
