'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Maximize2 } from 'lucide-react'
import MacDock from './MacDock'
import DockIcon from './DockIcon'

interface SkillsModalProps {
  isOpen: boolean
  onClose: () => void
  skills?: any[]
}

const SkillsModal = ({ isOpen, onClose, skills = [] }: SkillsModalProps) => {
  // Debug log para ver los datos que llegan
  console.log('SkillsModal received skills:', skills)
  
  // Si hay skills del backend, usarlas; si no, usar estructura vacía
  const skillCategories: Array<{
    title: string;
    description: string;
    skills: Array<{ name: string; level: string }>;
  }> = skills.length > 0 ? [
    {
      title: 'Habilidades Técnicas',
      description: 'Tecnologías y herramientas que domino',
      skills: skills.map((skill: any) => ({
        name: skill.name,
        level: skill.level || 'Intermedio'
      }))
    }
  ] : [
    // TODO: Agregar tus categorías de habilidades reales aquí
    // Ejemplo de estructura:
    // {
    //   title: 'Nombre de la Categoría',
    //   description: 'Descripción de la categoría',
    //   skills: [
    //     { name: 'Nombre de la habilidad', level: 'Básico' | 'Intermedio' | 'Experto' },
    //   ]
    // }
  ]

  const technologies: Array<{
    name: string;
    icon: string;
    image?: string;
    color: string;
    gradient_type: string;
    gradient_css?: string;
    background_type?: string;
  }> = skills.length > 0 ? skills.map((skill: any) => ({
    name: skill.name,
    icon: skill.icon || '⚡',
    image: skill.image,
    color: skill.color || '#74b9ff',
    gradient_type: skill.gradient_type || 'linear-diagonal-1',
    gradient_css: skill.gradient_css || null,
    background_type: skill.background_type || 'gradient'
  })) : [
    // Datos de fallback simples
    {
      name: 'React',
      icon: '⚛️',
      color: '#61DAFB',
      gradient_type: 'linear-diagonal-1',
      background_type: 'gradient'
    },
    {
      name: 'Next.js',
      icon: '🔺',
      color: '#000000',
      gradient_type: 'linear-diagonal-2',
      background_type: 'solid'
    },
    {
      name: 'TypeScript',
      icon: '📘',
      color: '#3178C6',
      gradient_type: 'radial-center',
      background_type: 'transparent'
    }
  ]
  
  // Debug log para ver las tecnologías procesadas
  console.log('SkillsModal technologies:', technologies)

  const getSkillColor = (level: string) => {
    if (level === 'Experto') return '#00d084'
    if (level === 'Intermedio') return '#1d6ff2'
    if (level === 'Básico') return '#ff9500'
    return '#ff3b30'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 25,
              duration: 0.5
            }}
            style={{
              background: 'var(--bg-primary)',
              borderRadius: '20px',
              width: '95vw',
              height: '90vh',
              maxWidth: '1400px',
              maxHeight: '900px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Header - macOS Style */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-color)',
              background: 'var(--nav-bg)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {/* macOS Traffic Lights */}
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ff5f57',
                  cursor: 'pointer'
                }} onClick={onClose} />
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ffbd2e',
                  cursor: 'pointer'
                }} />
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#28ca42',
                  cursor: 'pointer'
                }} />
              </div>
              
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: 0,
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)'
              }}>
                Habilidades
              </h2>
              
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--border-color)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <X size={18} color="var(--text-secondary)" />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: '40px'
            }}>
              {/* Hero Section */}
              <div style={{
                textAlign: 'center',
                marginBottom: '50px'
              }}>
                <h1 style={{
                  fontSize: 'clamp(28px, 5vw, 40px)',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.015em'
                }}>
                  Stack Tecnológico
                </h1>
                <p style={{
                  fontSize: 'clamp(16px, 3vw, 20px)',
                  color: 'var(--text-secondary)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: '1.4'
                }}>
                  Tecnologías y herramientas que domino para crear soluciones excepcionales
                </p>
              </div>

              {/* Interactive Dock */}
              <div style={{
                marginBottom: '60px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <MacDock technologies={technologies} />
              </div>

              {/* Detailed Skills */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px'
              }}>
                {skillCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} style={{
                    background: 'var(--card-bg)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    padding: '24px',
                    height: 'fit-content'
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: 'var(--text-primary)'
                    }}>
                      {category.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: '20px',
                      lineHeight: '1.5'
                    }}>
                      {category.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px'
                    }}>
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: 'var(--text-primary)'
                            }}>
                              {skill.name}
                            </span>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <span style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                color: 'var(--text-primary)'
                              }}>
                                {skill.level}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{
                            width: '100%',
                            height: '4px',
                            background: 'var(--border-color)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                          }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ 
                                duration: 1.5, 
                                delay: categoryIndex * 0.1 + skillIndex * 0.1,
                                ease: 'easeOut'
                              }}
                              style={{
                                height: '100%',
                                background: getSkillColor(skill.level),
                                borderRadius: '2px'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SkillsModal
