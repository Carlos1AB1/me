'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface DockIconProps {
  tech: {
    name: string
    icon: string
    gradient: string
  }
  mouseX: any
}

const DockIcon = ({ tech, mouseX }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  
  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480

  const distance = useTransform(mouseX, (val: number) => {
    if (isMobile) return 100 // Desactivar magnification en móviles
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Efecto de magnificación (desactivado en móviles)
  const widthSync = useTransform(distance, [-150, 0, 150], isMobile ? [80, 80, 80] : [80, 120, 80])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 })

  const heightSync = useTransform(distance, [-150, 0, 150], isMobile ? [80, 80, 80] : [80, 120, 80])
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 200, damping: 15 })

  const iconSizeSync = useTransform(distance, [-150, 0, 150], isMobile ? [40, 40, 40] : [40, 60, 40])
  const iconSize = useSpring(iconSizeSync, { mass: 0.1, stiffness: 200, damping: 15 })

  const textSizeSync = useTransform(distance, [-150, 0, 150], isMobile ? [12, 12, 12] : [12, 14, 12])
  const textSize = useSpring(textSizeSync, { mass: 0.1, stiffness: 200, damping: 15 })

  return (
    <motion.div
      ref={ref}
      className="dock-icon"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '180px',
        minWidth: '120px',
        paddingBottom: '20px'
      }}
    >
      <motion.div
        style={{
          width,
          height,
          background: tech.gradient,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: tech.name === 'TypeScript' ? '#1d1d1f' : 'white',
          fontSize: iconSize,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '8px'
        }}
        whileHover={{ 
          y: -8,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {tech.icon}
        
        {/* Efecto de brillo */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 }
          }}
        />
      </motion.div>
      
      <motion.span
        style={{
          fontSize: textSize,
          fontWeight: '400',
          textAlign: 'center',
          color: 'var(--text-primary)',
          transition: 'color 0.3s ease',
          whiteSpace: 'nowrap',
          maxWidth: '120px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {tech.name}
      </motion.span>
    </motion.div>
  )
}

export default DockIcon
