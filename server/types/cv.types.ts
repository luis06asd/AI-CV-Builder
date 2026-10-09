export interface ExperienceInput {
  company: string;
  role: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  bulletPoints: string[];
}

export interface EducationInput {
  institution: string;
  degree: string;
  fieldOfStudy?: string | null;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  gpaOrHonors?: string | null;
  description?: string | null;
}

export interface SkillInput {
  name: string;
  category?: string | null;
  level?: string | null;
}

export interface LanguageInput {
  name: string;
  proficiency: string;
}

export interface ProjectInput {
  name: string;
  description?: string | null;
  technologies: string[];
  link?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface CertificationInput {
  name: string;
  issuer?: string | null;
  issueDate?: string | null;
  expiryDate?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
}

export interface CVSectionsInput {
  experiences: ExperienceInput[];
  education: EducationInput[];
  skills: SkillInput[];
  languages: LanguageInput[];
  projects: ProjectInput[];
  certifications: CertificationInput[];
}

export interface CreateCVInput {
  password: string;
  title?: string;
  full_name?: string;
  job_title?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  avatar_url?: string;
  template?: string;
  experiences: ExperienceInput[];
  education: EducationInput[];
  skills: SkillInput[];
  languages: LanguageInput[];
  projects: ProjectInput[];
  certifications: CertificationInput[];
}

export interface UpdateCVInput {
  password?: string;
  title?: string | null;
  full_name?: string | null;
  job_title?: string | null;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  github?: string | null;
  summary?: string | null;
  avatar_url?: string | null;
  template?: string | null;
  experiences?: ExperienceInput[];
  education?: EducationInput[];
  skills?: SkillInput[];
  languages?: LanguageInput[];
  projects?: ProjectInput[];
  certifications?: CertificationInput[];
}

export interface PublicCV {
  id: number;
  access_code: number;
  title: string;
  full_name: string;
  job_title: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  website: string | null;
  linkedin: string | null;
  github: string | null;
  summary: string | null;
  avatar_url: string | null;
  template: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreatedCV {
  id: number;
  access_code: number;
}
