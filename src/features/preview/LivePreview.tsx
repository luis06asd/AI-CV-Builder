import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { useUIStore } from '../../store/uiStore';
import { A4PageContainer } from './components/A4PageContainer';
import { TemplateRenderer } from '../templates/components/TemplateRenderer';

export const LivePreview: React.FC = () => {
  const cv = useCVStore((state) => state.cv);
  const selectedTemplateId = useUIStore((state) => state.selectedTemplateId);
  const themeConfig = useUIStore((state) => state.themeConfig);
  const previewZoom = useUIStore((state) => state.previewZoom);
  const setPreviewZoom = useUIStore((state) => state.setPreviewZoom);

  const handleZoomIn = () => {
    setPreviewZoom(Math.min(1.2, Number((previewZoom + 0.1).toFixed(2))));
  };

  const handleZoomOut = () => {
    setPreviewZoom(Math.max(0.5, Number((previewZoom - 0.1).toFixed(2))));
  };

  const handleZoomReset = () => {
    setPreviewZoom(0.85);
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/70 border-l border-slate-200">
      {/* Barra de herramientas superior del Preview */}
      <div className="no-print h-12 bg-white/90 backdrop-blur border-b border-slate-200 px-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Vista Previa A4
          </span>
          <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
            210 × 297 mm
          </span>
        </div>

        {/* Controles de Zoom */}
        <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
          <button
            onClick={handleZoomOut}
            title="Reducir zoom"
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
          >
            <ZoomOut size={15} />
          </button>
          <span className="text-xs font-mono font-medium text-slate-700 min-w-[42px] text-center">
            {Math.round(previewZoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            title="Aumentar zoom"
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition"
          >
            <ZoomIn size={15} />
          </button>
          <button
            onClick={handleZoomReset}
            title="Ajustar tamaño óptimo"
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition ml-1"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Área del lienzo A4 con scroll suave */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center items-start">
        <A4PageContainer zoom={previewZoom}>
          <TemplateRenderer
            data={cv}
            theme={themeConfig}
            templateId={selectedTemplateId}
          />
        </A4PageContainer>
      </div>
    </div>
  );
};
