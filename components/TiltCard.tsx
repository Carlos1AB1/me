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
      whileHover={{ y: -8 }}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 20px var(--shadow)',
          borderRadius: '18px',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        className="relative w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  )
}

export default TiltCard
