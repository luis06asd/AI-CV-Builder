import React, { useState } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Plus, Trash2, Languages as LangIcon } from 'lucide-react';
import type { LanguageProficiency } from '../../../types/cv.types';
import { LANGUAGE_PROFICIENCY_LABELS } from '../../../config/constants';

export const LanguagesSection: React.FC = () => {
  const languages = useCVStore((state) => state.cv.languages);
  const addLanguage = useCVStore((state) => state.addLanguage);
  const removeLanguage = useCVStore((state) => state.removeLanguage);

  const [name, setName] = useState('');
  const [proficiency, setProficiency] = useState<LanguageProficiency>('intermediate');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addLanguage({
      name: name.trim(),
      proficiency,
    });
    setName('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-slate-800">Idiomas</h3>
        <p className="text-xs text-slate-500">
          Indica los idiomas que dominas y tu nivel de fluidez comunicativa.
        </p>
      </div>

      <form onSubmit={handleAdd} className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Inglés, Francés, Alemán..."
              className="w-full px-3 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={proficiency}
              onChange={(e) => setProficiency(e.target.value as LanguageProficiency)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {(Object.keys(LANGUAGE_PROFICIENCY_LABELS) as LanguageProficiency[]).map((level) => (
                <option key={level} value={level}>
                  {LANGUAGE_PROFICIENCY_LABELS[level]}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
            >
              <Plus size={14} /> Añadir
            </button>
          </div>
        </div>
      </form>

      {languages.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <LangIcon className="mx-auto text-slate-400 mb-2" size={28} />
          <p className="text-xs font-semibold text-slate-600">No hay idiomas añadidos</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Añade al menos tu idioma nativo y cualquier idioma extranjero que hables.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-sm overflow-hidden">
          {languages.map((lang) => (
            <div key={lang.id} className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">{lang.name}</p>
                <p className="text-[11px] text-slate-500">
                  {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency] || lang.proficiency}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeLanguage(lang.id)}
                className="text-slate-400 hover:text-red-500 p-1.5 rounded transition"
                title="Eliminar idioma"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
