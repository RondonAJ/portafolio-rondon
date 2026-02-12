'use client';

import { AnimatedSection } from '@/src/components/AnimatedSection';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Full Stack Developer',
    company: 'CMPC - Gesfire',
    period: 'Enero 2024 — Presente',
    achievements: [
      'Desarrollo de sistemas críticos para la prevención y combate de incendios forestales',
      'Investigación y desarrollo de herramientas sobre datos satelitales para detectar puntos calientes con horas de antelación',
      'Implementación de microservicios con NestJS (v11), utilizando patrones CQRS y DDD para escalabilidad',
      'Desarrollo de interfaces GIS de alta precisión con React y Leaflet, integrando ArcGIS',
      'Automatización de flujos de trabajo internos, reduciendo procesos de horas a segundos',
    ],
  },
];

export default function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-deep-blue"
    >
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="mb-16 animate-slide-up">
          <span className="text-cyan font-mono text-sm">Trayectoria</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            Experiencia Profesional
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan to-cyan/20" />

          {/* Items de experiencia */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="md:pl-24 animate-slide-up"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {/* Dot en la línea */}
                <div className="hidden md:block absolute left-0 top-4 w-16 h-16 flex items-center justify-center">
                  <div className="w-4 h-4 bg-cyan rounded-full border-4 border-deep-blue" />
                </div>

                {/* Card de experiencia */}
                <div className="bg-deep-blue-lighter border border-cyan/20 rounded-xl p-6 sm:p-8 hover:border-cyan transition-all duration-300">
                  {/* Encabezado */}
                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-cyan font-semibold mt-2">{exp.company}</p>
                    <p className="text-white/60 text-sm mt-1 font-mono">{exp.period}</p>
                  </div>

                  {/* Logros */}
                  <ul className="space-y-3 mt-6">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80">
                        <span className="text-cyan font-bold mt-1">›</span>
                        <span className="text-sm sm:text-base">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
