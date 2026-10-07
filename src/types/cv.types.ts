// ==========================================
// 1. INFORMACIÓN PERSONAL Y PERFIL
// ==========================================
export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  avatarUrl?: string;
}

// ==========================================
// 2. EXPERIENCIA LABORAL
// ==========================================
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string; // Opcional, ya que isCurrent indica si continúa actualmente
  isCurrent: boolean;
  description: string;
  bulletPoints: string[];
}

// ==========================================
// 3. EDUCACIÓN
// ==========================================
export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpaOrHonors?: string;
  description?: string;
}

// ==========================================
// 4. HABILIDADES
// ==========================================
export type SkillCategory = 'technical' | 'soft' | 'tools' | 'other';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level?: SkillLevel;
}

// ==========================================
// 5. IDIOMAS
// ==========================================
export type LanguageProficiency =
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'native';

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

// ==========================================
// 6. PROYECTOS
// ==========================================
export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  role?: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

// ==========================================
// 7. CERTIFICACIONES
// ==========================================
export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

// ==========================================
// 8. VISIBILIDAD DE SECCIONES
// ==========================================
export interface SectionVisibility {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  languages: boolean;
  projects: boolean;
  certifications: boolean;
}

// ==========================================
// 9. MODELO RAÍZ DEL CV
// ==========================================
export interface CVData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  educations: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  sectionVisibility: SectionVisibility;
}
