'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface DockIconProps {
  tech: {
    name: string
    icon: string
    image?: string
    sub_icon?: string
    sub_image?: string
    color: string
    gradient_type: string
    gradient_css?: string
    background_type?: string
  }
  mouseX: any
}

const DockIcon = ({ tech, mouseX }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  
  // Detectar si es móvil o tablet con múltiples métodos
  const isMobile = typeof window !== 'undefined' && 
    (window.innerWidth <= 768 || 
     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

  // Determinar el estilo de fondo basado en la configuración
  const getBackgroundStyle = () => {
    const backgroundType = tech.background_type || 'gradient'
    
    switch (backgroundType) {
      case 'transparent':
        return 'transparent'
      case 'solid':
        return tech.color || '#74b9ff'
      case 'gradient':
        return tech.gradient_css || tech.color || '#74b9ff'
      default:
        return tech.color || '#74b9ff'
    }
  }
  
  const backgroundStyle = getBackgroundStyle()
  
  // Ajustar color del texto basado en el tipo de fondo
  const getTextColor = () => {
    if (tech.background_type === 'transparent') {
      return 'var(--text-primary)' // Usar color del tema
    }
    return tech.name === 'TypeScript' ? '#1d1d1f' : 'white'
  }

  const distance = useTransform(mouseX, (val: number) => {
    if (isMobile) return 100 // Desactivar magnification en móviles
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Efecto de magnificación (tamaños más grandes y más rápido)
  const widthSync = useTransform(distance, [-150, 0, 150], isMobile ? [100, 100, 100] : [100, 140, 100])
  const width = useSpring(widthSync, { mass: 0.05, stiffness: 400, damping: 20 })

  const heightSync = useTransform(distance, [-150, 0, 150], isMobile ? [100, 100, 100] : [100, 140, 100])
  const height = useSpring(heightSync, { mass: 0.05, stiffness: 400, damping: 20 })

  const iconSizeSync = useTransform(distance, [-150, 0, 150], isMobile ? [50, 50, 50] : [50, 70, 50])
  const iconSize = useSpring(iconSizeSync, { mass: 0.05, stiffness: 400, damping: 20 })

  const textSizeSync = useTransform(distance, [-150, 0, 150], isMobile ? [8, 8, 8] : [14, 16, 14])
  const textSize = useSpring(textSizeSync, { mass: 0.05, stiffness: 400, damping: 20 })

  return (
    <>
      <style jsx>{`
        .dock-icon {
          overflow: visible !important;
        }
        
        @media (max-width: 768px) {
          .dock-icon {
            height: 80px !important;
            min-width: 60px !important;
            padding-bottom: 4px !important;
          }
          
          .dock-icon-text {
            font-size: 9px !important;
            max-width: 60px !important;
            padding-top: 2px !important;
            line-height: 1.1 !important;
          }
        }
        
        @media (max-width: 480px) {
          .dock-icon {
            height: 70px !important;
            min-width: 50px !important;
            padding-bottom: 2px !important;
          }
          
          .dock-icon-text {
            font-size: 8px !important;
            max-width: 50px !important;
            padding-top: 1px !important;
            line-height: 1.1 !important;
          }
        }
      `}</style>
      <motion.div
        ref={ref}
        className="dock-icon"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: isMobile ? '80px' : '200px',
          minWidth: isMobile ? '60px' : '140px',
          paddingBottom: isMobile ? '4px' : '20px'
        }}
      >
      <motion.div
        style={{
          width,
          height,
          background: backgroundStyle,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: getTextColor(),
          fontSize: iconSize,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: isMobile ? '4px' : '8px'
        }}
        whileHover={{ 
          y: -8,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {tech.image ? (
          <img 
            src={tech.image} 
            alt={tech.name}
            style={{
              width: '75%',
              height: '75%',
              objectFit: 'contain'
            }}
          />
        ) : (
          tech.icon
        )}
        
        {/* Sub-ícono flotante */}
        {(tech.sub_image || tech.sub_icon) && (
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '28px',
              height: '28px',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              zIndex: 10
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          >
            {tech.sub_image ? (
              <img 
                src={tech.sub_image} 
                alt={`${tech.name} framework`}
                style={{
                  width: '18px',
                  height: '18px',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <span style={{ fontSize: '12px' }}>{tech.sub_icon}</span>
            )}
          </motion.div>
        )}
        
  {/* Efecto de brillo eliminado */}
      </motion.div>
      
      <motion.span
        className="dock-icon-text"
        style={{
          fontSize: textSize,
          fontWeight: '500',
          textAlign: 'center',
          color: 'var(--text-primary)',
          transition: 'color 0.3s ease',
          whiteSpace: 'nowrap',
          maxWidth: isMobile ? '60px' : '140px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.2',
          paddingTop: isMobile ? '2px' : '4px'
        }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
    </>
  )
}

export default DockIcon