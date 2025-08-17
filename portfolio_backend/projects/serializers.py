from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer para proyectos
    """
    technologies_list = serializers.ReadOnlyField(source='get_technologies_list')
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'image', 'github_url', 'live_url', 'technologies', 'technologies_list',
            'priority', 'status', 'featured', 'start_date', 'end_date',
            'created_by', 'created_by_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def get_image(self, obj):
        """
        Devuelve la URL completa de la imagen
        """
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            else:
                return f"http://127.0.0.1:8000{obj.image.url}"
        return None

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)

class ProjectListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listado de proyectos
    """
    technologies_list = serializers.ReadOnlyField(source='get_technologies_list')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'short_description', 'image',
            'technologies_list', 'priority', 'featured', 'github_url', 'live_url'
        ]
    
    def get_image(self, obj):
        """
        Devuelve la URL completa de la imagen
        """
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            else:
                return f"http://127.0.0.1:8000{obj.image.url}"
        return None
