import React from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experiences = useCVStore((state) => state.cv.experiences);
  const addExperience = useCVStore((state) => state.addExperience);
  const updateExperience = useCVStore((state) => state.updateExperience);
  const removeExperience = useCVStore((state) => state.removeExperience);

  const handleAddBullet = (expId: string, currentBullets: string[]) => {
    updateExperience(expId, { bulletPoints: [...currentBullets, ''] });
  };

  const handleUpdateBullet = (expId: string, index: number, value: string, currentBullets: string[]) => {
    const updated = [...currentBullets];
    updated[index] = value;
    updateExperience(expId, { bulletPoints: updated });
  };

  const handleRemoveBullet = (expId: string, index: number, currentBullets: string[]) => {
    const updated = currentBullets.filter((_, i) => i !== index);
    updateExperience(expId, { bulletPoints: updated });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">Experiencia Laboral</h3>
          <p className="text-xs text-slate-500">
            Añade tus roles más relevantes en orden cronológico inverso.
          </p>
        </div>
        <button
          onClick={() => addExperience()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition shadow-sm"
        >
          <Plus size={14} /> Añadir Empleo
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Briefcase className="mx-auto text-slate-400 mb-2" size={28} />
          <p className="text-xs font-semibold text-slate-600">No hay experiencias registradas</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Haz clic en "Añadir Empleo" para empezar a documentar tu trayectoria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, expIndex) => (
            <div
              key={exp.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition space-y-3"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 inline-flex items-center justify-center text-[10px]">
                    {expIndex + 1}
                  </span>
                  {exp.role || 'Nuevo Puesto'} {exp.company && `— ${exp.company}`}
                </span>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                  title="Eliminar este empleo"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Puesto / Rol *
                  </label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                    placeholder="Ej. Desarrollador Web"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    placeholder="Ej. Acme Corp"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                    placeholder="Ej. Remoto / Madrid"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.isCurrent}
                    onChange={(e) => {
                      const isCurrent = e.target.checked;
                      updateExperience(exp.id, {
                        isCurrent,
                        endDate: isCurrent ? undefined : exp.endDate || '',
                      });
                    }}
                    className="h-3.5 w-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-700 font-medium">
                    Trabajo actual aquí
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Fecha de Inicio *
                  </label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    placeholder="AAAA-MM (ej. 2021-03)"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Fecha de Fin {!exp.isCurrent && '*'}
                  </label>
                  <input
                    type="text"
                    disabled={exp.isCurrent}
                    value={exp.isCurrent ? 'Actualidad' : exp.endDate || ''}
                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    placeholder="AAAA-MM (ej. 2023-11)"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60 disabled:bg-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Descripción del Puesto / Contexto
                </label>
                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="Resumen del equipo, proyecto o misión principal..."
                  className="w-full p-2 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Logros cuantificables / Bullet Points */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-slate-600">
                    Logros y responsabilidades clave (Bullet Points)
                  </label>
                  <button
                    onClick={() => handleAddBullet(exp.id, exp.bulletPoints)}
                    className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5"
                  >
                    <Plus size={12} /> Agregar viñeta
                  </button>
                </div>

                {exp.bulletPoints.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-xs">•</span>
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value, exp.bulletPoints)}
                      placeholder="Ej. Rediseñé el checkout logrando un incremento de conversión del 15%."
                      className="flex-1 px-2 py-1 text-xs bg-slate-50/50 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleRemoveBullet(exp.id, bIdx, exp.bulletPoints)}
                      className="text-slate-400 hover:text-red-500 p-1"
                      title="Quitar viñeta"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
