import React, { useState } from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Plus, X, Wrench } from 'lucide-react';
import type { SkillCategory, SkillLevel } from '../../../types/cv.types';
import { SKILL_CATEGORY_LABELS, SKILL_LEVEL_LABELS } from '../../../config/constants';

export const SkillsSection: React.FC = () => {
  const skills = useCVStore((state) => state.cv.skills);
  const addSkill = useCVStore((state) => state.addSkill);
  const removeSkill = useCVStore((state) => state.removeSkill);

  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState<SkillCategory>('technical');
  const [newLevel, setNewLevel] = useState<SkillLevel>('advanced');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      category: newCategory,
      level: newLevel,
    });
    setNewSkillName('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-slate-800">Habilidades</h3>
        <p className="text-xs text-slate-500">
          Palabras clave técnicas, herramientas y habilidades blandas para pasar filtros ATS.
        </p>
      </div>

      {/* Formulario rápido para añadir */}
      <form onSubmit={handleAdd} className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-5">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Ej. React, Docker, Negociación..."
              className="w-full px-3 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as SkillCategory)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {(Object.keys(SKILL_CATEGORY_LABELS) as SkillCategory[]).map((cat) => (
                <option key={cat} value={cat}>
                  {SKILL_CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              value={newLevel}
              onChange={(e) => setNewLevel(e.target.value as SkillLevel)}
              className="w-full px-2 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {(Object.keys(SKILL_LEVEL_LABELS) as SkillLevel[]).map((lvl) => (
                <option key={lvl} value={lvl}>
                  {SKILL_LEVEL_LABELS[lvl]}
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

      {/* Lista de habilidades agrupadas o en tags */}
      {skills.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Wrench className="mx-auto text-slate-400 mb-2" size={28} />
          <p className="text-xs font-semibold text-slate-600">No hay habilidades añadidas</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Escribe una habilidad en el campo superior y presiona Añadir.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-slate-100 border border-slate-200 text-slate-800"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({SKILL_CATEGORY_LABELS[skill.category] || skill.category})
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-slate-400 hover:text-red-500 transition ml-0.5"
                  title="Eliminar habilidad"
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
