from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin para gestión de proyectos
    """
    list_display = ['title', 'status', 'priority', 'featured', 'created_by', 'created_at']
    list_filter = ['status', 'priority', 'featured', 'created_at']
    search_fields = ['title', 'description', 'technologies']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['status', 'priority', 'featured']
    ordering = ['-priority', '-created_at']
    
    fieldsets = (
        ('Información básica', {
            'fields': ('title', 'slug', 'description', 'short_description')
        }),
        ('Medios', {
            'fields': ('image',)
        }),
        ('Enlaces', {
            'fields': ('github_url', 'live_url')
        }),
        ('Detalles técnicos', {
            'fields': ('technologies', 'start_date', 'end_date')
        }),
        ('Configuración', {
            'fields': ('priority', 'status', 'featured')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not change:  # Si es un nuevo objeto
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
