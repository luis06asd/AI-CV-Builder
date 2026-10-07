import React from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const educations = useCVStore((state) => state.cv.educations);
  const addEducation = useCVStore((state) => state.addEducation);
  const updateEducation = useCVStore((state) => state.updateEducation);
  const removeEducation = useCVStore((state) => state.removeEducation);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">Educación</h3>
          <p className="text-xs text-slate-500">
            Titulaciones universitarias, formación profesional y estudios relevantes.
          </p>
        </div>
        <button
          onClick={() => addEducation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition shadow-sm"
        >
          <Plus size={14} /> Añadir Educación
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <GraduationCap className="mx-auto text-slate-400 mb-2" size={28} />
          <p className="text-xs font-semibold text-slate-600">No hay registros educativos</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Haz clic en "Añadir Educación" para incluir tus estudios.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu, eduIndex) => (
            <div
              key={edu.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition space-y-3"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 inline-flex items-center justify-center text-[10px]">
                    {eduIndex + 1}
                  </span>
                  {edu.degree || 'Nueva Titulación'} {edu.institution && `— ${edu.institution}`}
                </span>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                  title="Eliminar este registro"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Institución / Universidad *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="Ej. Universidad Complutense"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Grado / Título *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="Ej. Grado en Ingeniería Informática"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Campo de Estudio / Especialidad
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                    placeholder="Ej. Software y Sistemas"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                    placeholder="Ej. Madrid, España"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Año / Fecha de Inicio
                  </label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                    placeholder="AAAA o AAAA-MM"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Año / Fecha de Fin
                  </label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                    placeholder="AAAA o Actualidad"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Menciones / Promedio (Opcional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpaOrHonors || ''}
                    onChange={(e) => updateEducation(edu.id, { gpaOrHonors: e.target.value })}
                    placeholder="Ej. Mención de Honor, Magna Cum Laude"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
