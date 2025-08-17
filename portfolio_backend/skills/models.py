from django.db import models

class SkillCategory(models.Model):
    """
    Categorías de habilidades
    """
    name = models.CharField(max_length=100, verbose_name='Nombre')
    description = models.TextField(blank=True, verbose_name='Descripción')
    icon = models.CharField(max_length=50, blank=True, help_text='Clase CSS o emoji', verbose_name='Icono')
    order = models.PositiveIntegerField(default=0, verbose_name='Orden')
    is_active = models.BooleanField(default=True, verbose_name='Activo')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Categoría de Habilidad'
        verbose_name_plural = 'Categorías de Habilidades'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Skill(models.Model):
    """
    Habilidades técnicas
    """
    LEVEL_CHOICES = [
        ('Básico', 'Básico'),
        ('Intermedio', 'Intermedio'),
        ('Experto', 'Experto'),
    ]

    name = models.CharField(max_length=100, verbose_name='Nombre')
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills', verbose_name='Categoría')
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, verbose_name='Nivel')
    icon = models.CharField(max_length=50, blank=True, help_text='Emoji o clase CSS', verbose_name='Icono')
    image = models.ImageField(upload_to='skills/', blank=True, null=True, verbose_name='Imagen')
    description = models.TextField(blank=True, verbose_name='Descripción')
    years_experience = models.PositiveIntegerField(default=0, verbose_name='Años de experiencia')
    is_featured = models.BooleanField(default=False, verbose_name='Destacada')
    order = models.PositiveIntegerField(default=0, verbose_name='Orden')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Habilidad'
        verbose_name_plural = 'Habilidades'
        ordering = ['category', 'order', 'name']
        unique_together = ['name', 'category']

    def __str__(self):
        return f"{self.name} ({self.category.name})"
