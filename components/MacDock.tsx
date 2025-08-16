'use client'

import { motion, useMotionValue } from 'framer-motion'
import DockIcon from './DockIcon'

interface MacDockProps {
  technologies: Array<{
    name: string
    icon: string
    gradient: string
  }>
  onClick?: () => void
}

const MacDock = ({ technologies, onClick }: MacDockProps) => {
  const mouseX = useMotionValue(Infinity)
  
  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        height: isMobile ? '120px' : '140px',
        alignItems: 'end',
        gap: isMobile ? '4px' : '6px',
        padding: isMobile ? '12px 16px' : '16px 20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: isMobile ? '20px' : '24px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        margin: '0 auto',
        maxWidth: isMobile ? '90vw' : 'fit-content',
        width: 'auto',
        overflow: 'visible'
      }}
      className="dock-container"
    >
      {technologies.map((tech) => (
        <DockIcon mouseX={mouseX} tech={tech} key={tech.name} />
      ))}
    </motion.div>
  )
}

export default MacDock