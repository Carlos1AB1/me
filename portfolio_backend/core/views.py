from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class HealthCheckView(APIView):
    """
    Vista para verificar el estado de la API
    """
    
    @swagger_auto_schema(
        responses={200: openapi.Response('API funcionando correctamente')}
    )
    def get(self, request):
        return Response({
            'status': 'ok',
            'message': 'API funcionando correctamente',
            'version': '1.0.0'
        }, status=status.HTTP_200_OK)
