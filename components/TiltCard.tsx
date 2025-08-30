'use client'

import React, { useRef } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const ROTATION_RANGE = 45
const HALF_ROTATION_RANGE = 45 / 2

const TiltCard = ({ children, className = '', style = {}, onClick }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x)
  const ySpring = useSpring(y)

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1
    const rY = mouseX / width - HALF_ROTATION_RANGE

    // Debug: mostrar valores en consola
    console.log('rX:', rX, 'rY:', rY)

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          transformStyle: "preserve-3d",
          transform,
          ...style
        }}
        className={`relative rounded-xl ${className}`}
        whileHover={{
          scale: 1.06,
          rotateZ: 4,
          y: -12,
          transition: { type: 'spring', stiffness: 320, damping: 18 }
        }}
        whileTap={{ scale: 0.98, rotateZ: 0 }}
      >
        <motion.div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 6px 26px rgba(18,24,40,0.08)',
            borderRadius: '18px',
            cursor: 'pointer',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            boxSizing: 'border-box',
            willChange: 'transform, box-shadow, filter'
          }}
          className="relative w-full h-full"
          whileHover={{ boxShadow: '0 28px 48px rgba(10,20,50,0.16)', filter: 'brightness(1.03)' }}
          transition={{ type: 'tween', duration: 0.18 }}
        >
          {children}
        </motion.div>
      </motion.div>
  )
}

export default TiltCard
