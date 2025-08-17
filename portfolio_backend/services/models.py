from django.db import models
from django.core.validators import MinValueValidator

class ServiceCategory(models.Model):
    """
    Categorías de servicios
    """
    name = models.CharField(max_length=100, verbose_name="Nombre")
    description = models.TextField(blank=True, verbose_name="Descripción")
    icon = models.CharField(max_length=10, blank=True, verbose_name="Icono")
    color = models.CharField(max_length=7, default="#1d6ff2", verbose_name="Color")
    order = models.PositiveIntegerField(default=0, verbose_name="Orden")
    is_active = models.BooleanField(default=True, verbose_name="Activo")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Categoría de Servicio"
        verbose_name_plural = "Categorías de Servicios"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Service(models.Model):
    """
    Servicios ofrecidos
    """
    DURATION_CHOICES = [
        ('1-2_weeks', '1-2 semanas'),
        ('3-4_weeks', '3-4 semanas'),
        ('1-2_months', '1-2 meses'),
        ('3-6_months', '3-6 meses'),
        ('custom', 'Personalizado'),
    ]

    PRICE_TYPE_CHOICES = [
        ('fixed', 'Precio fijo'),
        ('hourly', 'Por hora'),
        ('project', 'Por proyecto'),
        ('quote', 'Cotización'),
    ]

    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(unique=True, verbose_name="URL amigable")
    category = models.ForeignKey(
        ServiceCategory, 
        on_delete=models.CASCADE, 
        related_name='services',
        verbose_name="Categoría"
    )
    description = models.TextField(verbose_name="Descripción")
    short_description = models.CharField(
        max_length=300, 
        verbose_name="Descripción corta",
        help_text="Resumen breve del servicio"
    )
    icon = models.CharField(max_length=10, blank=True, verbose_name="Icono")
    image = models.ImageField(
        upload_to='services/',
        blank=True,
        null=True,
        verbose_name="Imagen"
    )
    
    # Pricing
    price_type = models.CharField(
        max_length=20,
        choices=PRICE_TYPE_CHOICES,
        default='quote',
        verbose_name="Tipo de precio"
    )
    price_from = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        verbose_name="Precio desde"
    )
    price_currency = models.CharField(
        max_length=3,
        default='USD',
        verbose_name="Moneda"
    )
    
    # Duration
    duration = models.CharField(
        max_length=20,
        choices=DURATION_CHOICES,
        default='custom',
        verbose_name="Duración"
    )
    custom_duration = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Duración personalizada"
    )
    
    # Features
    features = models.JSONField(
        default=list,
        verbose_name="Características",
        help_text="Lista de características del servicio"
    )
    
    # Technology stack
    technologies = models.JSONField(
        default=list,
        verbose_name="Tecnologías",
        help_text="Tecnologías utilizadas en este servicio"
    )
    
    # Status and visibility
    is_featured = models.BooleanField(default=False, verbose_name="Destacado")
    is_active = models.BooleanField(default=True, verbose_name="Activo")
    show_price = models.BooleanField(default=True, verbose_name="Mostrar precio")
    order = models.PositiveIntegerField(default=0, verbose_name="Orden")
    
    # SEO
    meta_description = models.CharField(
        max_length=160,
        blank=True,
        verbose_name="Meta descripción"
    )
    meta_keywords = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Meta keywords"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Servicio"
        verbose_name_plural = "Servicios"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def get_price_display(self):
        """Retorna el precio formateado"""
        if self.price_type == 'quote':
            return "Cotización"
        elif self.price_from:
            return f"Desde ${self.price_from} {self.price_currency}"
        return "Consultar precio"

    def get_duration_display(self):
        """Retorna la duración formateada"""
        if self.duration == 'custom' and self.custom_duration:
            return self.custom_duration
        return dict(self.DURATION_CHOICES).get(self.duration, self.duration)

class ServiceFeature(models.Model):
    """
    Características adicionales de servicios
    """
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='additional_features',
        verbose_name="Servicio"
    )
    title = models.CharField(max_length=200, verbose_name="Título")
    description = models.TextField(blank=True, verbose_name="Descripción")
    icon = models.CharField(max_length=10, blank=True, verbose_name="Icono")
    is_included = models.BooleanField(default=True, verbose_name="Incluido")
    additional_cost = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)],
        verbose_name="Costo adicional"
    )
    order = models.PositiveIntegerField(default=0, verbose_name="Orden")

    class Meta:
        verbose_name = "Característica de Servicio"
        verbose_name_plural = "Características de Servicios"
        ordering = ['order', 'title']

    def __str__(self):
        return f"{self.service.title} - {self.title}"
