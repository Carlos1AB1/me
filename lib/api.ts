// lib/api.ts
// Configuración y utilidades para conectar el frontend Next.js con el backend Django

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Tipos para la respuesta de autenticación
interface AuthTokens {
  access: string;
  refresh: string;
}

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
}

// Función para obtener el token del localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

// Función para guardar tokens
const saveTokens = (tokens: AuthTokens): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }
};

// Función para limpiar tokens
const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

// Cliente API base
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Métodos de autenticación
  async login(email: string, password: string): Promise<AuthTokens> {
    const response = await this.request<AuthTokens>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    saveTokens(response);
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<User> {
    return this.request<User>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout/', { method: 'POST' });
    } finally {
      clearTokens();
    }
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/auth/profile/');
  }

  // Métodos para proyectos
  async getProjects(): Promise<any[]> {
    return this.request<any[]>('/projects/');
  }

  async getFeaturedProjects(): Promise<any[]> {
    return this.request<any[]>('/projects/featured/');
  }

  async getProject(id: number): Promise<any> {
    return this.request<any>(`/projects/${id}/`);
  }

  // Métodos para habilidades
  async getSkills(): Promise<any[]> {
    return this.request<any[]>('/skills/');
  }

  async getSkillCategories(): Promise<any[]> {
    return this.request<any[]>('/skills/categories/');
  }

  async getFeaturedSkills(): Promise<any[]> {
    return this.request<any[]>('/skills/featured/');
  }

  // Métodos para servicios
  async getServices(): Promise<any[]> {
    return this.request<any[]>('/services/');
  }

  async getFeaturedServices(): Promise<any[]> {
    return this.request<any[]>('/services/featured/');
  }

  async getService(id: number): Promise<any> {
    return this.request<any>(`/services/${id}/`);
  }

  async getServicesByCategory(): Promise<any[]> {
    return this.request<any[]>('/services/by_category/');
  }

  async getServiceCategories(): Promise<any[]> {
    return this.request<any[]>('/services/categories/');
  }

  // Métodos para blog
  async getBlogPosts(): Promise<any[]> {
    return this.request<any[]>('/blog/');
  }

  async getFeaturedPosts(): Promise<any[]> {
    return this.request<any[]>('/blog/featured/');
  }

  async getRecentPosts(): Promise<any[]> {
    return this.request<any[]>('/blog/recent/');
  }

  async getBlogPost(id: number): Promise<any> {
    return this.request<any>(`/blog/${id}/`);
  }

  async getBlogCategories(): Promise<any[]> {
    return this.request<any[]>('/blog/categories/');
  }

  // Método para contacto
  async sendContactMessage(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<any> {
    return this.request<any>('/contact/send/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Health check
  async healthCheck(): Promise<any> {
    return this.request<any>('/core/health/');
  }

  // Métodos para subida de imágenes
  async uploadImage(file: File, category: string = 'general'): Promise<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);

    const token = getToken();
    const response = await fetch(`${this.baseURL}/core/images/upload/`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async uploadMultipleImages(files: File[], category: string = 'general'): Promise<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    formData.append('category', category);

    const token = getToken();
    const response = await fetch(`${this.baseURL}/core/images/upload-multiple/`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getImages(category?: string): Promise<any> {
    const queryParams = category ? `?category=${category}` : '';
    return this.request<any>(`/core/images/${queryParams}`);
  }

  async deleteImage(filePath: string): Promise<any> {
    const encodedPath = encodeURIComponent(filePath);
    return this.request<any>(`/core/images/delete/${encodedPath}/`, {
      method: 'DELETE',
    });
  }
}

// Instancia singleton del cliente API
const apiClient = new ApiClient(API_BASE_URL);

export default apiClient;
export { saveTokens, clearTokens, getToken };
export type { User, AuthTokens };
