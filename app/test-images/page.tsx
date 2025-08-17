'use client'

import { useState } from 'react'
import ImageUpload from '../../components/ImageUpload'
import SkillForm from '../../components/SkillForm'
import apiClient from '../../lib/api'

const ImageTestPage = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'form'>('upload')
  const [message, setMessage] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleImageSelect = async (file: File) => {
    try {
      setMessage('Subiendo imagen...')
      const result = await apiClient.uploadImage(file, 'test')
      setImageUrl(result.file_url)
      setMessage(`✅ Imagen subida exitosamente: ${result.original_name}`)
    } catch (error) {
      setMessage(`❌ Error al subir imagen: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    }
  }

  const handleSkillSubmit = (skillData: any) => {
    console.log('Datos de habilidad:', skillData)
    setMessage(`✅ Habilidad guardada: ${skillData.name}`)
  }

  const handleSkillCancel = () => {
    setMessage('Formulario cancelado')
  }

  const containerStyles: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh'
  }

  const headerStyles: React.CSSProperties = {
    textAlign: 'center' as const,
    marginBottom: '32px'
  }

  const titleStyles: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px'
  }

  const subtitleStyles: React.CSSProperties = {
    fontSize: '16px',
    color: '#6b7280'
  }

  const tabContainerStyles: React.CSSProperties = {
    display: 'flex',
    marginBottom: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '4px'
  }

  const tabStyles: React.CSSProperties = {
    flex: 1,
    padding: '12px 24px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    fontWeight: '500'
  }

  const activeTabStyles: React.CSSProperties = {
    ...tabStyles,
    backgroundColor: '#3b82f6',
    color: 'white'
  }

  const inactiveTabStyles: React.CSSProperties = {
    ...tabStyles,
    color: '#6b7280'
  }

  const contentStyles: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px'
  }

  const messageStyles: React.CSSProperties = {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '14px',
    fontWeight: '500'
  }

  const successMessageStyles: React.CSSProperties = {
    ...messageStyles,
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    border: '1px solid #d1fae5'
  }

  const errorMessageStyles: React.CSSProperties = {
    ...messageStyles,
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fecaca'
  }

  const imagePreviewStyles: React.CSSProperties = {
    marginTop: '16px',
    textAlign: 'center' as const
  }

  const previewImageStyles: React.CSSProperties = {
    maxWidth: '300px',
    maxHeight: '200px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  }

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Test de Subida de Imágenes</h1>
        <p style={subtitleStyles}>
          Prueba el sistema de subida de imágenes para el portfolio
        </p>
      </div>

      <div style={tabContainerStyles}>
        <div
          style={activeTab === 'upload' ? activeTabStyles : inactiveTabStyles}
          onClick={() => setActiveTab('upload')}
        >
          🔄 Subida Directa
        </div>
        <div
          style={activeTab === 'form' ? activeTabStyles : inactiveTabStyles}
          onClick={() => setActiveTab('form')}
        >
          📝 Formulario de Habilidad
        </div>
      </div>

      {message && (
        <div style={message.includes('✅') ? successMessageStyles : errorMessageStyles}>
          {message}
        </div>
      )}

      <div style={contentStyles}>
        {activeTab === 'upload' && (
          <div>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
              Subir Imagen Individual
            </h2>
            <ImageUpload
              onImageSelect={handleImageSelect}
              category="test"
              maxSizeKB={2048}
            />
            {imageUrl && (
              <div style={imagePreviewStyles}>
                <p style={{ marginBottom: '12px', fontWeight: '500' }}>
                  Imagen subida exitosamente:
                </p>
                <img 
                  src={imageUrl} 
                  alt="Imagen subida" 
                  style={previewImageStyles}
                />
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
                  URL: {imageUrl}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'form' && (
          <div>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>
              Formulario de Habilidad con Imagen
            </h2>
            <SkillForm
              onSubmit={handleSkillSubmit}
              onCancel={handleSkillCancel}
            />
          </div>
        )}
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: '#374151' }}>
          ℹ️ Información del Test
        </h3>
        <ul style={{ listStyle: 'disc', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Las imágenes se suben al backend Django con validación de tipo y tamaño</li>
          <li>Se optimizan automáticamente (redimensión, compresión, conversión a JPEG)</li>
          <li>Se organizan por categorías en directorios separados</li>
          <li>Soporte para drag & drop y selección manual</li>
          <li>Preview en tiempo real con opción de eliminar</li>
          <li>Integración completa con formularios del portfolio</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageTestPage
