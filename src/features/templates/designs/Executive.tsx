import React from 'react';
import type { TemplateProps } from '../../../types/template.types';
import { LANGUAGE_PROFICIENCY_LABELS } from '../../../config/constants';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon } from '../../../components/common/BrandIcons';

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, theme, isPrintMode }) => {
  const {
    personalInfo: contact,
    experiences,
    educations,
    skills,
    languages,
    projects,
    certifications,
    sectionVisibility,
  } = data;

  const pColor = theme.primaryColor || '#0f172a';

  return (
    <div
      className="w-full bg-white text-slate-800 font-sans text-xs leading-relaxed print:m-0 print:w-[210mm] print:min-h-0"
      style={{ minHeight: isPrintMode ? 'auto' : '297mm' }}
    >
      {/* BANNER SUPERIOR EJECUTIVO */}
      <header
        className="text-white p-8 sm:p-10 shadow-md relative overflow-hidden break-inside-avoid print:p-6"
        style={{ backgroundColor: pColor }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* FOTO DESTACADA EN CABECERA (Si existe, con marco elegante; si no existe, no deja ningún hueco) */}
          {contact.avatarUrl && (
            <div className="shrink-0">
              <img
                src={contact.avatarUrl}
                alt={contact.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border-3 border-white/90 shadow-xl ring-2 ring-white/20"
              />
            </div>
          )}

          {/* DATOS DE IDENTIDAD */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-white drop-shadow-xs">
              {contact.fullName || 'Tu Nombre'}
            </h1>

            {contact.jobTitle && (
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/90 mt-1">
                {contact.jobTitle}
              </p>
            )}

            {/* Enlaces de Contacto en pastillas discretas */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1.5 mt-3 text-[11px] text-white/80">
              {contact.email && (
                <div className="flex items-center gap-1">
                  <Mail size={12} className="text-white/70" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition">
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={12} className="text-white/70" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-white/70" />
                  <span>{contact.location}</span>
                </div>
              )}
              {contact.linkedin && (
                <div className="flex items-center gap-1">
                  <LinkedinIcon size={12} className="text-white/70" />
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition">
                    LinkedIn
                  </a>
                </div>
              )}
              {contact.website && (
                <div className="flex items-center gap-1">
                  <Globe size={12} className="text-white/70" />
                  <a href={contact.website} target="_blank" rel="noreferrer" className="hover:text-white transition">
                    Web
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CUERPO PRINCIPAL ASIMÉTRICO */}
      <div className="p-8 sm:p-10 space-y-6">
        {/* RESUMEN EJECUTIVO / CALLOUT CARD */}
        {sectionVisibility.summary && contact.summary && (
          <section className="bg-slate-50 border-l-4 p-4 rounded-r-lg shadow-2xs" style={{ borderColor: pColor }}>
            <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 mb-1">
              Perfil & Visión Ejecutiva
            </h2>
            <p className="text-slate-700 text-[11.5px] leading-relaxed text-justify font-normal">
              {contact.summary}
            </p>
          </section>
        )}

        {/* ESTRUCTURA DE 2 COLUMNAS (68% TRAYECTORIA | 32% CREDENCIALES Y COMPETENCIAS) */}
        <div className="grid grid-cols-12 gap-8">
          {/* COLUMNA PRINCIPAL: EXPERIENCIA Y PROYECTOS (8/12) */}
          <main className="col-span-12 lg:col-span-8 space-y-6">
            {/* EXPERIENCIA PROFESIONAL SENIOR */}
            {sectionVisibility.experience && experiences.length > 0 && (
              <section>
                <div className="flex items-center gap-2 border-b-2 pb-1.5 mb-4" style={{ borderColor: pColor }}>
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Trayectoria Profesional
                  </h2>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-3 border-l-2 border-slate-200 break-inside-avoid">
                      <div className="flex flex-wrap justify-between items-baseline gap-1">
                        <h3 className="text-xs font-bold text-slate-900">
                          {exp.role}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                          {exp.startDate} – {exp.isCurrent ? 'Actualidad' : exp.endDate || ''}
                        </span>
                      </div>

                      <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                        <span style={{ color: pColor }}>{exp.company}</span>
                        {exp.location && <span className="text-slate-500 font-normal"> • {exp.location}</span>}
                      </div>

                      {exp.description && (
                        <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">{exp.description}</p>
                      )}

                      {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                        <ul className="mt-1.5 space-y-1 text-slate-700 text-[11px]">
                          {exp.bulletPoints
                            .filter((bp) => bp.trim().length > 0)
                            .map((point, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-slate-400 font-bold shrink-0">▸</span>
                                <span>{point}</span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PROYECTOS ESTRATÉGICOS */}
            {sectionVisibility.projects && projects.length > 0 && (
              <section>
                <div className="flex items-center gap-2 border-b-2 pb-1.5 mb-3" style={{ borderColor: pColor }}>
                  <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Iniciativas & Proyectos Estratégicos
                  </h2>
                </div>

                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="bg-slate-50/70 p-3 rounded-lg border border-slate-200 break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-slate-900 text-xs">
                          {proj.name}
                          {proj.role && <span className="text-slate-500 font-normal"> ({proj.role})</span>}
                        </h3>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10.5px] font-semibold underline"
                            style={{ color: pColor }}
                          >
                            Ver Enlace
                          </a>
                        )}
                      </div>
                      <p className="text-slate-600 text-[11px] mt-1">{proj.description}</p>
                      {proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {proj.technologies.map((t, i) => (
                            <span key={i} className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded font-medium text-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* COLUMNA LATERAL: HABILIDADES, EDUCACIÓN, CERTIFICACIONES (4/12) */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* HABILIDADES / COMPETENCIAS CLAVE */}
            {sectionVisibility.skills && skills.length > 0 && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 break-inside-avoid">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-3">
                  Competencias Clave
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-white text-slate-800 px-2 py-1 rounded-md border border-slate-200 text-[10.5px] font-semibold shadow-2xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* EDUCACIÓN SUPERIOR */}
            {sectionVisibility.education && educations.length > 0 && (
              <div className="space-y-3 break-inside-avoid">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 pb-1.5" style={{ borderColor: pColor }}>
                  Educación Superior
                </h2>
                <div className="space-y-2.5">
                  {educations.map((edu) => (
                    <div key={edu.id} className="text-[11px] break-inside-avoid">
                      <h3 className="font-bold text-slate-900 leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-slate-700 font-medium">{edu.fieldOfStudy}</p>
                      <p className="text-slate-500 text-[10.5px]">
                        {edu.institution} {edu.location && `• ${edu.location}`}
                      </p>
                      <p className="text-slate-400 text-[10px] mt-0.5">
                        {edu.startDate} – {edu.isCurrent ? 'Presente' : edu.endDate}
                      </p>
                      {edu.gpaOrHonors && (
                        <p className="text-amber-800 text-[10px] font-semibold mt-0.5">{edu.gpaOrHonors}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CERTIFICACIONES Y ACREDITACIONES */}
            {sectionVisibility.certifications && certifications.length > 0 && (
              <div className="space-y-3 break-inside-avoid">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 pb-1.5" style={{ borderColor: pColor }}>
                  Certificaciones
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200 break-inside-avoid">
                      <p className="font-bold text-slate-900 leading-tight">{cert.name}</p>
                      <p className="text-slate-500 text-[10px] mt-0.5">
                        {cert.issuer} • {cert.issueDate}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IDIOMAS */}
            {sectionVisibility.languages && languages.length > 0 && (
              <div className="space-y-2 break-inside-avoid">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b-2 pb-1.5" style={{ borderColor: pColor }}>
                  Idiomas
                </h2>
                <ul className="space-y-1.5 text-[11px]">
                  {languages.map((lang) => (
                    <li key={lang.id} className="flex justify-between items-center bg-slate-50 px-2.5 py-1 rounded border border-slate-100">
                      <span className="font-bold text-slate-800">{lang.name}</span>
                      <span className="text-[10.5px] text-slate-500 font-medium">
                        {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency] || lang.proficiency}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
