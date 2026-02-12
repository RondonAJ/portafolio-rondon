'use client';

import { AnimatedSection, AnimatedDiv } from '@/src/components/AnimatedSection';
import { AnimatedContainer, AnimatedItem } from '@/src/components/AnimatedContainer';

export default function About() {
  const skills = [
    'React / Next.js',
    'TypeScript',
    'NestJS',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'GCP',
    'AWS',
    'Docker',
    'Kubernetes',
    'GraphQL',
    'REST APIs',
    'Tailwind CSS',
    'Git',
    'CI/CD',
    'Microservicios',
  ];

  return (
    <AnimatedSection
      id="about"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-deep-blue"
    >
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="mb-12 animate-slide-up">
          <span className="text-cyan font-mono text-sm">Conexión Humana</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            Más allá del código
          </h2>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Texto */}
          <div className="animate-slide-up">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
              Como desarrollador Full Stack con experiencia en sistemas críticos,
              entiendo que la tecnología debe ser una inversión, no un gasto. Mi
              enfoque combina el rigor de la ingeniería corporativa con la agilidad
              que las Pymes necesitan para competir.
            </p>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">
              Mi objetivo es que cada línea de código que escribo te ahorre tiempo o
              te genere más ingresos. Creo en soluciones escalables, mantenibles y
              orientadas a resultados reales.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-cyan text-cyan hover:bg-cyan hover:text-deep-blue transition-all duration-300 rounded-lg font-semibold"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-cyan text-cyan hover:bg-cyan hover:text-deep-blue transition-all duration-300 rounded-lg font-semibold"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Skills */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-white mb-6">Stack Técnico</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm rounded-full bg-cyan/10 text-cyan border border-cyan/30 hover:border-cyan hover:bg-cyan/20 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <AnimatedContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-16" staggerDelay={0.08}>
          {[
            { label: 'Años de Experiencia', value: '3+' },
            { label: 'Proyectos Completados', value: '15+' },
            { label: 'Clientes Satisfechos', value: '10+' },
            { label: 'Tecnologías', value: '20+' },
          ].map((stat, index) => (
            <AnimatedItem
              key={index}
              className="text-center p-4 sm:p-6 bg-deep-blue-lighter rounded-xl border border-cyan/20 hover:border-cyan transition-all duration-300"
            >
              <p className="text-2xl sm:text-3xl font-bold text-cyan mb-2">
                {stat.value}
              </p>
              <p className="text-white/70 text-xs sm:text-sm">{stat.label}</p>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      </div>
    </AnimatedSection>
  );
}
