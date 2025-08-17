// components/ApiExample.tsx
// Ejemplo de cómo usar el cliente API con el backend Django

'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github_url: string;
  live_url: string;
  is_featured: boolean;
  created_at: string;
}

interface Skill {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
  level: string;
  years_experience: number;
  percentage: number;
  description: string;
  icon: string;
}

const ApiExample = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar proyectos destacados
        const featuredProjects = await apiClient.getFeaturedProjects();
        setProjects(featuredProjects);

        // Cargar habilidades destacadas
        const featuredSkills = await apiClient.getFeaturedSkills();
        setSkills(featuredSkills);

      } catch (err) {
        setError('Error al cargar los datos del backend');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactSubmit = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    try {
      await apiClient.sendContactMessage(formData);
      alert('Mensaje enviado correctamente');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Error al enviar el mensaje');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Sección de Proyectos */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Proyectos Destacados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              
              {/* Tecnologías */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Enlaces */}
              <div className="flex gap-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    GitHub
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Habilidades */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Habilidades Destacadas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-3">
                {skill.icon && (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-8 h-8 mr-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </div>
              
              <p className="text-sm text-gray-500 mb-2">{skill.category.name}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{skill.description}</p>
              
              {/* Nivel */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Nivel: {skill.level}</span>
                  <span>{skill.years_experience} años</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ejemplo de formulario de contacto */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Contacto</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleContactSubmit({
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              subject: formData.get('subject') as string,
              message: formData.get('message') as string,
            });
          }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Asunto</label>
            <input
              type="text"
              name="subject"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Enviar Mensaje
          </button>
        </form>
      </section>
    </div>
  );
};

export default ApiExample;
