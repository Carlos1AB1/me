'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Cargar preferencia guardada al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (prefersDark) {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  // Alternar modo oscuro
  const toggleDarkMode = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light'
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      {/* CSS para responsividad */}
      <style jsx>{`
        .dark-mode-toggle {
          position: fixed;
          top: 120px;
          right: 20px;
          z-index: 1000;
          width: 44px;
          height: 44px;
          border-radius: 22px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 12px var(--shadow);
        }
        
        .dark-mode-toggle:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px var(--shadow);
        }
        
        @media (max-width: 768px) {
          .dark-mode-toggle {
            top: 50px;
            right: 16px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
            font-size: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .dark-mode-toggle {
            top: 40px;
            right: 12px;
            width: 36px;
            height: 36px;
            border-radius: 18px;
            font-size: 14px;
          }
        }
        
        @media (max-width: 360px) {
          .dark-mode-toggle {
            top: 30px;
            right: 10px;
            width: 32px;
            height: 32px;
            border-radius: 16px;
            font-size: 12px;
          }
        }
        
        @media (min-width: 1200px) {
          .dark-mode-toggle {
            top: 140px;
            right: 24px;
            width: 48px;
            height: 48px;
            border-radius: 24px;
            font-size: 20px;
          }
        }
      `}</style>
      
      <button
        onClick={toggleDarkMode}
        className="dark-mode-toggle"
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 12px var(--shadow)'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {isDarkMode ? (
          <Sun size={20} strokeWidth={2} />
        ) : (
          <Moon size={20} strokeWidth={2} />
        )}
      </button>
    </>
  )
}

export default DarkModeToggle
