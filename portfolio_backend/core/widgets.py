from django import forms
from django.utils.html import mark_safe
from django.utils.safestring import mark_safe as safe

class ImagePreviewWidget(forms.ClearableFileInput):
    """
    Widget personalizado para mostrar vista previa de imágenes
    """
    
    def render(self, name, value, attrs=None, renderer=None):
        # Renderizar el widget original
        html = super().render(name, value, attrs, renderer)
        
        if value and hasattr(value, 'url'):
            # Agregar vista previa de la imagen
            preview_html = f'''
            <div style="margin-top: 10px;">
                <p><strong>Vista previa actual:</strong></p>
                <img src="{value.url}" 
                     style="max-width: 200px; max-height: 200px; object-fit: cover; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" 
                     alt="Vista previa" />
                <p style="font-size: 12px; color: #666; margin-top: 5px;">
                    <strong>URL:</strong> <a href="{value.url}" target="_blank">{value.url}</a>
                </p>
            </div>
            '''
            html += safe(preview_html)
        
        return safe(html)

class ImagePreviewForm(forms.ModelForm):
    """
    Formulario base que incluye vista previa de imágenes
    """
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Aplicar el widget personalizado a todos los ImageField
        for field_name, field in self.fields.items():
            if isinstance(field, forms.ImageField):
                field.widget = ImagePreviewWidget()
                field.help_text = "Formatos admitidos: JPG, PNG, GIF, WebP. Tamaño máximo: 5MB"
