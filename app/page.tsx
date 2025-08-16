import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SkillsGrid from '@/components/SkillsGrid'
import ProjectsSection from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import HelpWidget from '@/components/HelpWidget'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Header />
      <Hero />
      <SkillsGrid />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
      <HelpWidget />
      <DarkModeToggle />
    </div>
  )
}
