import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReCaptchaProvider } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rondón - Ingeniero de Software & Estratega Digital",
  description: "Portafolio profesional de Rondón. Especializado en sistemas críticos, arquitecturas de microservicios y autoridad digital.",
  keywords: "software engineer, full stack developer, nextjs, react, typescript",
  authors: [{ name: "Rondón" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReCaptchaProvider>
          {children}
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
