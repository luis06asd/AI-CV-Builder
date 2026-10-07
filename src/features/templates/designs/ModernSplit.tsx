import React from 'react';
import type { TemplateProps } from '../../../types/template.types';
import { LANGUAGE_PROFICIENCY_LABELS } from '../../../config/constants';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../../components/common/BrandIcons';

export const ModernSplitTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
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

  const pColor = theme.primaryColor || '#1e3a8a';

  return (
    <div
      className="w-full bg-white text-slate-800 grid grid-cols-12 font-sans text-xs print:m-0"
      style={{ minHeight: '297mm' }}
    >
      {/* BARRA LATERAL (COLUMNA IZQUIERDA - 4 COLUMNAS) */}
      <aside className="col-span-4 bg-slate-900 text-slate-100 p-6 sm:p-7 flex flex-col gap-6 text-[11px] print:bg-slate-900 print:text-slate-100">
        {/* FOTO CIRCULAR EN SIDEBAR (Si no hay foto, el diseño fluye sin dejar huecos vacíos) */}
        {contact.avatarUrl && (
          <div className="flex justify-center pt-2">
            <img
              src={contact.avatarUrl}
              alt={contact.fullName}
              className="w-24 h-24 rounded-full object-cover border-3 border-white/80 shadow-lg ring-4 ring-slate-800"
            />
          </div>
        )}

        {/* IDENTIDAD EN SIDEBAR */}
        <div className={contact.avatarUrl ? 'text-center' : 'text-left pt-2'}>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {contact.fullName || 'Tu Nombre'}
          </h1>
          {contact.jobTitle && (
            <p className="text-xs font-semibold text-blue-400 mt-1 uppercase tracking-wider">
              {contact.jobTitle}
            </p>
          )}
        </div>

        {/* DATOS DE CONTACTO */}
        <section className="space-y-2.5 pt-2 border-t border-slate-800 text-slate-300">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white">
            Contacto
          </h2>
          <div className="space-y-2 text-[10.5px]">
            {contact.email && (
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-blue-400 shrink-0" />
                <a href={`mailto:${contact.email}`} className="break-all hover:text-white transition">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-blue-400 shrink-0" />
                <span>{contact.phone}</span>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-blue-400 shrink-0" />
                <span>{contact.location}</span>
              </div>
            )}
            {contact.linkedin && (
              <div className="flex items-center gap-2">
                <LinkedinIcon size={13} className="text-blue-400 shrink-0" />
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="truncate hover:text-white transition">
                  LinkedIn
                </a>
              </div>
            )}
            {contact.github && (
              <div className="flex items-center gap-2">
                <GithubIcon size={13} className="text-blue-400 shrink-0" />
                <a href={contact.github} target="_blank" rel="noreferrer" className="truncate hover:text-white transition">
                  GitHub
                </a>
              </div>
            )}
            {contact.website && (
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-blue-400 shrink-0" />
                <a href={contact.website} target="_blank" rel="noreferrer" className="truncate hover:text-white transition">
                  Sitio Web
                </a>
              </div>
            )}
          </div>
        </section>

        {/* HABILIDADES CON BADGES EN SIDEBAR */}
        {sectionVisibility.skills && skills.length > 0 && (
          <section className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded text-[10.5px] font-medium"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* IDIOMAS EN SIDEBAR */}
        {sectionVisibility.languages && languages.length > 0 && (
          <section className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Idiomas
            </h2>
            <ul className="space-y-1.5 text-[10.5px]">
              {languages.map((l) => (
                <li key={l.id} className="flex justify-between items-center">
                  <span className="font-medium text-slate-200">{l.name}</span>
                  <span className="text-slate-400 text-[10px]">
                    {LANGUAGE_PROFICIENCY_LABELS[l.proficiency] || l.proficiency}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CERTIFICACIONES EN SIDEBAR */}
        {sectionVisibility.certifications && certifications.length > 0 && (
          <section className="space-y-2 pt-2 border-t border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white">
              Certificaciones
            </h2>
            <div className="space-y-2 text-[10.5px]">
              {certifications.map((c) => (
                <div key={c.id}>
                  <p className="font-semibold text-slate-200 leading-snug">{c.name}</p>
                  <p className="text-[10px] text-slate-400">
                    {c.issuer} • {c.issueDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* ÁREA PRINCIPAL (8 COLUMNAS) */}
      <main className="col-span-8 p-8 sm:p-10 flex flex-col gap-6">
        {/* PERFIL */}
        {sectionVisibility.summary && contact.summary && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Perfil Profesional
              </h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11.5px] text-justify">
              {contact.summary}
            </p>
          </section>
        )}

        {/* EXPERIENCIA LABORAL CON TIMELINE */}
        {sectionVisibility.experience && experiences.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Experiencia Laboral
              </h2>
            </div>
            <div className="space-y-5 border-l-2 pl-4 ml-1" style={{ borderColor: '#e2e8f0' }}>
              {experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Nodo circular de línea de tiempo */}
                  <span
                    className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white"
                    style={{ backgroundColor: pColor }}
                  />

                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs">{exp.role}</h3>
                    <span className="text-[10px] text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {exp.startDate} – {exp.isCurrent ? 'Presente' : exp.endDate || ''}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px] font-medium mt-0.5">
                    <span style={{ color: pColor }}>{exp.company}</span>
                    {exp.location && ` • ${exp.location}`}
                  </p>

                  {exp.description && (
                    <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">{exp.description}</p>
                  )}

                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-disc list-inside mt-1.5 space-y-0.5 text-slate-700 text-[11px]">
                      {exp.bulletPoints
                        .filter((bp) => bp.trim().length > 0)
                        .map((bp, i) => (
                          <li key={i} className="leading-snug">{bp}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCACIÓN */}
        {sectionVisibility.education && educations.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Educación
              </h2>
            </div>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs">
                      {edu.degree} en {edu.fieldOfStudy}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                      {edu.startDate} – {edu.isCurrent ? 'Presente' : edu.endDate}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    {edu.institution} {edu.location && `• ${edu.location}`}
                  </p>
                  {edu.gpaOrHonors && (
                    <p className="text-amber-800 text-[10px] font-semibold mt-0.5">{edu.gpaOrHonors}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROYECTOS */}
        {sectionVisibility.projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Proyectos Destacados
              </h2>
            </div>
            <div className="space-y-2.5">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs">
                      {p.name}
                      {p.role && <span className="font-normal text-slate-500"> ({p.role})</span>}
                    </h3>
                    <div className="space-x-2 text-[10px]">
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 font-medium underline">
                          Demo
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="text-slate-500 font-medium underline">
                          Código
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">{p.description}</p>
                  {p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[9.5px] px-1.5 py-0.5 rounded font-medium border border-slate-200">
                          {tech}
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
    </div>
  );
};
