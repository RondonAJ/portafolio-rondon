'use client';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: 'Desarrollo Full Stack & Cloud',
    description:
      'Creación de sistemas escalables con NestJS, React y GCP. Arquitecturas preparadas para el crecimiento y la eficiencia operativa.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: 'Autoridad Digital & IA',
    description:
      'Posicionamiento estratégico para dominar los resúmenes de IA de Google y búsqueda orgánica. Gestión de reputación y perfiles de autoridad.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'E-commerce & Automatización',
    description:
      'Tiendas de alto rendimiento en PrestaShop/WordPress y automatización de procesos internos para eliminar tareas manuales.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-deep-blue-lighter/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="text-cyan font-mono text-sm">Áreas de Especialidad</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            Servicios
          </h2>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Soluciones integrales para empresas que buscan crecer de forma sostenible
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-deep-blue border border-cyan/20 rounded-xl p-6 sm:p-8 hover:border-cyan transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan/20 animate-slide-up"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Icono */}
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-cyan/10 text-cyan mb-4 group-hover:bg-cyan group-hover:text-deep-blue transition-all duration-300">
                {service.icon}
              </div>

              {/* Título */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>

              {/* Descripción */}
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>

              {/* Línea decorativa */}
              <div className="h-1 w-0 bg-cyan rounded-full mt-6 group-hover:w-8 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
