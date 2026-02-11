'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

export default function Contact() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    success: false,
    error: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ isLoading: true, success: false, error: null });

    try {
      // Obtener token de reCAPTCHA
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA no está disponible');
      }

      const token = await executeRecaptcha('contact_form');

      // Hacer fetch a la API de contacto
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      // Éxito
      setFormState({
        isLoading: false,
        success: true,
        error: null,
      });

      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setFormState({ isLoading: false, success: false, error: null });
      }, 5000);
    } catch (error) {
      setFormState({
        isLoading: false,
        success: false,
        error:
          error instanceof Error ? error.message : 'Error al enviar el formulario',
      });
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12 animate-slide-up">
          <span className="text-cyan font-mono text-sm">Próximos Pasos</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
            ¿Listo para optimizar tu presencia digital?
          </h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Ya sea que necesites un ingeniero para un proyecto complejo de software
            o quieras que tu marca domine los resultados de búsqueda, conversemos.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-deep-blue-lighter border border-cyan/20 rounded-xl p-6 sm:p-8 animate-slide-up">
          {/* Mensaje de éxito */}
          {formState.success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg animate-slide-up">
              <p className="text-green-400 font-semibold">
                ✓ Mensaje enviado exitosamente. Te responderé pronto.
              </p>
            </div>
          )}

          {/* Mensaje de error */}
          {formState.error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg animate-slide-up">
              <p className="text-red-400 font-semibold">✗ {formState.error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-white mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={formState.isLoading}
                className="w-full px-4 py-3 bg-deep-blue border border-cyan/30 text-white rounded-lg focus:outline-none focus:border-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tu nombre completo"
              />
            </div>

            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={formState.isLoading}
                className="w-full px-4 py-3 bg-deep-blue border border-cyan/30 text-white rounded-lg focus:outline-none focus:border-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="tu@email.com"
              />
            </div>

            {/* Campo Asunto */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-white mb-2"
              >
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={formState.isLoading}
                className="w-full px-4 py-3 bg-deep-blue border border-cyan/30 text-white rounded-lg focus:outline-none focus:border-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Ej: Consulta sobre desarrollo Full Stack"
              />
            </div>

            {/* Campo Mensaje */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-white mb-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={formState.isLoading}
                rows={5}
                className="w-full px-4 py-3 bg-deep-blue border border-cyan/30 text-white rounded-lg focus:outline-none focus:border-cyan transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Cuéntame sobre tu proyecto o pregunta..."
              />
            </div>

            {/* Botón Enviar */}
            <button
              type="submit"
              disabled={formState.isLoading}
              className="w-full py-3 sm:py-4 bg-cyan text-deep-blue font-bold rounded-lg border-2 border-cyan hover:bg-cyan-dark hover:border-cyan-dark transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-cyan/50"
            >
              {formState.isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <span>✓</span>
                  Enviar Mensaje
                </>
              )}
            </button>

            {/* Nota de privacidad */}
            <p className="text-xs sm:text-sm text-white/50 text-center">
              Este sitio está protegido por reCAPTCHA y se aplican la{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                Política de Privacidad
              </a>{' '}
              y los{' '}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                Términos de Servicio
              </a>{' '}
              de Google.
            </p>
          </form>
        </div>

        {/* Alternativa WhatsApp */}
        <div className="mt-8 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-white/70 mb-4">O preferiblemente:</p>
          <a
            href="https://wa.me/56XXXXXXXXX?text=Hola!%20Me%20interesa%20conocer%20m%C3%A1s%20sobre%20tus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-cyan text-cyan hover:bg-cyan hover:text-deep-blue transition-all duration-300 rounded-lg font-semibold"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006a9.87 9.87 0 00-4.255.949 9.876 9.876 0 006.254 16.236c1.394 0 2.74-.356 3.97-1.025l.064-.027 4.076 1.067-.975-3.72.04-.064a9.864 9.864 0 001.905-5.931c0-5.44-4.43-9.86-9.885-9.86" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
