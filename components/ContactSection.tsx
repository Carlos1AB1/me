'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react'
import apiClient from '@/lib/api'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await apiClient.sendContactMessage(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section 
      id="contacto"
      style={{
        width: '100%',
        padding: 'clamp(60px, 12vw, 120px) clamp(20px, 5vw, 40px)',
        background: 'var(--nav-bg)',
        borderTop: '1px solid var(--border-color)'
      }}
    >
      <div style={{
        maxWidth: '1200px',
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
            Contacto
          </h2>
          <p style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.4'
          }}>
            ¿Listo para comenzar tu proyecto? Hablemos y hagamos algo increíble juntos
          </p>
        </div>

        {/* Contact Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 8vw, 60px)',
          alignItems: 'start'
        }}>
          {/* Contact Info */}
          <div>
            <h3 style={{
              fontSize: 'clamp(24px, 4vw, 28px)',
              fontWeight: '600',
              marginBottom: '30px',
              color: 'var(--text-primary)'
            }}>
              Información de Contacto
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {[
                { icon: Mail, label: 'Email', value: 'cabaron_23@cue.edu.co', href: 'mailto:cabaron_23@cue.edu.co' },
                { icon: Phone, label: 'Teléfono', value: '+57 (318) 348-7086', href: 'tel:+573183487086' },
                { icon: MapPin, label: 'Ubicación', value: 'Armenia, Quindío', href: null }
              ].map((contact, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <contact.icon size={20} color="var(--text-primary)" />
                  </div>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: '2px'
                    }}>
                      {contact.label}
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        style={{
                          fontSize: '16px',
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#1d6ff2'
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = 'var(--text-primary)'
                        }}
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span style={{
                        fontSize: '16px',
                        color: 'var(--text-primary)',
                        fontWeight: '500'
                      }}>
                        {contact.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                color: 'var(--text-primary)'
              }}>
                Sígueme en
              </h4>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                {[
                  { icon: Github, href: 'https://github.com/tu-usuario', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/tu-perfil', label: 'LinkedIn' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#1d6ff2'
                      e.currentTarget.style.borderColor = '#1d6ff2'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'var(--card-bg)'
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                    }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} color="var(--text-primary)" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: 'var(--card-bg)',
            padding: 'clamp(30px, 6vw, 40px)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{
              fontSize: 'clamp(24px, 4vw, 28px)',
              fontWeight: '600',
              marginBottom: '24px',
              color: 'var(--text-primary)'
            }}>
              Envíame un mensaje
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1d6ff2'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    marginBottom: '8px'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1d6ff2'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '8px'
                }}>
                  Asunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#1d6ff2'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: '8px'
                }}>
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: '120px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#1d6ff2'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: isLoading ? '#666' : '#1d6ff2',
                  color: 'white',
                  border: 'none',
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = '#1557c7'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = '#1d6ff2'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                <Send size={18} />
                {isLoading ? 'Enviando...' : 'Enviar mensaje'}
              </button>

              {/* Mensajes de estado */}
              {error && (
                <div style={{
                  padding: '12px 16px',
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  color: '#dc2626',
                  fontSize: '14px',
                  marginTop: '16px'
                }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{
                  padding: '12px 16px',
                  background: '#d1fae5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '8px',
                  color: '#059669',
                  fontSize: '14px',
                  marginTop: '16px'
                }}>
                  ¡Mensaje enviado exitosamente! Te contactaré pronto.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
