import React from 'react';
import type { TemplateProps } from '../../../types/template.types';
import { LANGUAGE_PROFICIENCY_LABELS } from '../../../config/constants';

export const ClassicAtsTemplate: React.FC<TemplateProps> = ({ data, theme, isPrintMode }) => {
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
      className="w-full bg-white text-slate-900 p-8 sm:p-12 font-serif text-[11.5px] leading-relaxed print:p-8 print:w-[210mm] print:min-h-0"
      style={{ minHeight: isPrintMode ? 'auto' : '297mm' }}
    >
      {/* CABECERA CLÁSICA ATS */}
      <header className="border-b-2 pb-3 mb-4 text-center break-inside-avoid" style={{ borderColor: pColor }}>
        <div className="flex items-center justify-center gap-4">
          {/* Foto opcional y discreta: si no hay foto, el diseño no deja ningún hueco */}
          {contact.avatarUrl && (
            <img
              src={contact.avatarUrl}
              alt={contact.fullName}
              className="w-14 h-14 object-cover rounded border border-slate-300 shadow-xs shrink-0"
            />
          )}

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-normal uppercase text-slate-900 font-sans">
              {contact.fullName || 'Tu Nombre Completo'}
            </h1>
            {contact.jobTitle && (
              <p
                className="text-xs font-semibold tracking-wider uppercase mt-0.5 font-sans"
                style={{ color: pColor }}
              >
                {contact.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Datos de contacto en una sola línea clara con separadores tradicionales */}
        <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 mt-2 text-[10.5px] text-slate-700 font-sans">
          {contact.location && <span>{contact.location}</span>}
          {contact.phone && <span>• {contact.phone}</span>}
          {contact.email && (
            <span>
              •{' '}
              <a href={`mailto:${contact.email}`} className="text-slate-800 hover:underline">
                {contact.email}
              </a>
            </span>
          )}
          {contact.linkedin && (
            <span>
              •{' '}
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                LinkedIn
              </a>
            </span>
          )}
          {contact.github && (
            <span>
              •{' '}
              <a href={contact.github} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                GitHub
              </a>
            </span>
          )}
          {contact.website && (
            <span>
              •{' '}
              <a href={contact.website} target="_blank" rel="noreferrer" className="text-slate-800 hover:underline">
                Portafolio
              </a>
            </span>
          )}
        </div>
      </header>

      {/* PERFIL PROFESIONAL */}
      {sectionVisibility.summary && contact.summary && (
        <section className="mb-3.5">
          <h2
            className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-0.5 mb-1.5"
            style={{ color: pColor, borderColor: '#cbd5e1' }}
          >
            Perfil Profesional
          </h2>
          <p className="text-slate-800 leading-normal text-justify">
            {contact.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCIA LABORAL */}
      {sectionVisibility.experience && experiences.length > 0 && (
        <section className="mb-3.5">
          <h2
            className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-0.5 mb-2"
            style={{ color: pColor, borderColor: '#cbd5e1' }}
          >
            Experiencia Laboral
          </h2>
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 text-xs font-sans">
                    {exp.role} <span className="font-normal text-slate-700">— {exp.company}</span>
                  </h3>
                  <span className="text-[10px] text-slate-600 font-sans italic whitespace-nowrap">
                    {exp.startDate} – {exp.isCurrent ? 'Presente' : exp.endDate || ''}
                    {exp.location && ` | ${exp.location}`}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-slate-700 mt-0.5 text-[11px]">{exp.description}</p>
                )}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-800 text-[11px]">
                    {exp.bulletPoints
                      .filter((bp) => bp.trim().length > 0)
                      .map((point, idx) => (
                        <li key={idx} className="leading-snug">
                          {point}
                        </li>
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
        <section className="mb-3.5">
          <h2
            className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-0.5 mb-1.5 break-after-avoid"
            style={{ color: pColor, borderColor: '#cbd5e1' }}
          >
            Educación y Formación
          </h2>
          <div className="space-y-2">
            {educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs font-sans">
                    {edu.degree} en {edu.fieldOfStudy}
                  </h3>
                  <p className="text-slate-700 text-[10.5px]">
                    {edu.institution} {edu.location && `— ${edu.location}`}
                  </p>
                  {edu.gpaOrHonors && (
                    <p className="text-slate-600 text-[10px] italic">{edu.gpaOrHonors}</p>
                  )}
                </div>
                <span className="text-[10px] text-slate-600 font-sans italic whitespace-nowrap">
                  {edu.startDate} – {edu.isCurrent ? 'Presente' : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HABILIDADES (FORMATO TEXTUAL LIMPIO ATS) */}
      {sectionVisibility.skills && skills.length > 0 && (
        <section className="mb-3.5">
          <h2
            className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-0.5 mb-1"
            style={{ color: pColor, borderColor: '#cbd5e1' }}
          >
            Habilidades Principales
          </h2>
          <p className="text-slate-800 text-[11px] leading-relaxed">
            <span className="font-bold font-sans text-slate-900">Competencias: </span>
            {skills.map((s) => s.name).join(' • ')}
          </p>
        </section>
      )}

      {/* PROYECTOS */}
      {sectionVisibility.projects && projects.length > 0 && (
        <section className="mb-3.5">
          <h2
            className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-0.5 mb-1.5"
            style={{ color: pColor, borderColor: '#cbd5e1' }}
          >
            Proyectos Relevantes
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 text-xs font-sans">
                    {proj.name}
                    {proj.role && <span className="font-normal text-slate-700"> ({proj.role})</span>}
                  </h3>
                  <div className="space-x-2 text-[10px] font-sans">
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-slate-700 underline">
                        Enlace
                      </a>
                    )}
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noreferrer" className="text-slate-700 underline">
                        Código
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-700 text-[11px] mt-0.5">{proj.description}</p>
                {proj.technologies.length > 0 && (
                  <p className="text-[10px] text-slate-600 font-sans mt-0.5">
                    <span className="font-semibold text-slate-800">Tecnologías:</span> {proj.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* IDIOMAS Y CERTIFICACIONES EN DOS COLUMNAS DE TEXTO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 break-inside-avoid">
        {sectionVisibility.languages && languages.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-0.5 mb-1"
              style={{ color: pColor, borderColor: '#cbd5e1' }}
            >
              Idiomas
            </h2>
            <ul className="text-[10.5px] text-slate-800 space-y-0.5">
              {languages.map((lang) => (
                <li key={lang.id}>
                  <span className="font-bold font-sans">{lang.name}:</span>{' '}
                  {LANGUAGE_PROFICIENCY_LABELS[lang.proficiency] || lang.proficiency}
                </li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.certifications && certifications.length > 0 && (
          <section className="break-inside-avoid">
            <h2
              className="text-[11px] font-bold uppercase tracking-wider font-sans border-b pb-0.5 mb-1"
              style={{ color: pColor, borderColor: '#cbd5e1' }}
            >
              Certificaciones
            </h2>
            <ul className="text-[10.5px] text-slate-800 space-y-1">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <span className="font-bold font-sans text-slate-900">{cert.name}</span>
                  <div className="text-[10px] text-slate-600">
                    {cert.issuer} • {cert.issueDate}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
