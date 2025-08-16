'use client'

import TiltCard from './TiltCard'

const ServicesSection = () => {
  const services = [
    {
      icon: '🌐',
      title: 'Desarrollo Web',
      description: 'Aplicaciones web modernas y responsivas con React, Next.js y Vue.js',
      features: ['Frontend Responsivo', 'Backend APIs', 'Bases de Datos', 'Optimización SEO'],
      price: 'Desde $2,500',
      duration: '4-8 semanas'
    },
    {
      icon: '📱',
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas y multiplataforma con React Native y Flutter',
      features: ['iOS & Android', 'Push Notifications', 'Offline Support', 'App Store Deploy'],
      price: 'Desde $3,500',
      duration: '6-12 semanas'
    },
    {
      icon: '🛠️',
      title: 'SaaS Solutions',
      description: 'Plataformas SaaS completas con dashboard administrativo y panel de usuario',
      features: ['Multi-tenant', 'Subscripciones', 'Analytics', 'API Integration'],
      price: 'Desde $5,000',
      duration: '8-16 semanas'
    },
    {
      icon: '⚡',
      title: 'API Development',
      description: 'APIs REST y GraphQL escalables con Node.js, Python o PHP',
      features: ['REST & GraphQL', 'Documentación', 'Testing', 'Cloud Deploy'],
      price: 'Desde $1,800',
      duration: '3-6 semanas'
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      description: 'Infraestructura en la nube y automatización de deployments',
      features: ['AWS/GCP/Azure', 'Docker & K8s', 'CI/CD Pipelines', 'Monitoring'],
      price: 'Desde $2,200',
      duration: '2-4 semanas'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Diseño de interfaces modernas y experiencias de usuario excepcionales',
      features: ['Wireframes', 'Prototipos', 'Design System', 'User Testing'],
      price: 'Desde $1,500',
      duration: '2-6 semanas'
    }
  ]

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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'clamp(20px, 4vw, 30px)'
        }}>
          {services.map((service, index) => (
            <TiltCard
              key={index}
              style={{
                animationDelay: `${index * 0.1}s`,
                height: '100%'
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
                <p style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  textAlign: 'center',
                  flex: 1
                }}>
                  {service.description}
                </p>

                {/* Features List */}
                <div style={{
                  marginBottom: '24px'
                }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Incluye:
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: '0',
                    margin: '0'
                  }}>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        marginBottom: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: '#1d6ff2',
                          flexShrink: 0
                        }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
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
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1d6ff2',
                      marginBottom: '2px'
                    }}>
                      {service.price}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)'
                    }}>
                      {service.duration}
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
