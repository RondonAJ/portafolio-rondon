'use client';

import { AnimatedSection, AnimatedDiv } from '@/src/components/AnimatedSection';
import { AnimatedContainer, AnimatedItem } from '@/src/components/AnimatedContainer';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  result?: string;
}

const projects: Project[] = [
  {
    title: 'Sistema de Inteligencia Geoespacial (CMPC)',
    description:
      'Plataforma para la gestión de incidentes forestales con visualización de datos satelitales en tiempo real.',
    technologies: ['React', 'NestJS', 'PostgreSQL', 'ArcGIS', 'GCP'],
    result: 'Reducción del tiempo de respuesta en prevención de incendios',
  },
  {
    title: 'Estrategia de Autoridad Digital (IA & SEO)',
    description:
      'Posicionamiento de figuras públicas en resúmenes de IA de Google y gestión de perfiles en Wikipedia.',
    technologies: ['SEO', 'IA', 'Content Strategy', 'Wikipedia'],
    result: 'Dominio total de la primera página de búsqueda y protección de marca',
  },
  {
    title: 'E-commerce de Alto Rendimiento',
    description:
      'Tienda online optimizada para carga ultra rápida y conversión con integración de pagos.',
    technologies: ['PrestaShop', 'WordPress', 'Webpay', 'Flow', 'Analytics'],
    result: 'Reducción de tasa de rebote en 40% e integración total de pagos',
  },
];

export default function Projects() {
  return (
    <AnimatedSection
      id="projects"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-deep-blue-lighter/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="text-cyan font-mono text-sm">Portafolio</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            Proyectos Destacados
          </h2>
          <p className="text-white/70 mt-4">Casos de éxito que demuestran capacidad</p>
        </div>

        {/* Grid de proyectos */}
        <AnimatedContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" staggerDelay={0.1}>
          {projects.map((project, index) => (
            <AnimatedItem
              key={index}
              className="group bg-deep-blue border border-cyan/20 rounded-xl overflow-hidden hover:border-cyan transition-all duration-300 hover:shadow-lg hover:shadow-cyan/20"
            >
              {/* Contenido */}
              <div className="p-6 sm:p-8">
                {/* Título */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan transition-colors">
                  {project.title}
                </h3>

                {/* Descripción */}
                <p className="text-white/70 text-sm sm:text-base mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Resultado */}
                {project.result && (
                  <div className="mb-4 p-3 sm:p-4 bg-cyan/10 border border-cyan/30 rounded-lg">
                    <p className="text-cyan text-xs sm:text-sm font-semibold">
                      💡 {project.result}
                    </p>
                  </div>
                )}

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs sm:text-sm rounded-full bg-cyan/10 text-cyan border border-cyan/30 hover:bg-cyan/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      </div>
    </AnimatedSection>
  );
}
