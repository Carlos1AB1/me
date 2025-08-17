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

        // Manejar respuesta con paginación del API
        const posts = Array.isArray(postsData) ? postsData : ((postsData as any)?.results || [])
        const cats = Array.isArray(categoriesData) ? categoriesData : ((categoriesData as any)?.results || [])

        setBlogPosts(posts)
        setCategories(cats)

      } catch (error) {
        console.error('Error loading blog data:', error)
        setError('Error al cargar los posts del blog')
        setBlogPosts([])
        setCategories([])
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
  }

  // Preparar categorías con contador
  const categoriesWithCount = [
    { id: 'all', name: 'Todos', slug: 'all', count: blogPosts.length },
    ...(categories || []).map(cat => ({
      ...cat,
      count: blogPosts.filter(post => 
        post.categories_data.some(postCat => postCat.id === cat.id)
      ).length
    }))
  ]

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
        padding: 'clamp(80px, 12vw, 120px) clamp(20px, 5vw, 40px) clamp(40px, 8vw, 60px)',
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
          Blog de Desarrollo
        </h1>
        <p style={{
          fontSize: 'clamp(18px, 3vw, 24px)',
          color: 'var(--text-secondary)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.4'
        }}>
          Artículos sobre desarrollo web, mejores prácticas y las últimas tendencias tecnológicas
        </p>
      </section>

      {/* Categories Filter */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 40px) 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '60px'
        }}>
          {categoriesWithCount.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: selectedCategory === category.slug
                  ? '2px solid #1d6ff2'
                  : '1px solid var(--border-color)',
                background: selectedCategory === category.slug
                  ? '#1d6ff2'
                  : 'var(--card-bg)',
                color: selectedCategory === category.slug
                  ? 'white'
                  : 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== category.slug) {
                  e.currentTarget.style.background = 'var(--bg-secondary)'
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== category.slug) {
                  e.currentTarget.style.background = 'var(--card-bg)'
                }
              }}
            >
              {category.name}
              <span style={{
                background: selectedCategory === category.slug
                  ? 'rgba(255,255,255,0.2)'
                  : 'var(--bg-secondary)',
                padding: '2px 6px',
                borderRadius: '10px',
                fontSize: '12px'
              }}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section style={{
          padding: '0 clamp(20px, 5vw, 40px) 60px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '600',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Artículos Destacados
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {featuredPosts.map((post) => (
              <TiltCard key={post.id} style={{ height: '100%' }}>
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Image */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '12px 12px 0 0',
                    overflow: 'hidden',
                    background: 'var(--bg-secondary)'
                  }}>
                    <img
                      src={post.featured_image || getDefaultImage(post.categories_data)}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{
                    padding: '24px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Category badge */}
                    {post.categories_data.length > 0 && (
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        background: getCategoryColor(post.categories_data),
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                        marginBottom: '16px',
                        alignSelf: 'flex-start'
                      }}>
                        {post.categories_data[0].name}
                      </span>
                    )}

                    {/* Meta info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '12px',
                      fontSize: '13px',
                      color: 'var(--text-secondary)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        {formatDate(post.published_at)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={14} />
                        {post.read_time} min
                      </div>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '12px',
                      lineHeight: '1.3',
                      flex: 1
                    }}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                      marginBottom: '20px'
                    }}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '20px'
                    }}>
                      {post.categories_data.slice(0, 2).map((category) => (
                        <span
                          key={category.id}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '8px',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>

                    {/* Read more */}
                    <button style={{
                      padding: '10px 16px',
                      background: '#1d6ff2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease',
                      alignSelf: 'flex-start'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#1557c7'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#1d6ff2'
                    }}>
                      Leer artículo
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section style={{
          padding: '60px clamp(20px, 5vw, 40px)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: '600',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            Más Artículos
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {regularPosts.map((post) => (
              <TiltCard key={post.id}>
                <div style={{
                  padding: '20px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Category */}
                  {post.categories_data.length > 0 && (
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      background: getCategoryColor(post.categories_data),
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: '500',
                      marginBottom: '12px',
                      alignSelf: 'flex-start'
                    }}>
                      {post.categories_data[0].name}
                    </span>
                  )}

                  {/* Title */}
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '10px',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4',
                    marginBottom: '16px',
                    flex: 1
                  }}>
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '12px'
                  }}>
                    <span>{formatDate(post.published_at)}</span>
                    <span>{post.read_time} min de lectura</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <section style={{
          padding: '60px 20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📝</div>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            No hay artículos en esta categoría
          </h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '16px'
          }}>
            Pronto habrá contenido nuevo aquí.
          </p>
        </section>
      )}
    </div>
  )
}

export default Blog
