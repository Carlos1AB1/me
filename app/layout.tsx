import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Developer Portfolio - Estilo Apple',
  description: 'Portafolio de desarrollador con el diseño elegante y profesional inspirado en Apple',
  keywords: 'developer, portfolio, programador, apple design, react, nextjs',
  authors: [{ name: 'Tu Nombre' }],
  openGraph: {
    title: 'Developer Portfolio - Estilo Apple',
    description: 'Portafolio de desarrollador con el diseño elegante y profesional inspirado en Apple',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Meta tags para optimización de fuentes */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Apple Font Loading Support y optimizaciones */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Soporte nativo para fuentes de Apple */
            @supports (font: -apple-system-body) {
              body { 
                font: -apple-system-body;
                font-synthesis: weight style;
              }
            }
            
            /* Preload crítico para evitar FOUT */
            @font-face {
              font-family: 'SF Pro Display';
              font-display: block;
              src: local('SF Pro Display'), local('-apple-system');
            }
            
            @font-face {
              font-family: 'SF Pro Text';
              font-display: block;
              src: local('SF Pro Text'), local('-apple-system');
            }
            
            /* Optimización de renderizado */
            html {
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
