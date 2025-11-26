/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'github.com',
      'cabaron23.pythonanywhere.com', // Backend API
      'cdn.jsdelivr.net', // CDN para iconos
      'res.cloudinary.com', // Cloudinary (si se usa en el futuro)
    ],
  },
}

module.exports = nextConfig
