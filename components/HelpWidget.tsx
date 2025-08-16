'use client'

import { useState } from 'react'
import { X, MessageCircle } from 'lucide-react'

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
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
          width: '44px',
          height: '44px',
          zIndex: 1001,
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
        <MessageCircle size={20} color="var(--text-primary)" />
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
        padding: '16px',
        boxShadow: '0 4px 20px var(--shadow)',
        width: '280px',
        zIndex: 1001,
        border: '1px solid var(--border-color)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          top: '108px',
          right: '28px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease',
          width: '24px',
          height: '24px',
          zIndex: 1002
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'var(--border-color)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent'
        }}
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