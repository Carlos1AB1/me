from rest_framework import serializers
from .models import SkillCategory, Skill

class SkillSerializer(serializers.ModelSerializer):
    """
    Serializer para habilidades
    """
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Skill
        fields = [
            'id', 'name', 'category', 'category_name', 'level', 'icon', 'image_url',
            'description', 'years_experience', 'is_featured', 'order'
        ]

class SkillCategorySerializer(serializers.ModelSerializer):
    """
    Serializer para categorías de habilidades
    """
    skills = SkillSerializer(many=True, read_only=True)
    skills_count = serializers.IntegerField(source='skills.count', read_only=True)

    class Meta:
        model = SkillCategory
        fields = [
            'id', 'name', 'description', 'icon', 'order', 'is_active',
            'skills', 'skills_count'
        ]

class SkillCategoryListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listado de categorías
    """
    skills_count = serializers.IntegerField(source='skills.count', read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'description', 'icon', 'order', 'skills_count']
