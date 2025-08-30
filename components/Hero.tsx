'use client'

const Hero = () => {
  return (
    <main 
      className="hero-container"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(30px, 8vw, 60px) clamp(16px, 4vw, 22px)'
      }}>
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{
          textAlign: 'left',
          marginBottom: 'clamp(40px, 10vw, 80px)'
        }}>
        <h1 
          className="hero-title"
          style={{
            fontSize: 'clamp(32px, 8vw, 56px)',
            fontWeight: '600',
            lineHeight: '1.07',
            letterSpacing: '-0.005em',
            marginBottom: 'clamp(12px, 3vw, 20px)',
            color: 'var(--text-primary)',
            transition: 'color 0.3s ease'
          }}>
          <span style={{ color: 'var(--link-color)', fontWeight: 600 }}>Carlos Arturo B.</span> Estudiante
        </h1>
        <h1 
          className="hero-subtitle"
          style={{
            fontSize: 'clamp(32px, 8vw, 56px)',
            fontWeight: '600',
            lineHeight: '1.07',
            letterSpacing: '-0.005em',
            color: 'var(--text-secondary)',
            transition: 'color 0.3s ease'
          }}>
          Ingeniería de software. 
        </h1>
      </section>
    </main>
  )
}

export default Hero
