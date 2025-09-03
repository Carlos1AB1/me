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
      <style>{`
        .project-card .project-image-container { position: relative; }
        .project-card .image-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 15px;
          background: rgba(0,0,0,0.45);
          opacity: 0;
          transition: opacity 160ms ease-in-out, transform 160ms ease-in-out;
          border-radius: 12px;
          pointer-events: none;
        }
        .project-card:hover .image-overlay { opacity: 1; }
        
        @media (max-width: 768px) {
          .projects-nav-button {
            display: none !important;
          }
          
          .projects-section {
            padding: 0 20px !important;
          }
        }
      `}</style>
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
            alignItems: 'flex-end',
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
                width: '380px',
                height: '480px',
                minWidth: '380px',
                maxWidth: '380px',
                animationDelay: `${index * 0.1}s`,
                flexShrink: 0
              }}
              onClick={() => openModal(project)}
            >
              <div style={{
                padding: '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}>
                {/* Contenedor de contenido superior */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                    {project.featured ? 'PROYECTO DESTACADO' : 'PROYECTO'}
                  </div>

                  {/* Graduation cap icon */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '20px',
                    color: 'var(--text-secondary)'
                  }}>
                    👨🏻‍💻
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                    lineHeight: '1.3',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <div style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    marginBottom: '20px'
                  }}>
                    {project.short_description && project.short_description.trim() !== ''
                      ? (project.short_description.length > 120 
                          ? project.short_description.substring(0, 120) + '...'
                          : project.short_description)
                      : `Proyecto desarrollado${project.technologies_list && project.technologies_list.length > 0 
                          ? ` con ${project.technologies_list.slice(0, 2).join(', ')}${project.technologies_list.length > 2 ? ' y más' : ''}` 
                          : ' con tecnologías modernas'}.`}
                  </div>
                </div>

                {/* Imagen principal (alineada al fondo de la card) */}
                <div className="project-card" style={{
                  height: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  marginTop: 'auto'
                }}>
                  {project.images && project.images.length > 0 ? (
                    <div className="project-image-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
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
                      <div className="image-overlay">Clic para ver</div>
                    </div>
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
        background: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '20px'
      }}
        onClick={closeModal}
      >
        <div
          className="modal-main-container"
          style={{
            background: 'var(--card-bg)',
            color: 'var(--text-primary)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            width: '95vw',
            height: '90vh',
            maxWidth: '1400px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header del Modal */}
          <div className="modal-header" style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-color)',
            position: 'relative',
            flexShrink: 0
          }}>
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                padding: '8px',
                color: 'var(--text-primary)',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              aria-label="Cerrar proyecto"
            >
              <X size={20} />
            </button>

            <div style={{
              background: '#1d6ff2',
              color: 'white',
              fontSize: '11px',
              fontWeight: '600',
              padding: '4px 10px',
              borderRadius: '6px',
              display: 'inline-block',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {modalProject.featured ? 'PROYECTO DESTACADO' : 'PROYECTO'}
            </div>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 8px 0',
              color: 'var(--text-primary)',
              lineHeight: '1.2'
            }}>
              {modalProject.title}
            </h2>

            <div style={{
              color: '#af52de',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '12px'
            }}>
              {(modalProject.technologies_list || modalProject.technologies || []).join(', ')}
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {modalProject.github_url && (
                <a
                  href={modalProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--text-primary)',
                    fontWeight: '500',
                    fontSize: '12px',
                    textDecoration: 'none',
                    background: 'var(--bg-secondary)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Github size={14} /> Código
                </a>
              )}
              {modalProject.live_url && (
                <a
                  href={modalProject.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '12px',
                    textDecoration: 'none',
                    background: '#1d6ff2',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🚀 Demo
                </a>
              )}
            </div>
          </div>

          {/* Contenido Principal: Imagen Grande */}
          <div className="modal-content-wrapper" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden'
          }}>
            {/* Sección de Imagen - Ahora más grande */}
            <div className="modal-image-section" style={{
              flex: '1 1 70%',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'var(--bg-secondary)',
              position: 'relative'
            }}>
              {/* Contenedor de imagen principal - MUY GRANDE */}
              <div className="modal-image-container" style={{
                width: '100%',
                height: '100%',
                maxHeight: '700px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: 'transparent',
                borderRadius: '12px',
                overflow: 'visible',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                {/* Navegación de imágenes */}
                {modalImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="modal-nav-button"
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.7)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 3,
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      aria-label="Imagen anterior"
                    >
                      <ArrowLeft size={24} />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="modal-nav-button"
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(0,0,0,0.7)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 3,
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      aria-label="Imagen siguiente"
                    >
                      <ArrowRight size={24} />
                    </button>
                  </>
                )}

                {/* Imagen GRANDE */}
                <img
                  src={modalImages[modalIndex]}
                  alt={modalProject.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                />

                {/* Indicador de posición */}
                {modalImages.length > 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {modalIndex + 1} / {modalImages.length}
                  </div>
                )}
              </div>
            </div>

            {/* Panel de información - Más compacto */}
            <div className="modal-info-section" style={{
              flex: '1 1 30%',
              padding: '20px',
              borderLeft: '1px solid var(--border-color)',
              overflow: 'auto',
              background: 'var(--card-bg)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: 'var(--text-primary)'
              }}>
                Descripción
              </h3>

              <div style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                marginBottom: '20px'
              }}>
                {modalProject.short_description && modalProject.short_description.trim() !== '' 
                  ? modalProject.short_description 
                  : 'No hay descripción disponible para este proyecto.'}
              </div>

              {/* Tecnologías */}
              {modalProject.technologies_list && modalProject.technologies_list.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: 'var(--text-primary)'
                  }}>
                    Tecnologías
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}>
                    {modalProject.technologies_list.map((tech: string, index: number) => (
                      <span key={index} style={{
                        fontSize: '11px',
                        color: 'var(--text-primary)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Info adicional */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '12px'
              }}>
                <h4 style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Info del proyecto
                </h4>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  marginBottom: '4px'
                }}>
                  <strong>ID:</strong> {modalProject.id}
                </div>
                {modalProject.priority && (
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-secondary)'
                  }}>
                    <strong>Prioridad:</strong> {modalProject.priority}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Versión móvil */}
          <style jsx>{`
            @media (max-width: 768px) {
              .modal-main-container {
                flex-direction: column !important;
                height: 95vh !important;
                width: 98vw !important;
              }
              
              .modal-content-wrapper {
                flex-direction: column !important;
              }
              
              .modal-image-section {
                flex: 1 1 50% !important;
                padding: 12px !important;
                min-height: 250px !important;
              }
              
              .modal-info-section {
                flex: 1 1 50% !important;
                padding: 12px !important;
                border-left: none !important;
                border-top: 1px solid var(--border-color) !important;
                max-height: 50% !important;
                overflow-y: auto !important;
              }
              
              .modal-image-container {
                max-height: 220px !important;
                height: 220px !important;
              }

              .modal-nav-button {
                width: 40px !important;
                height: 40px !important;
              }
            }
            
            @media (max-width: 480px) {
              .modal-main-container {
                height: 98vh !important;
                width: 100vw !important;
                border-radius: 8px !important;
                margin: 0 !important;
              }
              
              .modal-image-container {
                max-height: 180px !important;
                height: 180px !important;
              }
              
              .modal-header {
                padding: 12px 16px !important;
              }

              .modal-image-section {
                padding: 8px !important;
              }

              .modal-info-section {
                padding: 8px !important;
              }
            }
          `}</style>
        </div>
      </div>
    )}
  </section>
  )
}

export default ProjectsSection