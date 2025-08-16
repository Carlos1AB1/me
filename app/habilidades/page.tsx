'use client'

import Header from '../../components/Header'
import DarkModeToggle from '../../components/DarkModeToggle'
import HelpWidget from '../../components/HelpWidget'
import MacDock from '../../components/MacDock'
import DockIcon from '../../components/DockIcon'

const Habilidades = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      description: 'Creación de interfaces modernas y responsivas',
      skills: [
        { name: 'React ⚛️', level: 95, experience: '5+ años' },
        { name: 'Next.js 🚀', level: 90, experience: '3+ años' },
        { name: 'TypeScript 📘', level: 88, experience: '4+ años' },
        { name: 'Vue.js 💚', level: 82, experience: '2+ años' },
        { name: 'HTML5 🌐', level: 98, experience: '6+ años' },
        { name: 'CSS3 🎨', level: 95, experience: '6+ años' },
        { name: 'Sass/SCSS 💎', level: 90, experience: '4+ años' },
        { name: 'Tailwind CSS 🌊', level: 85, experience: '3+ años' }
      ]
    },
    {
      title: 'Backend Development',
      description: 'APIs robustas y arquitecturas escalables',
      skills: [
        { name: 'Node.js 🟢', level: 92, experience: '5+ años' },
        { name: 'Python 🐍', level: 88, experience: '4+ años' },
        { name: 'Express.js ⚡', level: 90, experience: '5+ años' },
        { name: 'Django 🎯', level: 78, experience: '2+ años' },
        { name: 'GraphQL 📊', level: 82, experience: '3+ años' },
        { name: 'REST APIs 🔌', level: 95, experience: '5+ años' },
        { name: 'Microservices 🧩', level: 75, experience: '2+ años' },
        { name: 'WebSockets ⚡', level: 80, experience: '3+ años' }
      ]
    },
    {
      title: 'Database & Cloud',
      description: 'Gestión de datos y infraestructura en la nube',
      skills: [
        { name: 'MongoDB 🍃', level: 90, experience: '4+ años' },
        { name: 'PostgreSQL 🐘', level: 85, experience: '3+ años' },
        { name: 'MySQL 🐬', level: 82, experience: '4+ años' },
        { name: 'Redis ⚡', level: 78, experience: '2+ años' },
        { name: 'AWS ☁️', level: 80, experience: '3+ años' },
        { name: 'Docker 🐳', level: 85, experience: '3+ años' },
        { name: 'Kubernetes ⚙️', level: 70, experience: '1+ años' },
        { name: 'Firebase 🔥', level: 88, experience: '3+ años' }
      ]
    },
    {
      title: 'Mobile & Tools',
      description: 'Desarrollo móvil y herramientas de productividad',
      skills: [
        { name: 'React Native 📱', level: 85, experience: '3+ años' },
        { name: 'Flutter 🦋', level: 75, experience: '2+ años' },
        { name: 'Git 📋', level: 95, experience: '6+ años' },
        { name: 'Webpack 📦', level: 80, experience: '4+ años' },
        { name: 'Jest 🧪', level: 88, experience: '4+ años' },
        { name: 'Figma 🎨', level: 82, experience: '3+ años' },
        { name: 'VS Code 💻', level: 98, experience: '6+ años' },
        { name: 'Linux 🐧', level: 85, experience: '4+ años' }
      ]
    }
  ]

  const allSkills = [
    { name: 'React ⚛️', icon: '⚛️' },
    { name: 'Next.js 🚀', icon: '🚀' },
    { name: 'TypeScript 📘', icon: '📘' },
    { name: 'Node.js 🟢', icon: '🟢' },
    { name: 'Python 🐍', icon: '🐍' },
    { name: 'AWS ☁️', icon: '☁️' },
    { name: 'Docker 🐳', icon: '🐳' },
    { name: 'MongoDB 🍃', icon: '🍃' },
    { name: 'Git 📋', icon: '📋' },
    { name: 'Vue.js 💚', icon: '💚' }
  ]

  const getSkillColor = (level: number) => {
    if (level >= 90) return '#00d084'
    if (level >= 80) return '#1d6ff2'
    if (level >= 70) return '#ff9500'
    return '#ff3b30'
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      transition: 'all 0.3s ease'
    }}>
      <Header />
      <DarkModeToggle />
      <HelpWidget />
      
      {/* Hero Section */}
      <section style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 56px)',
          fontWeight: '600',
          marginBottom: 'clamp(16px, 3vw, 24px)',
          letterSpacing: '-0.015em'
        }}>
          Habilidades
        </h1>
        <p style={{
          fontSize: 'clamp(18px, 3vw, 24px)',
          color: 'var(--text-secondary)',
          maxWidth: '800px',
          margin: '0 auto clamp(40px, 8vw, 60px) auto',
          lineHeight: '1.4'
        }}>
          Tecnologías y herramientas que domino para crear soluciones excepcionales
        </p>
      </section>

      {/* Skills Dock */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 40px) 60px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontWeight: '600',
          marginBottom: '40px',
          color: 'var(--text-primary)'
        }}>
          Stack Tecnológico Principal
        </h2>
        
        <MacDock>
          {allSkills.map((skill, index) => (
            <DockIcon
              key={index}
              icon={skill.icon}
              text={skill.name.split(' ')[0]}
            />
          ))}
        </MacDock>
      </section>

      {/* Detailed Skills */}
      <section style={{
        padding: 'clamp(60px, 12vw, 100px) clamp(20px, 5vw, 40px)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 'clamp(30px, 6vw, 40px)'
        }}>
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} style={{
              background: 'var(--card-bg)',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              padding: 'clamp(24px, 5vw, 32px)',
              height: 'fit-content'
            }}>
              <h3 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '600',
                marginBottom: '12px',
                color: 'var(--text-primary)'
              }}>
                {category.title}
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
                lineHeight: '1.5'
              }}>
                {category.description}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: 'var(--text-primary)'
                      }}>
                        {skill.name}
                      </span>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          fontSize: '12px',
                          color: 'var(--text-secondary)'
                        }}>
                          {skill.experience}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: getSkillColor(skill.level)
                        }}>
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: 'var(--border-color)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: getSkillColor(skill.level),
                        borderRadius: '3px',
                        transition: 'width 1s ease-out'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Learning */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 40px) clamp(60px, 12vw, 120px)',
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid var(--border-color)',
        paddingTop: 'clamp(60px, 12vw, 100px)'
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: '600',
          marginBottom: '40px',
          textAlign: 'center',
          color: 'var(--text-primary)'
        }}>
          Certificaciones y Aprendizaje Continuo
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              title: 'AWS Certified Developer',
              issuer: 'Amazon Web Services',
              year: '2023',
              icon: '☁️'
            },
            {
              title: 'React Advanced Patterns',
              issuer: 'Meta/Facebook',
              year: '2022',
              icon: '⚛️'
            },
            {
              title: 'Node.js Microservices',
              issuer: 'Linux Foundation',
              year: '2023',
              icon: '🟢'
            },
            {
              title: 'TypeScript Deep Dive',
              issuer: 'Microsoft',
              year: '2022',
              icon: '📘'
            }
          ].map((cert, index) => (
            <div key={index} style={{
              background: 'var(--card-bg)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '24px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '16px'
              }}>
                {cert.icon}
              </div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--text-primary)'
              }}>
                {cert.title}
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#1d6ff2',
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                {cert.issuer}
              </p>
              <p style={{
                fontSize: '12px',
                color: 'var(--text-secondary)'
              }}>
                {cert.year}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Habilidades
