import React from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Plus, Trash2, FolderGit2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const projects = useCVStore((state) => state.cv.projects);
  const addProject = useCVStore((state) => state.addProject);
  const updateProject = useCVStore((state) => state.updateProject);
  const removeProject = useCVStore((state) => state.removeProject);

  const handleTechChange = (projId: string, rawTech: string) => {
    const list = rawTech.split(',').map((t) => t.trim()).filter(Boolean);
    updateProject(projId, { technologies: list });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">Proyectos</h3>
          <p className="text-xs text-slate-500">
            Añade iniciativas personales, open-source o proyectos destacados.
          </p>
        </div>
        <button
          onClick={() => addProject()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition shadow-sm"
        >
          <Plus size={14} /> Añadir Proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <FolderGit2 className="mx-auto text-slate-400 mb-2" size={28} />
          <p className="text-xs font-semibold text-slate-600">No hay proyectos añadidos</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Muestra tu capacidad práctica añadiendo proyectos relevantes.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, pIdx) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition space-y-3"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 inline-flex items-center justify-center text-[10px]">
                    {pIdx + 1}
                  </span>
                  {proj.name || 'Nuevo Proyecto'}
                </span>
                <button
                  onClick={() => removeProject(proj.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                  title="Eliminar proyecto"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Nombre del Proyecto *
                  </label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                    placeholder="Ej. Plataforma E-commerce"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Rol en el Proyecto
                  </label>
                  <input
                    type="text"
                    value={proj.role || ''}
                    onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                    placeholder="Ej. Creador, Frontend Lead"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Enlace de Demostración (URL)
                  </label>
                  <input
                    type="url"
                    value={proj.link || ''}
                    onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                    placeholder="https://midemo.com"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Repositorio GitHub (URL)
                  </label>
                  <input
                    type="url"
                    value={proj.github || ''}
                    onChange={(e) => updateProject(proj.id, { github: e.target.value })}
                    placeholder="https://github.com/usuario/repo"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Tecnologías utilizadas (separadas por comas)
                  </label>
                  <input
                    type="text"
                    value={proj.technologies.join(', ')}
                    onChange={(e) => handleTechChange(proj.id, e.target.value)}
                    placeholder="Ej. React, TypeScript, Tailwind, Node.js"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Descripción del Proyecto
                  </label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                    placeholder="Explica qué problema soluciona y tu impacto técnico..."
                    className="w-full p-2 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
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
