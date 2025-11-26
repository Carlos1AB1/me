# Variables de Entorno - Frontend

## Para desarrollo local

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
# Backend API URL (sin /api al final)
NEXT_PUBLIC_API_URL=https://cabaron23.pythonanywhere.com

# Para desarrollo local con backend en tu máquina:
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## Para producción (Vercel)

Configura en Vercel Dashboard:
- **Variable:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://cabaron23.pythonanywhere.com`
- **Environments:** Production, Preview, Development

O usa Vercel CLI:
```bash
vercel env add NEXT_PUBLIC_API_URL
# Ingresa: https://cabaron23.pythonanywhere.com
```

## Verificar configuración

El archivo `.env.local` ya fue creado con la configuración correcta para PythonAnywhere.

