'use client'

const HelpWidget = () => {
  return (
    <div 
      className="help-widget"
      style={{
        position: 'fixed',
        top: '120px',
        right: '20px',
        background: 'var(--card-bg)',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 4px 20px var(--shadow)',
        width: '280px',
        zIndex: 1000,
        border: '1px solid var(--border-color)',
        transition: 'all 0.3s ease'
      }}>
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
  )
}

export default HelpWidget
