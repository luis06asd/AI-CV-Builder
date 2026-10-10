import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  CVData,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillItem,
  LanguageItem,
  ProjectItem,
  CertificationItem,
  SectionVisibility,
} from '../types/cv.types';
import { SAMPLE_CV, INITIAL_EMPTY_CV } from '../utils/sampleData';
import { generateId } from '../utils/id';

export interface CVStoreState {
  cv: CVData;

  // Título & Metadatos
  updateCVTitle: (title: string) => void;

  // Información Personal
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;

  // Experiencia Laboral
  addExperience: (item?: Partial<Omit<ExperienceItem, 'id'>>) => void;
  updateExperience: (id: string, item: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (items: ExperienceItem[]) => void;

  // Educación
  addEducation: (item?: Partial<Omit<EducationItem, 'id'>>) => void;
  updateEducation: (id: string, item: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  // Habilidades
  addSkill: (item?: Partial<Omit<SkillItem, 'id'>>) => void;
  updateSkill: (id: string, item: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;

  // Idiomas
  addLanguage: (item?: Partial<Omit<LanguageItem, 'id'>>) => void;
  updateLanguage: (id: string, item: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;

  // Proyectos
  addProject: (item?: Partial<Omit<ProjectItem, 'id'>>) => void;
  updateProject: (id: string, item: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;

  // Certificaciones
  addCertification: (item?: Partial<Omit<CertificationItem, 'id'>>) => void;
  updateCertification: (id: string, item: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;

  // Visibilidad de Secciones
  toggleSectionVisibility: (section: keyof SectionVisibility) => void;

  // Acciones globales
  loadSampleData: () => void;
  resetCV: () => void;
  loadCV: (cv: CVData) => void;
}

export const useCVStore = create<CVStoreState>()(
  persist(
    (set) => ({
      // Iniciamos con los datos de muestra para que el usuario experimente de inmediato
      cv: SAMPLE_CV,

      updateCVTitle: (title) =>
        set((state) => ({
          cv: {
            ...state.cv,
            title,
            updatedAt: new Date().toISOString(),
          },
        })),

      updatePersonalInfo: (data) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            personalInfo: {
              ...state.cv.personalInfo,
              ...data,
            },
          },
        })),

      addExperience: (item) =>
        set((state) => {
          const newItem: ExperienceItem = {
            id: generateId(),
            company: item?.company || '',
            role: item?.role || '',
            location: item?.location || '',
            startDate: item?.startDate || '',
            endDate: item?.endDate,
            isCurrent: item?.isCurrent ?? true,
            description: item?.description || '',
            bulletPoints: item?.bulletPoints || [''],
          };
          return {
            cv: {
              ...state.cv,
              updatedAt: new Date().toISOString(),
              experiences: [newItem, ...state.cv.experiences],
            },
          };
        }),

      updateExperience: (id, item) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            experiences: state.cv.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...item } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            experiences: state.cv.experiences.filter((exp) => exp.id !== id),
          },
        })),

      reorderExperiences: (items) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            experiences: items,
          },
        })),

      addEducation: (item) =>
        set((state) => {
          const newItem: EducationItem = {
            id: generateId(),
            institution: item?.institution || '',
            degree: item?.degree || '',
            fieldOfStudy: item?.fieldOfStudy || '',
            location: item?.location || '',
            startDate: item?.startDate || '',
            endDate: item?.endDate || '',
            isCurrent: item?.isCurrent ?? false,
            gpaOrHonors: item?.gpaOrHonors || '',
            description: item?.description || '',
          };
          return {
            cv: {
              ...state.cv,
              updatedAt: new Date().toISOString(),
              educations: [newItem, ...state.cv.educations],
            },
          };
        }),

      updateEducation: (id, item) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            educations: state.cv.educations.map((edu) =>
              edu.id === id ? { ...edu, ...item } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            educations: state.cv.educations.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: (item) =>
        set((state) => {
          const newItem: SkillItem = {
            id: generateId(),
            name: item?.name || '',
            category: item?.category || 'technical',
            level: item?.level || 'intermediate',
          };
          return {
            cv: {
              ...state.cv,
              updatedAt: new Date().toISOString(),
              skills: [...state.cv.skills, newItem],
            },
          };
        }),

      updateSkill: (id, item) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            skills: state.cv.skills.map((sk) =>
              sk.id === id ? { ...sk, ...item } : sk
            ),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            skills: state.cv.skills.filter((sk) => sk.id !== id),
          },
        })),

      addLanguage: (item) =>
        set((state) => {
          const newItem: LanguageItem = {
            id: generateId(),
            name: item?.name || '',
            proficiency: item?.proficiency || 'intermediate',
          };
          return {
            cv: {
              ...state.cv,
              updatedAt: new Date().toISOString(),
              languages: [...state.cv.languages, newItem],
            },
          };
        }),

      updateLanguage: (id, item) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            languages: state.cv.languages.map((lang) =>
              lang.id === id ? { ...lang, ...item } : lang
            ),
          },
        })),

      removeLanguage: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            languages: state.cv.languages.filter((lang) => lang.id !== id),
          },
        })),

      addProject: (item) =>
        set((state) => {
          const newItem: ProjectItem = {
            id: generateId(),
            name: item?.name || '',
            description: item?.description || '',
            role: item?.role || '',
            technologies: item?.technologies || [],
            link: item?.link || '',
            github: item?.github || '',
            startDate: item?.startDate,
            endDate: item?.endDate,
          };
          return {
            cv: {
              ...state.cv,
              updatedAt: new Date().toISOString(),
              projects: [...state.cv.projects, newItem],
            },
          };
        }),

      updateProject: (id, item) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            projects: state.cv.projects.map((proj) =>
              proj.id === id ? { ...proj, ...item } : proj
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            projects: state.cv.projects.filter((proj) => proj.id !== id),
          },
        })),

      addCertification: (item) =>
        set((state) => {
          const newItem: CertificationItem = {
            id: generateId(),
            name: item?.name || '',
            issuer: item?.issuer || '',
            issueDate: item?.issueDate || '',
            expiryDate: item?.expiryDate,
            credentialId: item?.credentialId,
            credentialUrl: item?.credentialUrl,
          };
          return {
            cv: {
              ...state.cv,
              updatedAt: new Date().toISOString(),
              certifications: [...state.cv.certifications, newItem],
            },
          };
        }),

      updateCertification: (id, item) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            certifications: state.cv.certifications.map((cert) =>
              cert.id === id ? { ...cert, ...item } : cert
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            certifications: state.cv.certifications.filter((cert) => cert.id !== id),
          },
        })),

      toggleSectionVisibility: (section) =>
        set((state) => ({
          cv: {
            ...state.cv,
            updatedAt: new Date().toISOString(),
            sectionVisibility: {
              ...state.cv.sectionVisibility,
              [section]: !state.cv.sectionVisibility[section],
            },
          },
        })),

      loadSampleData: () =>
        set(() => ({
          cv: {
            ...SAMPLE_CV,
            id: generateId(),
            updatedAt: new Date().toISOString(),
          },
        })),

      resetCV: () =>
        set(() => ({
          cv: {
            ...INITIAL_EMPTY_CV,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })),
      loadCV: (cv) => set({ cv }),
    }),
    {
      name: 'ai_cv_builder_cv_data',
    }
  )
);
