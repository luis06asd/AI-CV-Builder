import React from 'react';
import { useCVStore } from '../../../store/cvStore';
import { useUIStore } from '../../../store/uiStore';
import { TEMPLATE_LIST } from '../../templates/registry';
import { COLOR_PALETTES } from '../../../config/constants';
import type { TemplateId } from '../../../types/template.types';
import { Palette, Eye, RotateCcw, Sparkles, Check, Columns } from 'lucide-react';

const TemplateMiniPreview: React.FC<{ id: TemplateId; isSelected: boolean }> = ({ id, isSelected }) => {
  switch (id) {
    case 'classic-ats':
      return (
        <div
          className={`w-full h-24 bg-white border ${
            isSelected ? 'border-blue-400' : 'border-slate-200'
          } rounded-lg p-2 flex flex-col gap-1 overflow-hidden shadow-2xs`}
        >
          {/* Cabecera centrada */}
          <div className="flex flex-col items-center gap-0.5 pb-1 border-b border-slate-300">
            <div className="w-16 h-1.5 bg-slate-800 rounded-xs" />
            <div className="w-10 h-1 bg-slate-500 rounded-xs" />
            <div className="w-20 h-0.5 bg-slate-300 rounded-xs" />
          </div>
          {/* Cuerpo 1 columna estricto */}
          <div className="space-y-1 pt-0.5">
            <div className="w-8 h-1 bg-slate-700 rounded-xs border-b border-slate-200" />
            <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
            <div className="w-5/6 h-0.5 bg-slate-200 rounded-xs" />
            <div className="w-10 h-1 bg-slate-700 rounded-xs mt-1" />
            <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
            <div className="w-4/6 h-0.5 bg-slate-200 rounded-xs" />
          </div>
        </div>
      );

    case 'executive':
      return (
        <div
          className={`w-full h-24 bg-white border ${
            isSelected ? 'border-blue-400' : 'border-slate-200'
          } rounded-lg overflow-hidden shadow-2xs flex flex-col`}
        >
          {/* Banner superior con foto */}
          <div className="h-7 bg-slate-900 px-2 flex items-center gap-1.5 shrink-0">
            <div className="w-3.5 h-3.5 rounded bg-white/80 shrink-0" />
            <div className="space-y-0.5">
              <div className="w-14 h-1.5 bg-white rounded-xs" />
              <div className="w-8 h-0.5 bg-white/60 rounded-xs" />
            </div>
          </div>
          {/* 2 Columnas asimétricas */}
          <div className="flex-1 p-1.5 grid grid-cols-12 gap-1 bg-white">
            <div className="col-span-8 space-y-1">
              <div className="w-10 h-1 bg-slate-700 rounded-xs" />
              <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
              <div className="w-5/6 h-0.5 bg-slate-200 rounded-xs" />
            </div>
            <div className="col-span-4 bg-slate-50 p-1 rounded space-y-1 border border-slate-100">
              <div className="w-6 h-1 bg-slate-500 rounded-xs" />
              <div className="w-full h-0.5 bg-slate-300 rounded-xs" />
              <div className="w-4/5 h-0.5 bg-slate-300 rounded-xs" />
            </div>
          </div>
        </div>
      );

    case 'minimalist':
      return (
        <div
          className={`w-full h-24 bg-white border ${
            isSelected ? 'border-blue-400' : 'border-slate-200'
          } rounded-lg p-2 flex flex-col gap-1 overflow-hidden shadow-2xs`}
        >
          {/* Cabecera sutil con espacio en blanco */}
          <div className="flex justify-between items-start pb-1">
            <div className="space-y-0.5">
              <div className="w-14 h-2 bg-slate-900 rounded-xs" />
              <div className="w-8 h-0.5 bg-slate-400 rounded-xs" />
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-slate-200 shrink-0" />
          </div>
          {/* Disposición asimétrica editorial */}
          <div className="grid grid-cols-12 gap-1 pt-1">
            <div className="col-span-4 space-y-0.5">
              <div className="w-6 h-0.5 bg-slate-400 rounded-xs" />
              <div className="w-7 h-0.5 bg-slate-400 rounded-xs mt-2" />
            </div>
            <div className="col-span-8 space-y-1">
              <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
              <div className="w-4/5 h-0.5 bg-slate-200 rounded-xs" />
              <div className="w-full h-0.5 bg-slate-200 rounded-xs mt-1" />
            </div>
          </div>
        </div>
      );

    case 'modern-split':
      return (
        <div
          className={`w-full h-24 bg-white border ${
            isSelected ? 'border-blue-400' : 'border-slate-200'
          } rounded-lg overflow-hidden shadow-2xs grid grid-cols-12`}
        >
          {/* Barra lateral oscura */}
          <div className="col-span-4 bg-slate-900 p-1 flex flex-col items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-slate-400 border border-white/60 shrink-0 mt-0.5" />
            <div className="w-8 h-1 bg-white rounded-xs" />
            <div className="w-6 h-0.5 bg-blue-400 rounded-xs" />
            <div className="w-full h-0.5 bg-slate-700 rounded-xs mt-1" />
          </div>
          {/* Columna derecha con timeline */}
          <div className="col-span-8 p-1.5 pl-2 space-y-1">
            <div className="w-12 h-1 bg-slate-800 rounded-xs" />
            <div className="pl-1 border-l border-slate-300 space-y-0.5">
              <div className="w-full h-0.5 bg-slate-300 rounded-xs" />
              <div className="w-4/5 h-0.5 bg-slate-300 rounded-xs" />
              <div className="w-full h-0.5 bg-slate-300 rounded-xs" />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const SettingsSection: React.FC = () => {
  const sectionVisibility = useCVStore((state) => state.cv.sectionVisibility);
  const toggleSectionVisibility = useCVStore((state) => state.toggleSectionVisibility);
  const loadSampleData = useCVStore((state) => state.loadSampleData);
  const resetCV = useCVStore((state) => state.resetCV);

  const selectedTemplateId = useUIStore((state) => state.selectedTemplateId);
  const setSelectedTemplate = useUIStore((state) => state.setSelectedTemplate);
  const themeConfig = useUIStore((state) => state.themeConfig);
  const updateThemeConfig = useUIStore((state) => state.updateThemeConfig);

  const sectionsConfig: { key: keyof typeof sectionVisibility; label: string }[] = [
    { key: 'summary', label: 'Perfil Profesional / Resumen' },
    { key: 'experience', label: 'Experiencia Laboral' },
    { key: 'education', label: 'Educación' },
    { key: 'skills', label: 'Habilidades' },
    { key: 'languages', label: 'Idiomas' },
    { key: 'projects', label: 'Proyectos' },
    { key: 'certifications', label: 'Certificaciones' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-800">Ajustes & Plantilla</h3>
        <p className="text-xs text-slate-500">
          Elige entre 4 diseños con identidad estructural y visual única.
        </p>
      </div>

      {/* SELECTOR DE PLANTILLAS MEJORADO CON PREVIEWS VISUALES */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Palette size={15} className="text-blue-600" />
            Catálogo de Plantillas
          </label>
          <span className="text-[11px] text-slate-400">Cambia al instante sin perder datos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEMPLATE_LIST.map((tpl) => {
            const isSelected = selectedTemplateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedTemplate(tpl.id as TemplateId)}
                className={`p-3 text-left border rounded-xl transition flex flex-col justify-between relative group ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-xs'
                }`}
              >
                {/* Miniatura visual del wireframe */}
                <div className="mb-2.5">
                  <TemplateMiniPreview id={tpl.id as TemplateId} isSelected={isSelected} />
                </div>

                {/* Encabezado del Card */}
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900">{tpl.name}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white inline-flex items-center justify-center shrink-0">
                        <Check size={12} />
                      </span>
                    )}
                  </div>

                  {/* Badges de columnas y compatibilidad */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                      <Columns size={10} />
                      {tpl.columns === 1 ? '1 Columna' : '2 Columnas'}
                    </span>

                    {tpl.isAtsOptimized && (
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                        ATS-friendly
                      </span>
                    )}

                    <span className="text-[10px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                      {tpl.idealFor}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Paleta de Color */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <label className="text-xs font-bold text-slate-800">Color Primario / Acento</label>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_PALETTES.map((palette) => (
            <button
              key={palette.primary}
              type="button"
              onClick={() =>
                updateThemeConfig({
                  primaryColor: palette.primary,
                  secondaryColor: palette.secondary,
                })
              }
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs transition ${
                themeConfig.primaryColor === palette.primary
                  ? 'border-blue-600 bg-blue-50/40 font-semibold ring-1 ring-blue-500/30'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full shadow-inner"
                style={{ backgroundColor: palette.primary }}
              />
              <span className="text-slate-700">{palette.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visibilidad de Secciones */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Eye size={15} className="text-blue-600" />
          Visibilidad de Secciones en el CV
        </label>
        <p className="text-[11px] text-slate-500">
          Oculta cualquier sección que no desees mostrar sin perder su información.
        </p>

        <div className="divide-y divide-slate-100">
          {sectionsConfig.map((sec) => (
            <div key={sec.key} className="py-2 flex items-center justify-between">
              <span className="text-xs text-slate-700">{sec.label}</span>
              <input
                type="checkbox"
                checked={sectionVisibility[sec.key]}
                onChange={() => toggleSectionVisibility(sec.key)}
                className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Acciones de Restauración / Muestra */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
        <label className="text-xs font-bold text-slate-800">Gestión de Datos</label>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={loadSampleData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg transition"
          >
            <Sparkles size={14} className="text-amber-500" /> Cargar CV de Ejemplo
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('¿Seguro que deseas reiniciar el CV? Se vaciarán los campos.')) {
                resetCV();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg transition"
          >
            <RotateCcw size={14} /> Reiniciar CV en blanco
          </button>
        </div>
      </div>
    </div>
  );
};
