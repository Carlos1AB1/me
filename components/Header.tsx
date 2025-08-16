'use client'



const Header = () => {
  const navItems = [
    'Inicio',
    'Sobre mí',
    'Github',
    'Linkedin',
    'Habilidades',
    'Servicios',
    'Blog',
    'Contacto'
  ];
  

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
        Building the future, one line at a time.
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
                key={item}
                href={`#${item.toLowerCase()}`}
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
              >
                {item}
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
        <a href="#" style={{ 
          color: 'var(--link-color)', 
          textDecoration: 'none',
          transition: 'color 0.3s ease'
        }}>
          Saber más ⊕
        </a>
      </div>
    </header>
  )
}

export default Header
