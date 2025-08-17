'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MacDock from '@/components/MacDock'
import SkillsModal from '@/components/SkillsModal'
import ProjectsSection from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import HelpWidget from '@/components/HelpWidget'
import DarkModeToggle from '@/components/DarkModeToggle'
import apiClient from '@/lib/api'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Tecnologías que se mostrarán en el MacDock (basadas en las habilidades del backend)
  const [technologies, setTechnologies] = useState<Array<{
    name: string;
    icon: string;
    image?: string;
    color: string;
    gradient_type: string;
  }>>([])

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true)
        // Cargar habilidades del backend
        const skillsData = await apiClient.getFeaturedSkills()
        console.log('Skills data received:', skillsData) // Debug log
        setSkills(skillsData)
        
        // Convertir habilidades a formato de tecnologías para el MacDock
        const techData = skillsData.map((skill: any) => ({
          name: skill.name || 'Unknown',
          icon: skill.icon || '⚡',
          image: skill.image,
          color: skill.color || '#74b9ff',
          gradient_type: skill.gradient_type || 'linear-diagonal-1'
        }))
        
        console.log('Tech data processed:', techData) // Debug log
        setTechnologies(techData)
      } catch (error) {
        console.error('Error loading skills:', error)
        // Si hay error, usar datos de fallback
        const fallbackTechnologies = [
          {
            name: 'React',
            icon: '⚛️',
            color: '#61DAFB',
            gradient_type: 'linear-diagonal-1'
          },
          {
            name: 'Next.js',
            icon: '🔺',
            color: '#000000',
            gradient_type: 'linear-diagonal-2'
          },
          {
            name: 'TypeScript',
            icon: '📘',
            color: '#3178C6',
            gradient_type: 'radial-center'
          }
        ]
        setTechnologies(fallbackTechnologies)
      } finally {
        setLoading(false)
      }
    }

    loadSkills()
  }, [])
  return (
    <>
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Header />
      <Hero />
      
      {loading ? (
        <section style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0', padding: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '3px solid #f3f3f3', 
              borderTop: '3px solid #1d6ff2',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 10px'
            }}></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Cargando tecnologías desde el backend...</p>
          </div>
        </section>
      ) : (
        <section style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '-40px 0 10px 0' }}>
          <MacDock technologies={technologies} onClick={() => setIsModalOpen(true)} />
        </section>
      )}
      
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
      <HelpWidget />
      <DarkModeToggle />
    </div>
    
    <SkillsModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
      skills={skills}
    />
    </>
  )
}
