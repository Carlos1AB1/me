'use client'

import { motion, useMotionValue } from 'framer-motion'
import DockIcon from './DockIcon'

interface MacDockProps {
  technologies: Array<{
    name: string
    icon: string
    image?: string
    sub_icon?: string
    sub_image?: string
    color: string
    gradient_type: string
    gradient_css?: string
    background_type?: string
  }>
  onClick?: () => void
}

const MacDock = ({ technologies, onClick }: MacDockProps) => {
  const mouseX = useMotionValue(Infinity)
  
  // Detectar si es móvil o tablet
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        height: isMobile ? '120px' : '160px',
        alignItems: 'end',
        gap: isMobile ? '6px' : '8px',
        padding: isMobile ? '14px 18px' : '18px 24px',
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