from django.contrib import admin
from django.utils.html import mark_safe
from .models import ServiceCategory, Service, ServiceFeature

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'description')
    ordering = ('order', 'name')
    prepopulated_fields = {}

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price_type', 'price_from', 'duration', 'is_featured', 'image_preview', 'is_active', 'order')
    list_filter = ('category', 'price_type', 'duration', 'is_featured', 'is_active', 'created_at')
    search_fields = ('title', 'description', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', '-created_at')
    readonly_fields = ['image_preview']
    
    def image_preview(self, obj):
        """
        Muestra una vista previa de la imagen en el admin
        """
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />')
        return "Sin imagen"
    image_preview.short_description = "Vista previa"
    
    fieldsets = (
        ('Información básica', {
            'fields': ('title', 'slug', 'category', 'description', 'short_description', 'icon', 'image', 'image_preview')
        }),
        ('Precio', {
            'fields': ('price_type', 'price_from', 'price_currency', 'show_price')
        }),
        ('Duración', {
            'fields': ('duration', 'custom_duration')
        }),
        ('Características y Tecnologías', {
            'fields': ('features', 'technologies'),
            'classes': ('collapse',)
        }),
        ('Configuración', {
            'fields': ('is_featured', 'is_active', 'order')
        }),
        ('SEO', {
            'fields': ('meta_description', 'meta_keywords'),
            'classes': ('collapse',)
        })
    )

@admin.register(ServiceFeature)
class ServiceFeatureAdmin(admin.ModelAdmin):
    list_display = ('title', 'service', 'is_included', 'additional_cost', 'order')
    list_filter = ('is_included', 'service__category')
    search_fields = ('title', 'description', 'service__title')
    ordering = ('service', 'order', 'title')
