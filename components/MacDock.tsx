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
  
  // Detectar si es móvil o tablet con múltiples métodos
  const isMobile = typeof window !== 'undefined' && 
    (window.innerWidth <= 768 || 
     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

  return (
    <>
      <style jsx>{`
        .dock-container {
          overflow: visible !important;
          padding-bottom: 40px !important;
        }
        
        @media (max-width: 768px) {
          .dock-container {
            height: 100px !important;
            padding: 8px 12px 30px 12px !important;
            gap: 4px !important;
          }
        }
        
        @media (max-width: 480px) {
          .dock-container {
            height: 90px !important;
            padding: 6px 8px 25px 8px !important;
            gap: 3px !important;
          }
        }
      `}</style>
      <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        height: isMobile ? '100px' : '160px',
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
    </>
  )
}

export default MacDock