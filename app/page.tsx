'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MacDock from '@/components/MacDock'
import SkillsModal from '@/components/SkillsModal'
import ProjectsSection from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import HelpWidget from '@/components/HelpWidget'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const technologies = [
    { name: 'React', icon: '⚛️', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
    { name: 'Next.js', icon: '🚀', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', gradient: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)' },
    { name: 'TypeScript', icon: '📘', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', gradient: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)' },
    { name: 'Node.js', icon: '🟢', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', gradient: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' },
    { name: 'Python', icon: '🐍', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' },
    { name: 'AWS', icon: '☁️', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', gradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)' },
    { name: 'Docker', icon: '🐳', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', gradient: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
    { name: 'MongoDB', icon: '🍃', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', gradient: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' },
    { name: 'Git', icon: '📋', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', gradient: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)' },
  ];
  return (
    <>
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Header />
      <Hero />
  <section style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '-40px 0 10px 0' }}>
        <MacDock technologies={technologies} onClick={() => setIsModalOpen(true)} />
      </section>
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
      <HelpWidget />
      <DarkModeToggle />
    </div>
    
    <SkillsModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
    />
    </>
  )
}
