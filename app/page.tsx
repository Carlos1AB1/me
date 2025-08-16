import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SkillsGrid from '@/components/SkillsGrid'
import ProjectsSection from '@/components/ProjectsSection'
import HelpWidget from '@/components/HelpWidget'
import DarkModeToggle from '@/components/DarkModeToggle'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Header />
      <Hero />
      <SkillsGrid />
      <ProjectsSection />
      <HelpWidget />
      <DarkModeToggle />
    </div>
  )
}
