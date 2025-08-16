'use client'



const Header = () => {
  const navItems = [
    { name: 'Inicio', href: '/', type: 'link' },
    { name: 'Github', href: 'https://github.com/tu-usuario', type: 'external' },
    { name: 'Linkedin', href: 'https://linkedin.com/in/tu-perfil', type: 'external' },
    { name: 'Habilidades', href: '/habilidades', type: 'link' },
    { name: 'Servicios', href: '/#servicios', type: 'scroll' },
    { name: 'Blog', href: '/blog', type: 'link' },
    { name: 'Contacto', href: '/#contacto', type: 'scroll' }
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
