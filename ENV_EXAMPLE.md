# Variables de Entorno - Frontend

## Para desarrollo local

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=https://cabaron23.pythonanywhere.com/api

# Para desarrollo local con backend en tu máquina:
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

## Para producción (Vercel)

Configura en Vercel Dashboard:
- **Variable:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://cabaron23.pythonanywhere.com/api`
- **Environments:** Production, Preview, Development

O usa Vercel CLI:
```bash
vercel env add NEXT_PUBLIC_API_URL
# Ingresa: https://cabaron23.pythonanywhere.com/api
```

## Verificar configuración

El archivo `.env.local` ya fue creado con la configuración correcta para PythonAnywhere.

