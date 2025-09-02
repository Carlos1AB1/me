'use client'

import { useState, useEffect } from 'react'
import { X, MessageCircle } from 'lucide-react'

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 480)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  if (!isOpen) {
    const buttonSize = isMobile ? '40px' : '44px'
    
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="help-widget"
        style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          background: 'var(--card-bg)',
          borderRadius: '50%',
          padding: '0',
          boxShadow: '0 4px 20px var(--shadow)',
          width: buttonSize,
          height: buttonSize,
          minWidth: buttonSize,
          minHeight: buttonSize,
          maxWidth: buttonSize,
          maxHeight: buttonSize,
          zIndex: 900,
          border: '1px solid var(--border-color)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <MessageCircle size={isMobile ? 16 : 20} color="var(--text-primary)" />
      </button>
    )
  }

    return (
    <div 
      className="help-widget"
      style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'var(--card-bg)',
        borderRadius: '12px',
        padding: 'clamp(12px, 3vw, 16px)',
        boxShadow: '0 4px 20px var(--shadow)',
        width: 'clamp(240px, 50vw, 280px)',
        maxWidth: '90vw',
        zIndex: 900,
        border: '1px solid var(--border-color)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease',
          width: '28px',
          height: '28px',
          zIndex: 901
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'var(--border-color)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent'
        }}
        aria-label="Cerrar ayuda"
      >
        <X size={14} color="var(--text-secondary)" />
      </button>

      {/* Content */}
      <div style={{ paddingTop: '16px' }}>
        <a 
          href="#" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
            e.currentTarget.style.borderRadius = '8px'
            e.currentTarget.style.padding = '8px'
            e.currentTarget.style.margin = '-8px -8px 4px -8px'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.padding = '0'
            e.currentTarget.style.margin = '0 0 12px 0'
          }}
          onClick={(e) => {
            e.preventDefault()
            const contactElement = document.getElementById('contacto')
            if (contactElement) {
              contactElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              })
            }
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#0066cc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            flexShrink: 0
          }}>
            💬
          </div>
          <div>
            <div style={{ fontWeight: '500' }}>¿Necesitas ayuda con proyectos?</div>
            <div style={{ color: 'var(--link-color)', fontSize: '12px' }}>Contáctame →</div>
          </div>
        </a>

        <a 
          href="#" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
            e.currentTarget.style.borderRadius = '8px'
            e.currentTarget.style.padding = '8px'
            e.currentTarget.style.margin = '-8px'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.padding = '0'
            e.currentTarget.style.margin = '0'
          }}
          onClick={(e) => {
            e.preventDefault()
            window.open('https://github.com/tu-usuario', '_blank')
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#0066cc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            flexShrink: 0
          }}>
            ⭐
          </div>
          <div>
            <div style={{ fontWeight: '500' }}>Califica mi página</div>
            <div style={{ color: 'var(--link-color)', fontSize: '12px' }}>Hazmelo saber →</div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default HelpWidget