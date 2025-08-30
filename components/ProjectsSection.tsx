'use client'


import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, ArrowLeft, ArrowRight, Github } from 'lucide-react'
import TiltCard from './TiltCard'
import apiClient from '@/lib/api'

const ProjectsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [projects, setProjects] = useState<any[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImages, setModalImages] = useState<string[]>([])
  const [modalProject, setModalProject] = useState<any>(null)
  const [modalIndex, setModalIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const projectsData = await apiClient.getFeaturedProjects()
        
        // Convertir datos del backend al formato esperado
  // El backend ya devuelve project.images (array de objetos con image y order)
  setProjects(projectsData)
      } catch (error) {
        console.error('Error loading projects:', error)
        // Si hay error, mantener array vacío
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const projects_fallback: Array<{
    tag: string;
    title: string;
    subtitle: string;
    price: string;
    priceSubtext: string;
    image: string;
    gradient: string;
    deviceType: string;
  }> = [
    // TODO: Agregar tus proyectos reales aquí
    // Ejemplo de estructura:
    // {
    //   tag: 'PROYECTO DESTACADO',
    //   title: 'Nombre del Proyecto',
    //   subtitle: 'Tecnología Principal',
    //   price: 'Información adicional',
    //   priceSubtext: 'Descripción breve',
    //   image: 'URL_de_imagen',
    //   gradient: 'linear-gradient(135deg, #color1 0%, #color2 100%)',
    //   deviceType: 'laptop' // o 'phone', 'desktop'
    // }
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


  // Modal handlers
  const openModal = (project: any) => {
    setModalProject(project)
    setModalImages((project.images || []).map((img: any) => img.image))
    setModalIndex(0)
    setModalOpen(true)
  }
  const closeModal = () => setModalOpen(false)
  const prevImage = () => setModalIndex(i => (i > 0 ? i - 1 : modalImages.length - 1))
  const nextImage = () => setModalIndex(i => (i < modalImages.length - 1 ? i + 1 : 0))

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
          {loading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%', 
              height: '300px',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '3px solid #f3f3f3', 
                borderTop: '3px solid #1d6ff2',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Cargando proyectos...</p>
            </div>
          ) : projects.length === 0 ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%', 
              height: '300px',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>No hay proyectos disponibles</p>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>Agrega proyectos en el backend Django</p>
            </div>
          ) : (
            projects.map((project, index) => (
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
              onClick={() => openModal(project)}
            >
              <div style={{
                padding: '24px',
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
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
                  {project.is_featured ? 'PROYECTO DESTACADO' : 'PROYECTO'}
                </div>

                {/* Graduation cap icon */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '20px',
                  color: 'var(--text-secondary)'
                }}>
                  👨‍💻
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
                  {(project.technologies_list || project.technologies || []).join(', ')}<sup>Δ</sup>
                </div>

                {/* GitHub link */}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--text-primary, #fff)',
                      fontWeight: 500,
                      fontSize: '15px',
                      marginBottom: '8px',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    <Github size={18} /> Código fuente
                  </a>
                )}

                {/* Description */}
                <div style={{
                  fontSize: '17px',
                  color: 'var(--text-primary)',
                  marginBottom: '24px'
                }}>
                  {project.description}
                </div>

                {/* Imagen principal */}
                <div style={{
                  height: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 'auto',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                }}>
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0].image}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        transition: 'transform 0.2s',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#eaeaea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#aaa',
                      fontSize: '16px',
                    }}>
                      Sin imagen
                    </div>
                  )}
                </div>
              </div>
            </TiltCard>
            ))
          )}
        </div>
      </div>
    {/* Modal popup galería */}
    {modalOpen && modalProject && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(20,20,30,0.35)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'background 0.2s',
      }}
        onClick={closeModal}
      >
        <div
          style={{
            background: 'var(--card-bg, #181824)',
            color: 'var(--text-primary, #fff)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            padding: '32px 24px',
            minWidth: '340px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            transition: 'background 0.2s, color 0.2s',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Cerrar */}
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              zIndex: 2,
              color: 'var(--text-primary, #fff)'
            }}
            aria-label="Cerrar galería"
          >
            <X size={28} />
          </button>
          {/* Imagen principal */}
          <div style={{
            width: 'min(70vw, 600px)',
            height: 'min(60vh, 400px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: '18px',
            background: 'var(--modal-image-bg, #232336)',
            borderRadius: '12px',
          }}>
            {/* Flecha izquierda */}
            {modalImages.length > 1 && (
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.7)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
                aria-label="Anterior"
              >
                <ArrowLeft size={22} />
              </button>
            )}
            {/* Imagen */}
            <img
              src={modalImages[modalIndex]}
              alt={modalProject.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                background: 'var(--modal-image-bg, #232336)'
              }}
            />
            {/* Flecha derecha */}
            {modalImages.length > 1 && (
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.7)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
                aria-label="Siguiente"
              >
                <ArrowRight size={22} />
              </button>
            )}
          </div>
          {/* Título y descripción */}
          <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary, #fff)' }}>{modalProject.title}</h3>
          <div style={{ color: 'var(--accent, #af52de)', fontSize: 15, marginBottom: 12 }}>{(modalProject.technologies_list || modalProject.technologies || []).join(', ')}</div>
          <div style={{ color: 'var(--text-secondary, #ccc)', fontSize: 16, marginBottom: 12 }}>{modalProject.description}</div>
          {/* GitHub link */}
          {modalProject.github_url && (
            <a
              href={modalProject.github_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-primary, #fff)',
                fontWeight: 500,
                fontSize: '15px',
                marginBottom: '8px',
                textDecoration: 'none'
              }}
            >
              <Github size={18} /> Código fuente
            </a>
          )}
          {/* Paginación */}
          {modalImages.length > 1 && (
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {modalImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: i === modalIndex ? '#1d6ff2' : '#e0e0e0',
                    border: '1px solid #bdbdbd',
                    cursor: 'pointer',
                  }}
                  onClick={() => setModalIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )}
  </section>
  )
}

export default ProjectsSection
