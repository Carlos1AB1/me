'use client'

import { useState } from 'react'
import { MessageCircle, FileText } from 'lucide-react'

const Header = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const navItems = [
    { name: 'Inicio', href: '/', type: 'link' },
    { name: 'Github', href: 'https://githu              Ir al Formulario.com/Carlos1AB1', type: 'external' },
    { name: 'Linkedin', href: 'https://www.linkedin.com/in/carlos-arturo-baron-estrada-58b90a359/', type: 'external' },
    { name: 'Servicios', href: '/#servicios', type: 'scroll' },
    { name: 'Blog', href: '/blog', type: 'link' },
    { name: 'Contacto', href: '/#contacto', type: 'scroll' }
  ]
  

  return (
    <header>
      {/* Header Top */}
      <div 
        className="header-top"
        style={{
          background: 'var(--nav-bg)',
          padding: '8px 0',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          transition: 'all 0.3s ease'
        }}>
        Desarrollando el futuro, línea por línea.
      </div>

      {/* Main Header */}
      <div 
        className="header-main"
        style={{
          background: 'var(--header-bg)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 clamp(6px, 4vw, 22px)',
          transition: 'all 0.3s ease'
        }}>
        <nav 
          className="header-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '44px',
            position: 'relative'
          }}>
          {/* Logo - posición absoluta a la izquierda */}
          <div 
            className="header-logo"
            style={{
              position: 'absolute',
              left: '0',
              display: 'flex',
              alignItems: 'center'
            }}>
            <a href="#" style={{
              fontSize: '18px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'color 0.3s ease'
            }}
            aria-label="Ir al inicio del portfolio">
              👨‍💻
            </a>
          </div>

                         {/* Navegación centrada */}
               <div 
                 className="nav-items"
                 style={{
                   display: 'flex',
                   gap: '30px',
                   alignItems: 'center'
                 }}>
                 {navItems.map((item) => (
                   <a
                     key={item.name}
                     href={item.href}
                     target={item.type === 'external' ? '_blank' : undefined}
                     rel={item.type === 'external' ? 'noopener noreferrer' : undefined}
                     style={{
                       color: 'var(--text-primary)',
                       textDecoration: 'none',
                       fontSize: '12px',
                       fontWeight: '400',
                       transition: 'color 0.3s ease'
                     }}
                     onMouseOver={(e) => {
                       const target = e.target as HTMLElement
                       target.style.color = 'var(--link-hover)'
                     }}
                     onMouseOut={(e) => {
                       const target = e.target as HTMLElement
                       target.style.color = 'var(--text-primary)'
                     }}
                     onClick={(e) => {
                       if (item.type === 'scroll') {
                         e.preventDefault()
                         const targetId = item.href.split('#')[1]
                         const targetElement = document.getElementById(targetId)
                         if (targetElement) {
                           targetElement.scrollIntoView({ 
                             behavior: 'smooth',
                             block: 'start'
                           })
                         }
                       }
                     }}
                   >
                     {item.name}
                   </a>
                 ))}
               </div>


        </nav>
      </div>

      {/* Promo Banner */}
      <div 
        className="header-promo"
        style={{
          background: 'var(--nav-bg)',
          padding: 'clamp(6px, 2vw, 12px) clamp(6px, 4vw, 22px)',
          textAlign: 'center',
          fontSize: 'clamp(10px, 2.5vw, 14px)',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease',
          lineHeight: 'clamp(1.1, 1.5, 1.4)'
        }}>
        Contrata servicios de desarrollo web profesional y obtén consultoría gratuita.{' '}
        <button 
          onClick={() => setShowMoreInfo(!showMoreInfo)}
          style={{ 
            color: 'var(--link-color)', 
            textDecoration: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
            fontSize: 'inherit',
            fontFamily: 'inherit',
            padding: 0
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
        >
          Saber más {showMoreInfo ? '⊖' : '⊕'}
        </button>
      </div>

      {/* Información adicional desplegable */}
      {showMoreInfo && (
        <div 
          className="more-info-panel"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '16px',
            margin: '8px clamp(6px, 4vw, 22px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            animation: 'slideDown 0.3s ease-out',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-6px',
            left: '50%',
            width: '12px',
            height: '12px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderBottom: 'none',
            borderRight: 'none',
            transform: 'translateX(-50%) rotate(45deg)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}></div>

          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            💬 ¡Hablemos de lo que necesitas!
          </h4>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}>
            <div style={{ textAlign: 'center', maxWidth: '300px' }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '8px',
                color: '#25D366'
              }}>
                {/* Imagen en /public/icon/logoWA.png — se sirve desde /icon/logoWA.png */}
                <img src="/icon/logoWA.png" alt="WhatsApp" style={{ width: 100, height: 100, borderRadius: 6, objectFit: 'cover' }} />
              </div>
              <h5 style={{ 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '8px',
                fontSize: '15px'
              }}>
                WhatsApp
              </h5>
              <p style={{ margin: '0 0 8px 0' }}>
                Respuesta inmediata
              </p>
              <a 
                href="https://wa.me/573183487086?text=Hola,%20me%20gustaría%20hablar%20sobre%20un%20proyecto%20de%20desarrollo%20web"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '600',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#128C7E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#25D366'}
              >
                💬 Escribir
              </a>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)'
          }}>
            <p style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginBottom: '8px',
              textAlign: 'center'
            }}>
              💡 También puedes contactarme desde la{' '}
              <a 
                href="/#contacto"
                style={{
                  color: '#1557c7',
                  textDecoration: 'underline',
                  fontWeight: '500',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0f4fb3'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#1557c7'}
              >
                sección de contacto
              </a>
            </p>
          
          </div>
        </div>
      )}

      {/* CSS para animación */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .more-info-panel {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  )
}

export default Header
