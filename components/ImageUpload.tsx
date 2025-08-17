'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  currentImage?: string
  category?: string
  acceptedTypes?: string[]
  maxSizeKB?: number
  style?: React.CSSProperties
}

const ImageUpload = ({
  onImageSelect,
  currentImage,
  category = 'general',
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSizeKB = 5120, // 5MB por defecto
  style = {}
}: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `Tipo de archivo no válido. Solo se permiten: ${acceptedTypes.join(', ')}`
    }
    
    if (file.size > maxSizeKB * 1024) {
      return `El archivo es muy grande. Máximo permitido: ${maxSizeKB / 1024}MB`
    }
    
    return null
  }

  const handleFile = (file: File) => {
    setError(null)
    
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    // Crear preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Llamar callback del padre
    onImageSelect(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const baseStyles: React.CSSProperties = {
    width: '100%',
    ...style
  }

  const dropZoneStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '250px',
    border: `2px dashed ${dragActive ? '#3b82f6' : '#d1d5db'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: dragActive ? '#eff6ff' : '#fafafa',
    color: 'var(--text-secondary)'
  }

  const previewStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '250px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    overflow: 'hidden'
  }

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  }

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease'
  }

  const buttonStyles: React.CSSProperties = {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '8px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const errorStyles: React.CSSProperties = {
    marginTop: '8px',
    padding: '12px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '6px',
    color: '#dc2626',
    fontSize: '14px'
  }

  return (
    <div style={baseStyles}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      
      {preview ? (
        <div style={{ position: 'relative' }}>
          <div 
            style={previewStyles}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement
              if (overlay) overlay.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement
              if (overlay) overlay.style.opacity = '0'
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={imageStyles}
            />
            <div className="overlay" style={overlayStyles}>
              <button
                onClick={removeImage}
                style={buttonStyles}
                type="button"
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--text-secondary)', 
            marginTop: '8px', 
            textAlign: 'center' 
          }}>
            Imagen seleccionada. Pasa el mouse por encima para cambiar.
          </p>
        </div>
      ) : (
        <div
          style={dropZoneStyles}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
          onMouseOver={(e) => {
            if (!dragActive) {
              e.currentTarget.style.borderColor = '#9ca3af'
              e.currentTarget.style.backgroundColor = '#f9fafb'
            }
          }}
          onMouseOut={(e) => {
            if (!dragActive) {
              e.currentTarget.style.borderColor = '#d1d5db'
              e.currentTarget.style.backgroundColor = '#fafafa'
            }
          }}
        >
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Loader style={{ 
                animation: 'spin 1s linear infinite', 
                height: '48px', 
                width: '48px', 
                color: '#3b82f6', 
                marginBottom: '16px' 
              }} />
              <p style={{ color: 'var(--text-secondary)' }}>Subiendo imagen...</p>
            </div>
          ) : (
            <>
              <ImageIcon style={{ 
                height: '48px', 
                width: '48px', 
                color: '#9ca3af', 
                marginBottom: '16px' 
              }} />
              <p style={{ 
                fontSize: '18px', 
                fontWeight: '500', 
                color: 'var(--text-primary)', 
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Subir imagen
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: 'var(--text-secondary)', 
                textAlign: 'center',
                marginBottom: '8px'
              }}>
                Arrastra y suelta una imagen aquí, o haz clic para seleccionar
              </p>
              <p style={{ 
                fontSize: '12px', 
                color: '#9ca3af' 
              }}>
                Máximo {maxSizeKB / 1024}MB • {acceptedTypes.join(', ').replace(/image\//g, '').toUpperCase()}
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <div style={errorStyles}>
          {error}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
