import type { CVData } from './cv.types';
import type { TemplateId } from './template.types';

export interface CreateCVRequest {
  password: string;
  title: string;
  full_name: string;
  job_title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  avatar_url?: string;
  template: TemplateId;
  experiences: CVData['experiences'];
  education: CVData['educations'];
  skills: CVData['skills'];
  languages: CVData['languages'];
  projects: CVData['projects'];
  certifications: CVData['certifications'];
}

export interface CreateCVResponse {
  id: number;
  access_code: number;
}

export interface APIErrorResponse {
  error?: string;
}

export const toCreateCVRequest = (
  cv: CVData,
  template: TemplateId,
  password: string
): CreateCVRequest => ({
  password,
  title: cv.title.trim(),
  full_name: cv.personalInfo.fullName.trim(),
  job_title: cv.personalInfo.jobTitle.trim(),
  email: cv.personalInfo.email.trim(),
  phone: cv.personalInfo.phone.trim(),
  location: cv.personalInfo.location.trim(),
  website: cv.personalInfo.website?.trim() || undefined,
  linkedin: cv.personalInfo.linkedin?.trim() || undefined,
  github: cv.personalInfo.github?.trim() || undefined,
  summary: cv.personalInfo.summary.trim(),
  avatar_url: cv.personalInfo.avatarUrl?.trim() || undefined,
  template,
  experiences: cv.experiences,
  education: cv.educations,
  skills: cv.skills,
  languages: cv.languages,
  projects: cv.projects,
  certifications: cv.certifications,
});
