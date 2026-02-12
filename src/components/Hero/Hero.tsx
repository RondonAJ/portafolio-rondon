'use client';

import Link from 'next/link';
import { HeroEffect3D } from '@/src/components/HeroEffect3D';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 animate-fade-in relative overflow-hidden"
    >
      {/* 3D Effect - Background with depth simulation */}
      <HeroEffect3D />

      {/* Content - z-index higher to stay on top */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Saludo inicial */}
        <div className="mb-6">
          <span className="text-cyan font-mono text-sm sm:text-base">
            Hola, mi nombre es
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-slide-up">
          Jesús Rondón
        </h1>

        {/* Subtitle Grande */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-white/90 animate-slide-up">
          Ingeniero de Sistemas & Estratega de Autoridad Digital
        </h2>

        {/* Descripción */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up">
          Especializado en sistemas críticos (CMPC), arquitecturas de microservicios
          y posicionamiento estratégico en la era de la IA. Construyo tecnología que
          resuelve problemas y aseguro que el mundo la encuentre.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up">
          {/* Botón Ver Experiencia */}
          <Link
            href="#experience"
            className="px-8 py-3 sm:px-10 sm:py-4 bg-cyan text-deep-blue font-semibold rounded-lg hover:bg-cyan-dark transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
          >
            Ver Experiencia
          </Link>

          {/* Botón WhatsApp */}
         {/*<a
            href="https://wa.me/56XXXXXXXXX?text=Hola!%20Me%20interesa%20conocer%20m%C3%A1s%20sobre%20tus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 sm:px-10 sm:py-4 border-2 border-cyan text-cyan font-semibold rounded-lg hover:bg-cyan hover:text-deep-blue transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
          >
            Hablemos por WhatsApp
          </a>*/}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-20 animate-bounce">
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-cyan"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
