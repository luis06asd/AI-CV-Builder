import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Printer,
  ShieldCheck,
  ArrowRight,
  Layout,
  Cpu,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* NAVBAR */}
      <nav className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-30 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <FileText size={20} />
          </div>
          <span className="font-extrabold text-slate-900 text-lg tracking-tight">
            AI CV <span className="text-blue-600">Builder</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm hover:shadow transition"
          >
            <span>Crear mi CV</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative py-16 sm:py-24 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full mb-6">
          <Sparkles size={14} className="text-blue-600" />
          <span>El creador de hojas de vida moderno y optimizado para ATS</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Crea un Currículum que <br className="hidden sm:inline" />
          <span className="text-blue-600">consiga entrevistas</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          Diseña tu hoja de vida profesional en minutos con vista previa en tiempo real,
          plantillas modernas aprobadas por reclutadores y exportación impecable a PDF.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition active:scale-95"
          >
            <span>Comenzar Ahora Gratis</span>
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Badges de confianza */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>100% Formato ATS Friendly</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Sin Registro Requerido</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Exportación A4 Vectorial</span>
          </div>
        </div>
      </header>

      {/* CARACTERÍSTICAS PRINCIPALES */}
      <section className="py-16 bg-white border-y border-slate-200 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Todo lo que necesitas para destacar ante los reclutadores
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Diseñado con arquitectura sólida y buenas prácticas de selección de talento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Layout size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Editor y Previsualización en Vivo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada cambio que haces en tus datos personales, experiencia o educación se refleja de inmediato en una hoja A4 real.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Cpu size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Diseñado para Asistencia con IA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estructura preparada para mejorar tus descripciones, viñetas y adaptar tu CV a ofertas laborales sin inventar información.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <Printer size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Exportación PDF Profesional</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Genera archivos PDF vectoriales con texto 100% seleccionable e indexable, garantizando la aprobación de los filtros ATS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <ShieldCheck size={36} className="mx-auto text-blue-200 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Tu próximo paso profesional comienza aquí
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Sin costos ocultos ni suscripciones sorpresa. Diseña, personaliza y descarga tu currículum hoy mismo.
          </p>
          <div className="mt-6">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm rounded-xl shadow transition"
            >
              <span>Abrir Creador de CV</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} AI CV Builder. Desarrollado con React, TypeScript y Tailwind CSS.</p>
      </footer>
    </div>
  );
};
