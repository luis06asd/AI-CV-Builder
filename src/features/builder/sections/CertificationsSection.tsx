import React from 'react';
import { useCVStore } from '../../../store/cvStore';
import { Plus, Trash2, Award } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const certifications = useCVStore((state) => state.cv.certifications);
  const addCertification = useCVStore((state) => state.addCertification);
  const updateCertification = useCVStore((state) => state.updateCertification);
  const removeCertification = useCVStore((state) => state.removeCertification);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800">Certificaciones</h3>
          <p className="text-xs text-slate-500">
            Acredita tus conocimientos con credenciales oficiales verificables.
          </p>
        </div>
        <button
          onClick={() => addCertification()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition shadow-sm"
        >
          <Plus size={14} /> Añadir Certificación
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <Award className="mx-auto text-slate-400 mb-2" size={28} />
          <p className="text-xs font-semibold text-slate-600">No hay certificaciones añadidas</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Las certificaciones aumentan tu credibilidad técnica ante los reclutadores.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, cIdx) => (
            <div
              key={cert.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-slate-300 transition space-y-3"
            >
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 inline-flex items-center justify-center text-[10px]">
                    {cIdx + 1}
                  </span>
                  {cert.name || 'Nueva Certificación'}
                </span>
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                  title="Eliminar certificación"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Nombre de la Certificación *
                  </label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                    placeholder="Ej. AWS Certified Solutions Architect"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Entidad Emisora *
                  </label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                    placeholder="Ej. Amazon Web Services, Google, Meta"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Fecha de Emisión
                  </label>
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => updateCertification(cert.id, { issueDate: e.target.value })}
                    placeholder="AAAA-MM"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    ID de Credencial
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId || ''}
                    onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })}
                    placeholder="Ej. ABC-123456"
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50/50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Enlace de Verificación (URL)
                  </label>
                  <input
                    type="url"
                    value={cert.credentialUrl || ''}
                    onChange={(e) => updateCertification(cert.id, { credentialUrl: e.target.value })}
                    placeholder="https://credly.com/..."
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
