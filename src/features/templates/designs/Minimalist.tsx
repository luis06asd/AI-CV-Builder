import React from 'react';
import type { TemplateProps } from '../../../types/template.types';
import { LANGUAGE_PROFICIENCY_LABELS } from '../../../config/constants';

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
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

  const pColor = theme.primaryColor || '#1e293b';

  return (
    <div
      className="w-full bg-white text-slate-800 p-10 sm:p-14 font-sans text-xs leading-relaxed print:p-8"
      style={{ minHeight: '297mm' }}
    >
      {/* CABECERA MINIMALISTA */}
      <header className="mb-10 pb-6 border-b border-slate-100">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
              {contact.fullName || 'Tu Nombre'}
            </h1>
            {contact.jobTitle && (
              <p
                className="text-xs uppercase tracking-widest font-medium"
                style={{ color: pColor }}
              >
                {contact.jobTitle}
              </p>
            )}

            {/* Enlaces de contacto sutiles y limpios */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[11px] text-slate-500 font-light">
              {contact.location && <span>{contact.location}</span>}
              {contact.phone && <span>/ {contact.phone}</span>}
              {contact.email && (
                <span>
                  /{' '}
                  <a href={`mailto:${contact.email}`} className="text-slate-700 hover:text-black">
                    {contact.email}
                  </a>
                </span>
              )}
              {contact.linkedin && (
                <span>
                  /{' '}
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-black">
                    linkedin
                  </a>
                </span>
              )}
              {contact.github && (
                <span>
                  /{' '}
                  <a href={contact.github} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-black">
                    github
                  </a>
                </span>
              )}
              {contact.website && (
                <span>
                  /{' '}
                  <a href={contact.website} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-black">
                    portfolio
                  </a>
                </span>
              )}
            </div>
          </div>

          {/* FOTO SUTIL Y CIRCULAR: Si no existe, no deja ningún hueco */}
          {contact.avatarUrl && (
            <div className="shrink-0">
              <img
                src={contact.avatarUrl}
                alt={contact.fullName}
                className="w-16 h-16 rounded-full object-cover grayscale hover:grayscale-0 transition-all border border-slate-200"
              />
            </div>
          )}
        </div>
      </header>

      {/* RITMO TIPOGRÁFICO ASIMÉTRICO (ETIQUETAS A LA IZQUIERDA, CONTENIDO A LA DERECHA) */}
      <div className="space-y-8">
        {/* PERFIL */}
        {sectionVisibility.summary && contact.summary && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-3">
              <h2 className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                Sobre mí
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-9">
              <p className="text-slate-700 text-[11.5px] leading-relaxed font-light text-justify">
                {contact.summary}
              </p>
            </div>
          </div>
        )}

        {/* EXPERIENCIA */}
        {sectionVisibility.experience && experiences.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-3">
              <h2 className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                Experiencia
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-9 space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-slate-900 text-xs">
                      {exp.role} <span className="font-light text-slate-500">at {exp.company}</span>
                    </h3>
                    <span className="text-[10.5px] text-slate-400 font-light">
                      {exp.startDate} — {exp.isCurrent ? 'Presente' : exp.endDate || ''}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-[10px] text-slate-400 font-light">{exp.location}</p>
                  )}
                  {exp.description && (
                    <p className="text-slate-600 text-[11px] font-light leading-relaxed pt-0.5">
                      {exp.description}
                    </p>
                  )}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-slate-600 text-[11px] font-light">
                      {exp.bulletPoints
                        .filter((bp) => bp.trim().length > 0)
                        .map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-slate-300 select-none">—</span>
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCACIÓN */}
        {sectionVisibility.education && educations.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-3">
              <h2 className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                Educación
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-9 space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-medium text-slate-900 text-xs">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p className="text-slate-500 text-[11px] font-light">
                      {edu.institution} {edu.location && `(${edu.location})`}
                    </p>
                    {edu.gpaOrHonors && (
                      <p className="text-slate-400 text-[10px] italic">{edu.gpaOrHonors}</p>
                    )}
                  </div>
                  <span className="text-[10.5px] text-slate-400 font-light">
                    {edu.startDate} — {edu.isCurrent ? 'Presente' : edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROYECTOS */}
        {sectionVisibility.projects && projects.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-3">
              <h2 className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                Proyectos
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-9 space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-slate-900 text-xs">
                      {proj.name}
                      {proj.role && <span className="font-light text-slate-400"> — {proj.role}</span>}
                    </h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10.5px] text-slate-500 hover:text-black underline"
                      >
                        view project
                      </a>
                    )}
                  </div>
                  <p className="text-slate-600 text-[11px] font-light">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-[10px] text-slate-400 font-light">
                      {proj.technologies.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HABILIDADES */}
        {sectionVisibility.skills && skills.length > 0 && (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-3">
              <h2 className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                Habilidades
              </h2>
            </div>
            <div className="col-span-12 sm:col-span-9">
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-700 font-light">
                {skills.map((skill) => (
                  <span key={skill.id} className="inline-flex items-center gap-1.5">
                    <span>{skill.name}</span>
                    <span className="text-slate-300">/</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* IDIOMAS Y CERTIFICACIONES */}
        <div className="grid grid-cols-12 gap-6 pt-2">
          {sectionVisibility.languages && languages.length > 0 && (
            <div className="col-span-12 sm:col-span-6 grid grid-cols-12 gap-2">
              <div className="col-span-12 sm:col-span-6">
                <h2 className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                  Idiomas
                </h2>
              </div>
              <div className="col-span-12 sm:col-span-6 space-y-1">
                {languages.map((l) => (
                  <p key={l.id} className="text-[11px] text-slate-700 font-light">
                    <span className="font-medium text-slate-900">{l.name}</span>{' '}
                    <span className="text-slate-400 text-[10px]">
                      ({LANGUAGE_PROFICIENCY_LABELS[l.proficiency] || l.proficiency})
                    </span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {sectionVisibility.certifications && certifications.length > 0 && (
            <div className="col-span-12 sm:col-span-6 grid grid-cols-12 gap-2">
              <div className="col-span-12 sm:col-span-6">
                <h2 className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                  Certificados
                </h2>
              </div>
              <div className="col-span-12 sm:col-span-6 space-y-1">
                {certifications.map((c) => (
                  <div key={c.id} className="text-[11px] text-slate-700 font-light">
                    <p className="font-medium text-slate-900 leading-tight">{c.name}</p>
                    <p className="text-[10px] text-slate-400">{c.issuer} · {c.issueDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
