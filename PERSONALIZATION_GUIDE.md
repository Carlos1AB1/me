# 📝 Guía de Personalización del Portfolio

Esta guía te ayudará a reemplazar todos los datos de ejemplo con tu información personal real.

## 🎯 Datos que necesitas personalizar

### 1. Información Personal (Hero Section)
**Archivo**: `components/Hero.tsx`

Reemplaza en las líneas 18-34:
```tsx
<span style={{ color: 'var(--link-color)' }}>Tu Nombre</span> Tu Título
```
```tsx
Tu Descripción Profesional.
```

**Ejemplo**:
```tsx
<span style={{ color: 'var(--link-color)' }}>Carlos Mendoza</span> Desarrollador
```
```tsx
Full Stack especializado en React y Node.js.
```

### 2. Tecnologías del MacDock
**Archivo**: `app/page.tsx`

Reemplaza el array `technologies` (líneas 16-25) con tus tecnologías:
```tsx
const technologies = [
  { name: 'React', icon: '⚛️', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
  { name: 'Node.js', icon: '🟢', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', gradient: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' },
  // Añade tus tecnologías aquí
];
```

**Iconos disponibles**: Busca en [Devicons](https://devicons.github.io/devicon/) las URLs de tus tecnologías.

### 3. Proyectos
**Archivo**: `components/ProjectsSection.tsx`

Reemplaza el array `projects` (líneas 12-25) con tus proyectos:
```tsx
const projects = [
  {
    tag: 'PROYECTO DESTACADO',
    title: 'E-commerce React',
    subtitle: 'Tienda online completa',
    price: 'Ver código',
    priceSubtext: 'GitHub disponible',
    image: 'https://tu-imagen-del-proyecto.jpg',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    deviceType: 'laptop'
  },
  // Añade más proyectos aquí
];
```

**Consejos**:
- Usa imágenes de 400x300px para mejor rendimiento
- `deviceType` puede ser: 'laptop', 'phone', 'desktop'
- Cambia `price` y `priceSubtext` por información relevante de tu proyecto

### 4. Servicios
**Archivo**: `components/ServicesSection.tsx`

Reemplaza el array `services` (líneas 6-18) con tus servicios:
```tsx
const services = [
  {
    icon: '🌐',
    title: 'Desarrollo Web',
    description: 'Aplicaciones web modernas con React y Next.js',
    features: ['Responsive Design', 'SEO Optimizado', 'PWA', 'Performance'],
    price: 'Desde $1,500',
    duration: '2-4 semanas'
  },
  // Añade más servicios aquí
];
```

### 5. Habilidades del Modal
**Archivo**: `components/SkillsModal.tsx`

#### A. Categorías de habilidades (líneas 15-25):
```tsx
const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Interfaces modernas y responsivas',
    skills: [
      { name: 'React', level: 'Experto' },
      { name: 'TypeScript', level: 'Intermedio' },
      { name: 'CSS3', level: 'Experto' },
    ]
  },
  // Añade más categorías aquí
];
```

#### B. Tecnologías del modal (líneas 27-37):
```tsx
const technologies = [
  {
    name: 'React',
    icon: '⚛️',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    gradient: 'linear-gradient(135deg, #61dafb 0%, #21759b 100%)'
  },
  // Debe coincidir con las del MacDock principal
];
```

**Niveles disponibles**: 'Básico', 'Intermedio', 'Experto'

### 6. Información de Contacto
**Archivo**: `components/ContactSection.tsx`

Reemplaza la información personal (líneas 93-95):
```tsx
{ icon: Mail, label: 'Email', value: 'carlos@ejemplo.com', href: 'mailto:carlos@ejemplo.com' },
{ icon: Phone, label: 'Teléfono', value: '+52 (555) 123-4567', href: 'tel:+525551234567' },
{ icon: MapPin, label: 'Ubicación', value: 'Ciudad de México, México', href: null }
```

#### Redes Sociales (líneas 167-168):
```tsx
{ icon: Github, href: 'https://github.com/tu-usuario-real', label: 'GitHub' },
{ icon: Linkedin, href: 'https://linkedin.com/in/tu-perfil-real', label: 'LinkedIn' }
```

## 🎨 Personalización de Colores

### Variables CSS
**Archivo**: `app/globals.css`

Personaliza los colores principales:
```css
:root {
  --link-color: #1d6ff2; /* Color de enlaces y acentos */
  --text-primary: #1d1d1f; /* Texto principal */
  --text-secondary: #6e6e73; /* Texto secundario */
}
```

### Gradientes personalizados
Para los proyectos y tecnologías, puedes usar generadores como:
- [CSS Gradient](https://cssgradient.io/)
- [UI Gradients](https://uigradients.com/)

## 📷 Recursos de Imágenes

### Para proyectos:
- **Tus capturas de pantalla**: Lo más recomendado
- [Unsplash](https://unsplash.com/): Imágenes gratuitas de alta calidad
- Dimensiones recomendadas: 400x300px

### Para tecnologías:
- [Devicons](https://devicons.github.io/devicon/): Iconos oficiales de tecnologías
- Formato: SVG para mejor calidad

## ✅ Lista de verificación

- [ ] Cambiar nombre y descripción en Hero
- [ ] Actualizar array de tecnologías en MacDock
- [ ] Añadir proyectos reales con capturas de pantalla
- [ ] Personalizar servicios que ofreces
- [ ] Configurar habilidades y niveles reales
- [ ] Actualizar información de contacto
- [ ] Cambiar enlaces de redes sociales
- [ ] Personalizar colores (opcional)
- [ ] Probar que todos los enlaces funcionen

## 🚀 Después de personalizar

1. **Probar localmente**:
   ```bash
   npm run dev
   ```

2. **Verificar**:
   - Todos los enlaces funcionan
   - Las imágenes cargan correctamente
   - La información es correcta
   - No hay errores en consola

3. **Desplegar**:
   - Hacer commit de los cambios
   - Desplegar en Vercel, Netlify, etc.

## 💡 Tips adicionales

- **Mantén consistencia**: Usa el mismo estilo en descripciones
- **Optimiza imágenes**: Comprime las imágenes antes de subirlas
- **SEO**: Considera añadir meta tags personalizados
- **Analytics**: Integra Google Analytics si lo deseas

## 🔗 Integración con Backend

Si quieres conectar con el backend Django:

1. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env.local
   ```

2. **Usar el cliente API**:
   ```tsx
   import apiClient from '@/lib/api';
   
   // Cargar proyectos desde el backend
   const projects = await apiClient.getFeaturedProjects();
   ```

3. **Ver ejemplo completo**: `components/ApiExample.tsx`

¡Tu portfolio está listo para ser personalizado! 🎉
