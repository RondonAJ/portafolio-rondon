import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  token: string;
}

interface ReCAPTCHAResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

// Validar reCAPTCHA token
async function validateRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data: ReCAPTCHAResponse = await response.json();

    // Validar que sea exitoso y tenga un score > 0.5
    return data.success && data.score > 0.5;
  } catch (error) {
    console.error('Error validating reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validar campos requeridos
    if (!body.name || !body.email || !body.message || !body.token) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar reCAPTCHA
    const isValidRecaptcha = await validateRecaptcha(body.token);
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { error: 'Validación de reCAPTCHA fallida. Por favor intenta de nuevo.' },
        { status: 403 }
      );
    }

    // Enviar email con Resend
    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', // Email verificado de Resend (para pruebas)
      to: process.env.CONTACT_EMAIL || 'tu_email@ejemplo.com',
      replyTo: body.email,
      subject: `Nuevo mensaje de contacto de ${body.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
          <div style="background: linear-gradient(135deg, #0A192F 0%, #112240 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #64FFDA; margin: 0; font-size: 28px;">✉️ Nuevo Mensaje</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 40px 20px; border: 1px solid #e5e7eb;">
            <h2 style="color: #1f2937; margin-top: 0; margin-bottom: 24px; font-size: 20px;">Información del contacto</h2>
            
            <div style="margin-bottom: 20px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; font-weight: 600;">Nombre</p>
              <p style="color: #1f2937; margin: 0; font-size: 16px; font-weight: 500;">${escapeHtml(body.name)}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; font-weight: 600;">Email</p>
              <p style="color: #0a7ba7; margin: 0; font-size: 16px;">
                <a href="mailto:${escapeHtml(body.email)}" style="color: #0a7ba7; text-decoration: none;">${escapeHtml(body.email)}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; font-weight: 600;">Asunto</p>
              <p style="color: #1f2937; margin: 0; font-size: 16px; font-weight: 500;">${escapeHtml(body.subject)}</p>
            </div>
            
            <div style="margin-bottom: 0;">
              <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; font-weight: 600;">Mensaje</p>
              <div style="background-color: #f3f4f6; border-left: 4px solid #64FFDA; padding: 16px; border-radius: 4px;">
                <p style="color: #1f2937; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(body.message)}</p>
              </div>
            </div>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Este email fue enviado desde tu <a href="#" style="color: #64FFDA; text-decoration: none;">portafolio web</a>
            </p>
            <p style="color: #d1d5db; font-size: 11px; margin: 12px 0 0 0;">
              © 2026 Rondón. Todos los derechos reservados.
            </p>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error('Error sending email:', emailResponse.error);
      return NextResponse.json(
        { error: 'Error al enviar el mensaje. Por favor intenta más tarde.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado exitosamente. Te responderé pronto.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Helper para escapar HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
