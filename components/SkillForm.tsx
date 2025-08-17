'use client'

import { useState } from 'react'
import ImageUpload from './ImageUpload'
import apiClient from '../lib/api'

interface SkillFormProps {
  initialData?: {
    id?: number
    name: string
    level: number
    category: string
    description: string
    image?: string
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

const SkillForm = ({ initialData, onSubmit, onCancel }: SkillFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    level: initialData?.level || 1,
    category: initialData?.category || '',
    description: initialData?.description || '',
    image: initialData?.image || ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value) : value
    }))
  }

  const handleImageSelect = (file: File) => {
    setImageFile(file)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setError(null)

    try {
      let imageUrl = formData.image

      // Si hay una nueva imagen, subirla primero
      if (imageFile) {
        const uploadResult = await apiClient.uploadImage(imageFile, 'skills')
        imageUrl = uploadResult.file_url
      }

      // Preparar datos del formulario
      const submitData = {
        ...formData,
        image: imageUrl
      }

      onSubmit(submitData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la habilidad')
    } finally {
      setUploading(false)
    }
  }

  const formStyles: React.CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }

  const fieldGroupStyles: React.CSSProperties = {
    marginBottom: '20px'
  }

  const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#374151'
  }

  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    color: '#374151'
  }

  const selectStyles: React.CSSProperties = {
    ...inputStyles,
    backgroundColor: 'white'
  }

  const textareaStyles: React.CSSProperties = {
    ...inputStyles,
    minHeight: '100px',
    resize: 'vertical' as const
  }

  const rangeStyles: React.CSSProperties = {
    width: '100%',
    height: '8px',
    borderRadius: '4px',
    background: '#e5e7eb',
    outline: 'none',
    opacity: 0.7,
    transition: 'opacity 0.2s'
  }

  const buttonStyles: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '12px',
    transition: 'background-color 0.2s'
  }

  const primaryButtonStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: uploading ? '#9ca3af' : '#3b82f6',
    color: 'white'
  }

  const secondaryButtonStyles: React.CSSProperties = {
    ...buttonStyles,
    backgroundColor: '#f3f4f6',
    color: '#374151'
  }

  const errorStyles: React.CSSProperties = {
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    color: '#dc2626'
  }

  return (
    <form style={formStyles} onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600', color: '#111827' }}>
        {initialData?.id ? 'Editar Habilidad' : 'Nueva Habilidad'}
      </h2>

      {error && (
        <div style={errorStyles}>
          {error}
        </div>
      )}

      <div style={fieldGroupStyles}>
        <label style={labelStyles} htmlFor="name">
          Nombre de la habilidad *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={inputStyles}
          required
          placeholder="Ej: React, Python, Diseño UX/UI"
        />
      </div>

      <div style={fieldGroupStyles}>
        <label style={labelStyles} htmlFor="category">
          Categoría *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          style={selectStyles}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="design">Diseño</option>
          <option value="tools">Herramientas</option>
          <option value="languages">Lenguajes</option>
          <option value="databases">Bases de Datos</option>
          <option value="mobile">Móvil</option>
          <option value="devops">DevOps</option>
        </select>
      </div>

      <div style={fieldGroupStyles}>
        <label style={labelStyles} htmlFor="level">
          Nivel de dominio: {formData.level}/10
        </label>
        <input
          type="range"
          id="level"
          name="level"
          min="1"
          max="10"
          value={formData.level}
          onChange={handleInputChange}
          style={rangeStyles}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          <span>Principiante</span>
          <span>Intermedio</span>
          <span>Avanzado</span>
          <span>Experto</span>
        </div>
      </div>

      <div style={fieldGroupStyles}>
        <label style={labelStyles}>
          Imagen de la habilidad
        </label>
        <ImageUpload
          onImageSelect={handleImageSelect}
          currentImage={formData.image}
          category="skills"
          acceptedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
          maxSizeKB={2048} // 2MB para habilidades
        />
        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
          Sube una imagen representativa de la habilidad (logo, icono, etc.)
        </p>
      </div>

      <div style={fieldGroupStyles}>
        <label style={labelStyles} htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          style={textareaStyles}
          placeholder="Describe tu experiencia con esta habilidad, proyectos realizados, etc."
          rows={4}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={secondaryButtonStyles}
          disabled={uploading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          style={primaryButtonStyles}
          disabled={uploading || !formData.name || !formData.category}
        >
          {uploading ? 'Guardando...' : initialData?.id ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  )
}

export default SkillForm
