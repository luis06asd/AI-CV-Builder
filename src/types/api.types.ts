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

export interface AccessCVResponse {
  access_token: string;
  cv: {
    id: number;
    access_code: number;
    title: string | null;
    full_name: string | null;
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
    created_at: string;
    updated_at: string;
    experiences: Array<Record<string, unknown>>;
    education: Array<Record<string, unknown>>;
    skills: Array<Record<string, unknown>>;
    languages: Array<Record<string, unknown>>;
    projects: Array<Record<string, unknown>>;
    certifications: Array<Record<string, unknown>>;
  };
}

export interface UpdateCVRequest extends Omit<CreateCVRequest, 'password'> {
  password?: string;
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

export const toUpdateCVRequest = (
  cv: CVData,
  template: TemplateId
): UpdateCVRequest => {
  const { password: _password, ...request } = toCreateCVRequest(cv, template, '');
  return request;
};
