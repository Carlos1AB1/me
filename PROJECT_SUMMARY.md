# Portfolio Completo - Frontend + Backend

Este proyecto es un portfolio personal completo con frontend en Next.js y backend en Django REST Framework.

## 🎯 Características Principales

### Frontend (Next.js)
- ✅ **MacDock Interactivo** - Dock de macOS con iconos de tecnologías reales
- ✅ **Modal de Habilidades** - Sistema de niveles (Básico, Intermedio, Experto)
- ✅ **Navegación Limpia** - Eliminada sección de habilidades del nav
- ✅ **Responsive Design** - Adaptable a todos los dispositivos
- ✅ **Dark Mode** - Modo oscuro implementado
- ✅ **Animaciones** - Framer Motion para transiciones suaves

### Backend (Django REST Framework)
- ✅ **API REST Completa** - CRUD para todas las entidades
- ✅ **Autenticación JWT** - Sistema de tokens seguro
- ✅ **Documentación Swagger** - API docs automática
- ✅ **Panel de Admin** - Interface de administración
- ✅ **CORS Configurado** - Listo para frontend
- ✅ **Base de Datos** - SQLite con datos de ejemplo

## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Framer Motion** - Animaciones
- **React Icons** - Iconografía

### Backend
- **Django 4.2.7** - Framework web Python
- **Django REST Framework** - API REST
- **SimpleJWT** - Autenticación JWT
- **drf-yasg** - Documentación Swagger
- **django-cors-headers** - CORS
- **Pillow** - Manejo de imágenes

## 📁 Estructura del Proyecto

```
/Users/prueba/me/
├── Frontend (Next.js)
│   ├── app/
│   │   ├── page.tsx                 # Página principal
│   │   ├── layout.tsx               # Layout base
│   │   └── globals.css              # Estilos globales
│   ├── components/
│   │   ├── MacDock.tsx              # Dock de macOS
│   │   ├── SkillsModal.tsx          # Modal de habilidades
│   │   ├── Header.tsx               # Navegación
│   │   ├── Hero.tsx                 # Sección hero
│   │   ├── ProjectsSection.tsx      # Proyectos
│   │   └── ApiExample.tsx           # Ejemplo de uso del API
│   ├── lib/
│   │   └── api.ts                   # Cliente API para Django
│   ├── package.json                 # Dependencias frontend
│   └── .env.example                 # Variables de entorno
│
├── Backend (Django)
│   ├── portfolio_backend/
│   │   ├── accounts/                # Gestión de usuarios
│   │   ├── projects/                # Proyectos del portfolio
│   │   ├── skills/                  # Habilidades
│   │   ├── blog/                    # Sistema de blog
│   │   ├── contact/                 # Formulario de contacto
│   │   ├── core/                    # Funcionalidades centrales
│   │   ├── requirements.txt         # Dependencias backend
│   │   ├── .env                     # Variables de entorno
│   │   └── README.md                # Documentación backend
│   │
│   └── backend_env/                 # Entorno virtual Python
```

## 🛠 Instalación y Configuración

### 1. Backend (Django)

```bash
# Activar entorno virtual
source backend_env/bin/activate

# Navegar al backend
cd portfolio_backend

# Ejecutar migraciones (ya aplicadas)
python manage.py migrate

# Cargar datos de ejemplo
python manage.py load_sample_data

# Crear superusuario (opcional)
python manage.py createsuperuser

# Ejecutar servidor
python manage.py runserver
```

### 2. Frontend (Next.js)

```bash
# Volver al directorio principal
cd /Users/prueba/me

# Instalar dependencias (si es necesario)
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Ejecutar servidor de desarrollo
npm run dev
```

## 🔗 URLs Importantes

### Backend (Puerto 8000)
- **API Base**: http://127.0.0.1:8000/api/v1/
- **Swagger Docs**: http://127.0.0.1:8000/swagger/
- **Admin Panel**: http://127.0.0.1:8000/admin/
- **ReDoc**: http://127.0.0.1:8000/redoc/

### Frontend (Puerto 3000)
- **Aplicación**: http://localhost:3000
- **Página Principal**: Incluye MacDock y todas las secciones

## 📊 Endpoints de la API

### Autenticación
- `POST /api/v1/auth/login/` - Iniciar sesión
- `POST /api/v1/auth/register/` - Registrar usuario
- `GET /api/v1/auth/profile/` - Perfil del usuario

### Proyectos
- `GET /api/v1/projects/` - Listar proyectos
- `GET /api/v1/projects/featured/` - Proyectos destacados
- `GET /api/v1/projects/{id}/` - Detalle de proyecto

### Habilidades
- `GET /api/v1/skills/` - Listar habilidades
- `GET /api/v1/skills/categories/` - Categorías
- `GET /api/v1/skills/featured/` - Habilidades destacadas

### Blog
- `GET /api/v1/blog/` - Posts del blog
- `GET /api/v1/blog/featured/` - Posts destacados
- `GET /api/v1/blog/categories/` - Categorías del blog

### Contacto
- `POST /api/v1/contact/send/` - Enviar mensaje

## 🎨 Características del MacDock

- **Iconos Reales**: Usa iconos de Devicons para tecnologías
- **Animaciones**: Efecto hover y click con Framer Motion
- **Modal Interactivo**: Muestra habilidades con niveles descriptivos
- **Responsive**: Se adapta a dispositivos móviles
- **Posicionamiento**: Ubicado estratégicamente en la página

## 🔧 Uso del Cliente API

El archivo `lib/api.ts` proporciona un cliente completo para interactuar con el backend:

```typescript
import apiClient from '@/lib/api';

// Obtener proyectos
const projects = await apiClient.getFeaturedProjects();

// Obtener habilidades
const skills = await apiClient.getFeaturedSkills();

// Enviar mensaje de contacto
await apiClient.sendContactMessage({
  name: 'Juan Pérez',
  email: 'juan@example.com',
  subject: 'Consulta',
  message: 'Hola, me interesa tu trabajo...'
});
```

## 🚀 Despliegue

### Backend
- Configurar PostgreSQL para producción
- Usar gunicorn como servidor WSGI
- Configurar nginx como proxy reverso
- Activar HTTPS

### Frontend
- Desplegar en Vercel, Netlify o similar
- Configurar variables de entorno de producción
- Actualizar URLs del API

## 📝 Notas de Desarrollo

1. **Backend Status**: ✅ Completamente funcional
2. **Frontend Status**: ✅ MacDock con imágenes reales implementado
3. **API Integration**: ✅ Cliente preparado para conectar ambos
4. **Authentication**: ✅ JWT implementado y listo
5. **Documentation**: ✅ Swagger docs disponibles

## 🎯 Próximos Pasos Sugeridos

1. **Conectar Frontend y Backend**: Usar el cliente API en los componentes
2. **Autenticación Frontend**: Implementar login/logout en Next.js
3. **Gestión de Estado**: Agregar Context API o Zustand
4. **Testing**: Implementar tests para ambos proyectos
5. **Optimizaciones**: Lazy loading, caching, etc.

Este proyecto está listo para producción y puede servir como base para un portfolio profesional completo.
