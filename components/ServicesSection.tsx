'use client'

import { useState, useEffect } from 'react'
import TiltCard from './TiltCard'
import apiClient from '@/lib/api'

interface Service {
  id: number;
  title: string;
  slug: string;
  category: number;
  category_name: string;
  category_icon: string;
  short_description: string;
  icon: string;
  image: string | null;
  price_type: string;
  price_display: string;
  price_offer_display?: string | null;
  price_offer?: number | null;
  duration: string;
  duration_display: string;
  is_featured: boolean;
  order: number;
  // Para servicios detallados (si los necesitamos)
  description?: string;
  features?: string[];
}

const ServicesSection = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true)
        const servicesData = await apiClient.getFeaturedServices()
        setServices(servicesData)
      } catch (error) {
        console.error('Error loading services:', error)
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  return (
    <section 
      id="servicios"
      style={{
        width: '100%',
        padding: 'clamp(60px, 12vw, 120px) clamp(20px, 5vw, 40px)',
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(50px, 10vw, 80px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: '600',
            marginBottom: 'clamp(16px, 3vw, 24px)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.015em'
          }}>
            Servicios
          </h2>
          <p style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.4'
          }}>
            Soluciones tecnológicas completas para llevar tu negocio al siguiente nivel
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 20px',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                border: '3px solid #f3f3f3', 
                borderTop: '3px solid #1d6ff2',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 10px'
              }}></div>
              <p>Cargando servicios...</p>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'clamp(20px, 4vw, 30px)'
          }}>
            {services.map((service, index) => (
              <TiltCard
                key={service.id}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  height: 'clamp(450px, 50vh, 500px)',
                  minHeight: '450px'
                }}
              >
                <div style={{
                  padding: 'clamp(20px, 4vw, 30px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Service Icon */}
                  <div style={{
                    fontSize: 'clamp(40px, 8vw, 48px)',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    {service.icon}
                  </div>

                  {/* Service Title */}
                  <h3 style={{
                    fontSize: 'clamp(20px, 4vw, 24px)',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: 'var(--text-primary)',
                    textAlign: 'center'
                  }}>
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '20px'
                  }}>
                    <p style={{
                      fontSize: '15px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      textAlign: 'center',
                      margin: 0,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {service.short_description}
                    </p>
                  </div>

                  {/* Category Badge */}
                  <div style={{
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-secondary)',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)'
                    }}>
                      {service.category_icon} {service.category_name}
                    </span>
                  </div>

                  {/* Price and Duration */}
                  <div style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                          <div>
                            {service.price_offer_display ? (
                              <>
                                <div style={{
                                  fontSize: '14px',
                                  color: 'var(--text-secondary)',
                                  marginBottom: '6px',
                                  display: 'flex',
                                  alignItems: 'baseline',
                                  gap: '8px'
                                }}>
                                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Antes:</span>
                                  <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)' }}>{service.price_display}</span>
                                </div>
                                <div style={{
                                  fontSize: '18px',
                                  fontWeight: 700,
                                  color: '#1d6ff2',
                                  display: 'flex',
                                  alignItems: 'baseline',
                                  gap: '8px'
                                }}>
                                  <span style={{ fontSize: '12px', color: '#1d6ff2', fontWeight: 700 }}>Ahora:</span>
                                  <span style={{ fontWeight: 700 }}>{service.price_offer_display}</span>
                                </div>
                              </>
                            ) : (
                              <div style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#1d6ff2',
                                marginBottom: '2px'
                              }}>
                                {service.price_display}
                              </div>
                            )}

                            <div style={{
                              fontSize: '12px',
                              color: 'var(--text-secondary)'
                            }}>
                              {service.duration_display}
                            </div>
                          </div>
                    </div>
                    <button style={{
                      background: '#1d6ff2',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#1557c7'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#1d6ff2'
                    }}
                    onClick={() => {
                      // Scroll to contact section
                      const contactElement = document.getElementById('contacto')
                      if (contactElement) {
                        contactElement.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        })
                      }
                    }}>
                      Contratar
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          marginTop: 'clamp(60px, 12vw, 100px)',
          padding: 'clamp(40px, 8vw, 60px)',
          background: 'var(--card-bg)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: '600',
            marginBottom: '16px',
            color: 'var(--text-primary)'
          }}>
            ¿Tienes un proyecto en mente?
          </h3>
          <p style={{
            fontSize: 'clamp(16px, 3vw, 18px)',
            color: 'var(--text-secondary)',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Cuéntame sobre tu idea y trabajemos juntos para hacerla realidad
          </p>
          <button style={{
            background: '#1d6ff2',
            color: 'white',
            border: 'none',
            padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
            borderRadius: 'clamp(20px, 4vw, 24px)',
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#1557c7'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#1d6ff2'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          onClick={() => {
            const contactElement = document.getElementById('contacto')
            if (contactElement) {
              contactElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              })
            }
          }}>
            Hablemos de tu proyecto
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
