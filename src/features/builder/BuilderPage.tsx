import React, { useState } from 'react';
import { BuilderHeader } from './components/BuilderHeader';
import { SectionNav } from './components/SectionNav';
import { SectionContent } from './components/SectionContent';
import { LivePreview } from '../preview/LivePreview';
import { TemplateRenderer } from '../templates/components/TemplateRenderer';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { Edit3, Eye } from 'lucide-react';

export const BuilderPage: React.FC = () => {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const cv = useCVStore((state) => state.cv);
  const selectedTemplateId = useUIStore((state) => state.selectedTemplateId);
  const themeConfig = useUIStore((state) => state.themeConfig);

  return (
    <>
      {/* INTERFAZ INTERACTIVA (Se oculta por completo durante la impresión) */}
      <div className="no-print flex flex-col h-screen overflow-hidden bg-slate-50">
        <BuilderHeader />

        {/* Switcher para móviles (oculto en pantallas md y superiores) */}
        <div className="md:hidden flex border-b border-slate-200 bg-white shrink-0">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              mobileView === 'editor'
                ? 'border-blue-600 text-blue-600 bg-blue-50/30'
                : 'border-transparent text-slate-500'
            }`}
          >
            <Edit3 size={14} /> Editar Formulario
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition ${
              mobileView === 'preview'
                ? 'border-blue-600 text-blue-600 bg-blue-50/30'
                : 'border-transparent text-slate-500'
            }`}
          >
            <Eye size={14} /> Vista Previa A4
          </button>
        </div>

        {/* Split Screen Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* PANEL IZQUIERDO: FORMULARIO */}
          <section
            className={`w-full md:w-1/2 lg:w-5/12 xl:w-5/12 flex flex-col bg-white border-r border-slate-200 ${
              mobileView === 'editor' ? 'flex' : 'hidden md:flex'
            }`}
          >
            <SectionNav />
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <SectionContent />
            </div>
          </section>

          {/* PANEL DERECHO: VISTA PREVIA A4 INTERACTIVA */}
          <section
            className={`flex-1 flex flex-col ${
              mobileView === 'preview' ? 'flex' : 'hidden md:flex'
            }`}
          >
            <LivePreview />
          </section>
        </div>
      </div>

      {/* ÁREA EXCLUSIVA DE IMPRESIÓN (Visible ÚNICAMENTE en window.print / PDF) */}
      {/* Está situada fuera de los contenedores overflow-hidden y h-screen para garantizar paginación perfecta */}
      <div id="cv-print-area" className="hidden print:block">
        <TemplateRenderer
          data={cv}
          theme={themeConfig}
          templateId={selectedTemplateId}
          isPrintMode={true}
        />
      </div>
    </>
  );
};
