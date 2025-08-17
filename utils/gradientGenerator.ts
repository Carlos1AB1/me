// utils/gradientGenerator.ts
// Generador de degradados dinámicos para los íconos del portfolio

export interface GradientConfig {
  baseColor: string
  gradientType: string
}

// Función para generar un color más claro u oscuro
function adjustBrightness(hex: string, percent: number): string {
  // Validar que hex sea un string válido
  if (!hex || typeof hex !== 'string') {
    hex = '#74b9ff' // Color por defecto
  }
  
  // Remover el # si existe
  hex = hex.replace('#', '')
  
  // Validar que sea un color hexadecimal válido
  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
    hex = '74b9ff' // Color por defecto sin #
  }
  
  // Convertir a RGB
  const num = parseInt(hex, 16)
  const r = (num >> 16) + percent
  const g = (num >> 8 & 0x00FF) + percent
  const b = (num & 0x0000FF) + percent
  
  // Asegurar que los valores estén en el rango 0-255
  const newR = Math.max(0, Math.min(255, r))
  const newG = Math.max(0, Math.min(255, g))
  const newB = Math.max(0, Math.min(255, b))
  
  return '#' + ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0')
}

// Función para generar colores complementarios
function generateComplementaryColors(baseColor: string) {
  const lighter = adjustBrightness(baseColor, 40)
  const darker = adjustBrightness(baseColor, -30)
  const muchLighter = adjustBrightness(baseColor, 80)
  const muchDarker = adjustBrightness(baseColor, -60)
  
  return {
    base: baseColor,
    lighter,
    darker,
    muchLighter,
    muchDarker
  }
}

// Función principal para generar degradados
export function generateGradient(config: GradientConfig): string {
  const { baseColor, gradientType } = config
  
  // Validar que baseColor sea válido
  const validColor = baseColor && typeof baseColor === 'string' ? baseColor : '#74b9ff'
  const validGradientType = gradientType && typeof gradientType === 'string' ? gradientType : 'linear-diagonal-1'
  
  const colors = generateComplementaryColors(validColor)
  
  switch (validGradientType) {
    case 'linear-left':
      return `linear-gradient(90deg, ${colors.base} 0%, ${colors.lighter} 100%)`
    
    case 'linear-right':
      return `linear-gradient(270deg, ${colors.base} 0%, ${colors.lighter} 100%)`
    
    case 'linear-top':
      return `linear-gradient(180deg, ${colors.base} 0%, ${colors.darker} 100%)`
    
    case 'linear-bottom':
      return `linear-gradient(0deg, ${colors.base} 0%, ${colors.lighter} 100%)`
    
    case 'linear-diagonal-1':
      return `linear-gradient(135deg, ${colors.base} 0%, ${colors.lighter} 50%, ${colors.darker} 100%)`
    
    case 'linear-diagonal-2':
      return `linear-gradient(225deg, ${colors.muchLighter} 0%, ${colors.base} 50%, ${colors.darker} 100%)`
    
    case 'linear-diagonal-3':
      return `linear-gradient(45deg, ${colors.darker} 0%, ${colors.base} 40%, ${colors.muchLighter} 100%)`
    
    case 'linear-diagonal-4':
      return `linear-gradient(315deg, ${colors.base} 0%, ${colors.lighter} 60%, ${colors.muchLighter} 100%)`
    
    case 'radial-center':
      return `radial-gradient(circle at center, ${colors.muchLighter} 0%, ${colors.base} 50%, ${colors.darker} 100%)`
    
    case 'radial-corner':
      return `radial-gradient(circle at top left, ${colors.lighter} 0%, ${colors.base} 40%, ${colors.muchDarker} 100%)`
    
    case 'conic':
      return `conic-gradient(from 0deg at 50% 50%, ${colors.base} 0deg, ${colors.lighter} 60deg, ${colors.muchLighter} 120deg, ${colors.base} 180deg, ${colors.darker} 240deg, ${colors.muchDarker} 300deg, ${colors.base} 360deg)`
    
    case 'solid':
      return colors.base
    
    default:
      // Degradado por defecto con múltiples paradas
      return `linear-gradient(135deg, ${colors.base} 0%, ${colors.lighter} 25%, ${colors.muchLighter} 50%, ${colors.base} 75%, ${colors.darker} 100%)`
  }
}

// Degradados predefinidos especiales para tecnologías populares
export const SPECIAL_GRADIENTS: Record<string, string> = {
  'React': 'linear-gradient(135deg, #61DAFB 0%, #21D4FD 50%, #B721FF 100%)',
  'Next.js': 'linear-gradient(135deg, #000000 0%, #434343 50%, #000000 100%)',
  'TypeScript': 'linear-gradient(135deg, #3178C6 0%, #5B9BD5 50%, #87CEEB 100%)',
  'JavaScript': 'linear-gradient(135deg, #F7DF1E 0%, #FFE135 50%, #FFA500 100%)',
  'Node.js': 'linear-gradient(135deg, #339933 0%, #68BB59 50%, #8FD14F 100%)',
  'Python': 'linear-gradient(135deg, #3776AB 0%, #FFD43B 50%, #306998 100%)',
  'HTML': 'linear-gradient(135deg, #E34F26 0%, #F16529 50%, #FF6B35 100%)',
  'CSS': 'linear-gradient(135deg, #1572B6 0%, #33A9DC 50%, #52C4E8 100%)',
  'Vue.js': 'linear-gradient(135deg, #4FC08D 0%, #42B883 50%, #35495E 100%)',
  'Angular': 'linear-gradient(135deg, #DD0031 0%, #C3002F 50%, #E53E3E 100%)',
  'Firebase': 'linear-gradient(135deg, #FF6F00 0%, #FFA000 50%, #FFB300 100%)',
  'AWS': 'linear-gradient(135deg, #FF9900 0%, #FF7A00 50%, #FF6B00 100%)',
  'Docker': 'linear-gradient(135deg, #2496ED 0%, #0077BE 50%, #003F7F 100%)',
  'Git': 'linear-gradient(135deg, #F05032 0%, #E94E31 50%, #D73027 100%)',
}

// Función para obtener degradado (especial o generado)
export function getSkillGradient(skillName: string, color: string, gradientType: string): string {
  // Validar parámetros de entrada
  const validSkillName = skillName || 'Default'
  const validColor = color && typeof color === 'string' ? color : '#74b9ff'
  const validGradientType = gradientType && typeof gradientType === 'string' ? gradientType : 'linear-diagonal-1'
  
  // Verificar si hay un degradado especial para esta habilidad
  if (SPECIAL_GRADIENTS[validSkillName]) {
    return SPECIAL_GRADIENTS[validSkillName]
  }
  
  // Generar degradado basado en configuración
  return generateGradient({ baseColor: validColor, gradientType: validGradientType })
}
