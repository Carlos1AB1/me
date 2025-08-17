from django.contrib import admin
from .models import SkillCategory, Skill

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    """
    Admin para categorías de habilidades
    """
    list_display = ['name', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['order', 'is_active']
    ordering = ['order', 'name']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """
    Admin para habilidades
    """
    list_display = ['name', 'category', 'level', 'years_experience', 'is_featured', 'order']
    list_filter = ['category', 'level', 'is_featured']
    search_fields = ['name', 'description']
    list_editable = ['level', 'is_featured', 'order']
    ordering = ['category', 'order', 'name']
    
    fieldsets = (
        ('Información básica', {
            'fields': ('name', 'category', 'level', 'description')
        }),
        ('Visualización', {
            'fields': ('icon', 'image_url')
        }),
        ('Configuración', {
            'fields': ('years_experience', 'is_featured', 'order')
        }),
    )
