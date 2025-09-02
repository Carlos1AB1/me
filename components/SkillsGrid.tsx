'use client'

import { useState } from 'react'
import MacDock from './MacDock'
import SkillsModal from './SkillsModal'

const SkillsGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const technologies = [
    { name: 'React', icon: '⚛️', color: '#61dafb', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
    { name: 'Next.js', icon: '🚀', color: '#000000', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)' },
    { name: 'TypeScript', icon: '📘', color: '#3178c6', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)' },
    { name: 'Node.js', icon: '🟢', color: '#339933', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' },
    { name: 'Python', icon: '🐍', color: '#3776ab', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' },
    { name: 'AWS', icon: '☁️', color: '#ff9900', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)' },
    { name: 'Docker', icon: '🐳', color: '#2496ed', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
    { name: 'MongoDB', icon: '🍃', color: '#47a248', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' },
    { name: 'Git', icon: '📋', color: '#f05032', gradient_type: 'linear', gradient_css: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)' },
  ]

  return (
    <>
      <section 
        className="skills-section"
        style={{
          width: '100%',
          margin: '0',
          padding: 'clamp(1px, 1vw, 1px) 0 clamp(40px, 12vw, 80px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <MacDock 
          technologies={technologies} 
          onClick={() => setIsModalOpen(true)}
        />
      </section>
      
      <SkillsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default SkillsGrid
