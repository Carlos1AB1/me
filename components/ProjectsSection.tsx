'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TiltCard from './TiltCard'

const ProjectsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const projects = [
    {
      tag: 'OFFER ELIGIBLE',
      title: 'E-commerce',
      subtitle: 'React Intelligence',
      price: 'From $2499 or $208.25/mo. for 12 mo.*',
      priceSubtext: 'with development services',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      deviceType: 'laptop'
    },
    {
      tag: 'OFFER ELIGIBLE', 
      title: 'SaaS Dashboard',
      subtitle: 'Next.js Intelligence',
      price: 'From $1899 or $158.25/mo. for 12 mo.*',
      priceSubtext: 'with development services',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      deviceType: 'laptop'
    },
    {
      tag: 'OFFER ELIGIBLE',
      title: 'Mobile App',
      subtitle: 'React Native Intelligence', 
      price: 'From $3499 or $291.58/mo. for 12 mo.*',
      priceSubtext: 'with development services',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      deviceType: 'phone'
    },
    {
      tag: 'OFFER ELIGIBLE',
      title: 'Web Application',
      subtitle: 'Vue.js Intelligence',
      price: 'From $2199 or $183.25/mo. for 12 mo.*',
      priceSubtext: 'with development services', 
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      deviceType: 'laptop'
    },
    {
      tag: 'OFFER ELIGIBLE',
      title: 'Desktop Software',
      subtitle: 'Electron Intelligence',
      price: 'From $2799 or $233.25/mo. for 12 mo.*',
      priceSubtext: 'with development services',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      deviceType: 'desktop'
    },
    {
      tag: 'OFFER ELIGIBLE',
      title: 'API Development',
      subtitle: 'Node.js Intelligence',
      price: 'From $1699 or $141.58/mo. for 12 mo.*',
      priceSubtext: 'with development services',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&crop=center',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      deviceType: 'laptop'
    }
  ]

  useEffect(() => {
    // Inicializar el estado de los botones al cargar
    checkScrollButtons()
    
    // Escuchar cambios en el tamaño de la ventana
    const handleResize = () => {
      checkScrollButtons()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320 // Ancho de una tarjeta + gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
      
      // Actualizar estado de botones después del scroll
      setTimeout(() => {
        checkScrollButtons()
      }, 300)
    }
  }

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 5) // Pequeño margen para mejor UX
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // Margen más amplio
    }
  }

  const renderDevice = (project: any) => {
    if (project.deviceType === 'phone') {
      return (
        <div style={{
          position: 'relative',
          width: '100px',
          height: '180px',
          margin: '0 auto'
        }}>
          {/* Phone Frame */}
          <div style={{
            width: '100px',
            height: '180px',
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '10px 6px',
            border: '2px solid #333',
            position: 'relative'
          }}>
            {/* Screen */}
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '14px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '14px'
                }}
              />
              {/* Screen reflection */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                borderRadius: '14px'
              }} />
            </div>
            {/* Home indicator */}
            <div style={{
              position: 'absolute',
              bottom: '3px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '35px',
              height: '2px',
              background: '#666',
              borderRadius: '1px'
            }} />
          </div>
        </div>
      )
    }

    // Laptop/Desktop
    return (
      <div style={{
        position: 'relative',
        width: '180px',
        height: '130px',
        margin: '0 auto'
      }}>
        {/* Screen */}
        <div style={{
          width: '180px',
          height: '110px',
          background: '#1a1a1a',
          borderRadius: '6px 6px 0 0',
          border: '2px solid #333',
          borderBottom: 'none',
          padding: '6px',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '3px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img 
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '3px'
              }}
            />
            {/* Screen reflection */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              borderRadius: '3px'
            }} />
          </div>
        </div>
        
        {/* Base */}
        <div style={{
          width: '180px',
          height: '10px',
          background: 'linear-gradient(to bottom, #e8e8e8, #d0d0d0)',
          borderRadius: '0 0 6px 6px',
          position: 'relative'
        }}>
          {/* Notch */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '35px',
            height: '6px',
            background: 'linear-gradient(to bottom, #d0d0d0, #c0c0c0)',
            borderRadius: '0 0 3px 3px'
          }} />
        </div>
      </div>
    )
  }

  return (
    <section 
      className="projects-section"
      style={{
        width: '100%',
        margin: '0',
        padding: '0 80px', // Espacio para las flechas
        marginBottom: '40px'
      }}>
      {/* Section Title */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '20px',
        marginTop: '88px'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '600',
          marginBottom: '8px'
        }}>
          Experiencia académica.
        </h2>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '600',
          color: 'var(--text-secondary)',
          marginBottom: '0'
        }}>
          Soluciones profesionales.
        </h2>
      </div>
      
      {/* Navigation Container */}
      <div style={{ 
        position: 'relative',
        marginBottom: '20px'
      }}>
        {/* Left Arrow - Lado izquierdo */}
        <button
          className="projects-nav-button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          style={{
            position: 'absolute',
            left: '-70px',
            top: '240px',
            zIndex: 10,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: canScrollLeft ? 'var(--card-bg)' : 'var(--border-color)',
            border: '1px solid var(--border-color)',
            cursor: canScrollLeft ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            opacity: canScrollLeft ? 1 : 0.5,
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 12px var(--shadow)'
          }}
        >
          <ChevronLeft size={22} color={canScrollLeft ? 'var(--text-primary)' : 'var(--text-tertiary)'} />
        </button>

        {/* Right Arrow - Lado derecho */}
        <button
          className="projects-nav-button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          style={{
            position: 'absolute',
            right: '-70px',
            top: '240px',
            zIndex: 10,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: canScrollRight ? 'var(--card-bg)' : 'var(--border-color)',
            border: '1px solid var(--border-color)',
            cursor: canScrollRight ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            opacity: canScrollRight ? 1 : 0.5,
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 12px var(--shadow)'
          }}
        >
          <ChevronRight size={22} color={canScrollRight ? 'var(--text-primary)' : 'var(--text-tertiary)'} />
        </button>

        {/* Projects Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScrollButtons}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '40px',
            paddingTop: '10px',
            marginBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '80px' // Más espacio al final para evitar corte
          }}
          className="projects-scroll"
        >
          {projects.map((project, index) => (
            <TiltCard
              key={index}
              style={{
                width: '300px',
                height: '480px',
                minWidth: '300px',
                maxWidth: '300px',
                animationDelay: `${index * 0.1}s`,
                flexShrink: 0
              }}
              onClick={() => console.log(`Clicked on ${project.title}`)}
            >
              <div style={{
                padding: '24px',
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Tag */}
                <div style={{
                  background: '#1d6ff2',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '600',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {project.tag}
                </div>

                {/* Graduation cap icon */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '20px',
                  color: 'var(--text-secondary)'
                }}>
                  🎓
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'var(--text-primary)',
                  lineHeight: '1.2'
                }}>
                  {project.title}
                </h3>

                {/* Subtitle */}
                <div style={{
                  color: '#af52de',
                  fontSize: '17px',
                  fontWeight: '400',
                  marginBottom: '16px'
                }}>
                  {project.subtitle}<sup>Δ</sup>
                </div>

                {/* Price */}
                <div style={{
                  fontSize: '17px',
                  color: 'var(--text-primary)',
                  marginBottom: '4px'
                }}>
                  {project.price}
                </div>
                
                <div style={{
                  fontSize: '17px',
                  color: 'var(--text-primary)',
                  marginBottom: '24px'
                }}>
                  {project.priceSubtext}
                </div>

                {/* Device Image */}
                <div style={{
                  height: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 'auto',
                  overflow: 'hidden'
                }}>
                  {renderDevice(project)}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
