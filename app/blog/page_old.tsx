'use client'

import Header from '../../components/Header'
import DarkModeToggle from '../../components/DarkModeToggle'
import HelpWidget from '../../components/HelpWidget'
import TiltCard from '../../components/TiltCard'
import { useState, useEffect } from 'react'
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react'
import apiClient from '../../lib/api'

// Interfaces para tipos de datos del blog
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  categories_data: {
    id: number;
    name: string;
    slug: string;
    color: string;
    posts_count: number;
  }[];
  is_featured: boolean;
  read_time: number;
  views_count: number;
  author_name: string;
  published_at: string;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  posts_count?: number;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Cargar posts y categorías en paralelo
        const [postsData, categoriesData] = await Promise.all([
          apiClient.getBlogPosts(),
          apiClient.getBlogCategories()
        ])

        setBlogPosts(postsData.results || postsData) // API podría devolver paginación
        setCategories([
          { id: 0, name: 'Todos', slug: 'all', description: '', color: '#6b7280' },
          ...categoriesData
        ])

      } catch (error) {
        console.error('Error loading blog data:', error)
        setError('Error al cargar los posts del blog')
        // Fallback a datos vacíos
        setBlogPosts([])
        setCategories([{ id: 0, name: 'Todos', slug: 'all', description: '', color: '#6b7280' }])
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
  }, [])

  // Filtrar posts por categoría
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => 
        post.categories_data.some(cat => cat.slug === selectedCategory)
      )

  const featuredPosts = filteredPosts.filter(post => post.is_featured)
  const regularPosts = filteredPosts.filter(post => !post.is_featured)

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Función para obtener imagen por defecto
  const getDefaultImage = (categories: any[]) => {
    if (categories.some(cat => cat.name.toLowerCase().includes('react') || cat.name.toLowerCase().includes('frontend'))) {
      return 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop'
    }
    if (categories.some(cat => cat.name.toLowerCase().includes('backend') || cat.name.toLowerCase().includes('api'))) {
      return 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop'
    }
    if (categories.some(cat => cat.name.toLowerCase().includes('javascript'))) {
      return 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop'
    }
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
  }

  // Función para obtener el color de categoría
  const getCategoryColor = (categories: any[]) => {
    if (categories.length > 0) {
      return categories[0].color || '#6b7280'
    }
    return '#6b7280'
  }

  // Función para obtener tags como string[]
  const getPostTags = (post: BlogPost) => {
    // Si la API no devuelve tags, creamos algunos basados en las categorías
    return post.categories_data.map(cat => cat.name)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <Header />
        <section style={{
          padding: '120px 20px 60px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column'
          }}>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              border: '4px solid #f3f3f3', 
              borderTop: '4px solid #1d6ff2',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px'
            }}></div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
              Cargando artículos del blog...
            </p>
          </div>
        </section>
        <DarkModeToggle />
        <HelpWidget />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <Header />
        <section style={{
          padding: '120px 20px 60px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>😔</div>
            <h2 style={{ 
              color: 'var(--text-primary)',
              marginBottom: '10px',
              fontSize: '24px'
            }}>
              Error al cargar el blog
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              {error}
            </p>
          </div>
        </section>
        <DarkModeToggle />
        <HelpWidget />
      </div>
    )
  }  return (
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
          Blog
        </h1>
        <p style={{
          fontSize: 'clamp(18px, 3vw, 24px)',
          color: 'var(--text-secondary)',
          maxWidth: '800px',
          margin: '0 auto clamp(40px, 8vw, 60px) auto',
          lineHeight: '1.4'
        }}>
          Artículos sobre desarrollo web, mejores prácticas y las últimas tendencias tecnológicas
        </p>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 40px) 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginBottom: '60px'
        }}>
          {[
            { label: 'Artículos', value: '24', icon: '📝' },
            { label: 'Lectores', value: '2.1k', icon: '👥' },
            { label: 'Comentarios', value: '180', icon: '💬' },
            { label: 'Shares', value: '340', icon: '🔄' }
          ].map((stat, index) => (
            <div key={index} style={{
              padding: '20px',
              background: 'var(--card-bg)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{
                fontSize: '24px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && featuredPosts.length > 0 && (
        <section style={{
          padding: '0 clamp(20px, 5vw, 40px) 60px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '600',
            marginBottom: '40px',
            color: 'var(--text-primary)'
          }}>
            Artículos Destacados
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '30px',
            marginBottom: '80px'
          }}>
            {featuredPosts.map((post, index) => (
              <TiltCard key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                <article style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    height: '240px',
                    borderRadius: '16px 16px 0 0',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img 
                      src={post.image}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: getCategoryColor(post.category),
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      Destacado
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '12px',
                      color: 'var(--text-primary)',
                      lineHeight: '1.3'
                    }}>
                      {post.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: '20px',
                      flex: 1
                    }}>
                      {post.excerpt}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap'
                      }}>
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} style={{
                            fontSize: '10px',
                            background: 'var(--nav-bg)',
                            color: 'var(--text-secondary)',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontWeight: '500'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#1d6ff2',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateX(4px)'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)'
                      }}>
                        Leer más <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 40px)',
        maxWidth: '1200px',
        margin: '0 auto 40px'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '20px',
                border: selectedCategory === category.id 
                  ? '2px solid #1d6ff2' 
                  : '1px solid var(--border-color)',
                background: selectedCategory === category.id 
                  ? '#1d6ff2' 
                  : 'var(--card-bg)',
                color: selectedCategory === category.id 
                  ? 'white' 
                  : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {category.name}
              <span style={{
                fontSize: '12px',
                background: selectedCategory === category.id 
                  ? 'rgba(255,255,255,0.2)' 
                  : 'var(--border-color)',
                padding: '2px 6px',
                borderRadius: '8px'
              }}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* All Posts Grid */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 40px) clamp(60px, 12vw, 120px)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {(selectedCategory === 'all' ? regularPosts : filteredPosts).map((post, index) => (
            <TiltCard key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <article style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  height: '200px',
                  borderRadius: '16px 16px 0 0',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: getCategoryColor(post.category),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {post.category}
                  </div>
                </div>
                
                <div style={{
                  padding: '20px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    fontSize: '11px',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={11} />
                      {new Date(post.date).toLocaleDateString('es-ES', { 
                        day: 'numeric',
                        month: 'short'
                      })}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={11} />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '10px',
                    color: 'var(--text-primary)',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4',
                    marginBottom: '16px',
                    flex: 1
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap'
                    }}>
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} style={{
                          fontSize: '9px',
                          background: 'var(--nav-bg)',
                          color: 'var(--text-secondary)',
                          padding: '3px 6px',
                          borderRadius: '6px',
                          fontWeight: '500'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#1d6ff2',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}>
                      Leer <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Blog
