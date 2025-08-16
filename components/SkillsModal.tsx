'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Maximize2 } from 'lucide-react'
import MacDock from './MacDock'
import DockIcon from './DockIcon'

interface SkillsModalProps {
  isOpen: boolean
  onClose: () => void
}

const SkillsModal = ({ isOpen, onClose }: SkillsModalProps) => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      description: 'Creación de interfaces modernas y responsivas',
      skills: [
        { name: 'React ⚛️', level: 'Experto' },
        { name: 'Next.js 🚀', level: 'Experto' },
        { name: 'TypeScript 📘', level: 'Experto' },
        { name: 'Vue.js 💚', level: 'Intermedio' },
        { name: 'HTML5 🌐', level: 'Experto' },
        { name: 'CSS3 🎨', level: 'Experto' },
        { name: 'Sass/SCSS 💎', level: 'Experto' },
        { name: 'Tailwind CSS 🌊', level: 'Intermedio' }
      ]
    },
    {
      title: 'Backend Development',
      description: 'APIs robustas y arquitecturas escalables',
      skills: [
        { name: 'Node.js 🟢', level: 'Experto' },
        { name: 'Python 🐍', level: 'Experto' },
        { name: 'Express.js ⚡', level: 'Experto' },
        { name: 'Django 🎯', level: 'Intermedio' },
        { name: 'GraphQL 📊', level: 'Intermedio' },
        { name: 'REST APIs 🔌', level: 'Experto' },
        { name: 'Microservices 🧩', level: 'Intermedio' },
        { name: 'WebSockets ⚡', level: 'Intermedio' }
      ]
    },
    {
      title: 'Database & Cloud',
      description: 'Gestión de datos y infraestructura en la nube',
      skills: [
        { name: 'MongoDB 🍃', level: 'Experto' },
        { name: 'PostgreSQL 🐘', level: 'Intermedio' },
        { name: 'MySQL 🐬', level: 'Intermedio' },
        { name: 'Redis ⚡', level: 'Intermedio' },
        { name: 'AWS ☁️', level: 'Intermedio' },
        { name: 'Docker 🐳', level: 'Intermedio' },
        { name: 'Kubernetes ⚙️', level: 'Básico' },
        { name: 'Firebase 🔥', level: 'Experto' }
      ]
    },
    {
      title: 'Mobile & Tools',
      description: 'Desarrollo móvil y herramientas de productividad',
      skills: [
        { name: 'React Native 📱', level: 'Intermedio' },
        { name: 'Flutter 🦋', level: 'Básico' },
        { name: 'Git 📋', level: 'Experto' },
        { name: 'Webpack 📦', level: 'Intermedio' },
        { name: 'Jest 🧪', level: 'Experto' },
        { name: 'Figma 🎨', level: 'Intermedio' },
        { name: 'VS Code 💻', level: 'Experto' },
        { name: 'Linux 🐧', level: 'Intermedio' }
      ]
    }
  ]

  const technologies = [
    {
      name: 'React',
      icon: '⚛️',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      gradient: 'linear-gradient(135deg, #61dafb 0%, #21759b 100%)'
    },
    {
      name: 'Next.js',
      icon: '🚀',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      gradient: 'linear-gradient(135deg, #000000 0%, #434343 100%)'
    },
    {
      name: 'TypeScript',
      icon: '📘',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      gradient: 'linear-gradient(135deg, #3178c6 0%, #1e40af 100%)'
    },
    {
      name: 'Node.js',
      icon: '🟢',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      gradient: 'linear-gradient(135deg, #68d391 0%, #38a169 100%)'
    },
    {
      name: 'Python',
      icon: '🐍',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      gradient: 'linear-gradient(135deg, #3776ab 0%, #ffd43b 100%)'
    },
    {
      name: 'AWS',
      icon: '☁️',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
      gradient: 'linear-gradient(135deg, #ff9900 0%, #ec7211 100%)'
    },
    {
      name: 'Docker',
      icon: '🐳',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      gradient: 'linear-gradient(135deg, #2496ed 0%, #0db7ed 100%)'
    },
    {
      name: 'MongoDB',
      icon: '🍃',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      gradient: 'linear-gradient(135deg, #47a248 0%, #4caf50 100%)'
    },
    {
      name: 'Git',
      icon: '📋',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      gradient: 'linear-gradient(135deg, #f05032 0%, #ff6b35 100%)'
    },
    {
      name: 'Vue.js',
      icon: '💚',
      image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      gradient: 'linear-gradient(135deg, #4fc08d 0%, #42b883 100%)'
    }
  ]

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
