'use client'

import MacDock from './MacDock'

const SkillsGrid = () => {
  const technologies = [
    { name: 'React', icon: '⚛️', gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
    { name: 'Next.js', icon: '🚀', gradient: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)' },
    { name: 'TypeScript', icon: '📘', gradient: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)' },
    { name: 'Node.js', icon: '🟢', gradient: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' },
    { name: 'Python', icon: '🐍', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' },
    { name: 'AWS', icon: '☁️', gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)' },
    { name: 'Docker', icon: '🐳', gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
    { name: 'MongoDB', icon: '🍃', gradient: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' },
    { name: 'Git', icon: '📋', gradient: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)' },
  ]

  return (
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
      <MacDock technologies={technologies} />
    </section>
  )
}

export default SkillsGrid
