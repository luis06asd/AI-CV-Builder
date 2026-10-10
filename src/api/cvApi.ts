import type {
  CertificationItem,
  CVData,
  EducationItem,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
  SkillItem,
} from '../types/cv.types';
import type { TemplateId } from '../types/template.types';
import {
  toCreateCVRequest,
  toUpdateCVRequest,
  type AccessCVResponse,
  type CreateCVResponse,
} from '../types/api.types';
import { apiRequest } from './client';

export const clearCVAccessToken = (): void => {
  sessionStorage.removeItem('ai_cv_builder_access_token');
};

export const createCV = (
  cv: CVData,
  template: TemplateId,
  password: string
): Promise<CreateCVResponse> =>
  apiRequest<CreateCVResponse>('/api/cvs', {
    method: 'POST',
    body: JSON.stringify(toCreateCVRequest(cv, template, password)),
  });

export const updateCV = (cv: CVData, template: TemplateId): Promise<unknown> =>
  apiRequest(`/api/cvs/${cv.id}`, {
    method: 'PUT',
    body: JSON.stringify(toUpdateCVRequest(cv, template)),
  });

const asString = (value: unknown): string =>
  value === null || value === undefined ? '' : String(value);

const asId = (value: unknown, fallback: number): string =>
  value === undefined || value === null ? `loaded-${fallback}` : String(value);

export const accessCV = async (
  accessCode: string,
  password: string
): Promise<{ cv: CVData; template: string | null }> => {
  const result = await apiRequest<AccessCVResponse>('/api/cvs/access', {
    method: 'POST',
    body: JSON.stringify({ access_code: accessCode, password }),
  });
  sessionStorage.setItem('ai_cv_builder_access_token', result.access_token);
  const raw = result.cv;
  const cv: CVData = {
    id: String(raw.id),
    title: asString(raw.title),
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    personalInfo: {
      fullName: asString(raw.full_name),
      jobTitle: asString(raw.job_title),
      email: asString(raw.email),
      phone: asString(raw.phone),
      location: asString(raw.location),
      website: asString(raw.website),
      linkedin: asString(raw.linkedin),
      github: asString(raw.github),
      summary: asString(raw.summary),
      avatarUrl: asString(raw.avatar_url),
    },
    experiences: raw.experiences.map((item, index) => ({
      id: asId(item.id, index),
      company: asString(item.company),
      role: asString(item.role),
      location: asString(item.location),
      startDate: asString(item.startDate),
      endDate: item.endDate == null ? undefined : String(item.endDate),
      isCurrent: Boolean(item.isCurrent),
      description: asString(item.description),
      bulletPoints: Array.isArray(item.bulletPoints) ? item.bulletPoints.map(String) : [],
    })) as ExperienceItem[],
    educations: raw.education.map((item, index) => ({
      id: asId(item.id, index),
      institution: asString(item.institution),
      degree: asString(item.degree),
      fieldOfStudy: asString(item.fieldOfStudy),
      location: asString(item.location),
      startDate: asString(item.startDate),
      endDate: asString(item.endDate),
      isCurrent: Boolean(item.isCurrent),
      gpaOrHonors: asString(item.gpaOrHonors),
      description: asString(item.description),
    })) as EducationItem[],
    skills: raw.skills.map((item, index) => ({
      id: asId(item.id, index),
      name: asString(item.name),
      category: 'technical',
      level: item.level as SkillItem['level'],
    })),
    languages: raw.languages.map((item, index) => ({
      id: asId(item.id, index),
      name: asString(item.name),
      proficiency: item.proficiency as LanguageItem['proficiency'],
    })),
    projects: raw.projects.map((item, index) => ({
      id: asId(item.id, index),
      name: asString(item.name),
      description: asString(item.description),
      technologies: Array.isArray(item.technologies) ? item.technologies.map(String) : [],
      link: asString(item.link),
      startDate: item.startDate as string | undefined,
      endDate: item.endDate as string | undefined,
    })) as ProjectItem[],
    certifications: raw.certifications.map((item, index) => ({
      id: asId(item.id, index),
      name: asString(item.name),
      issuer: asString(item.issuer),
      issueDate: asString(item.issueDate),
      expiryDate: item.expiryDate as string | undefined,
      credentialId: item.credentialId as string | undefined,
      credentialUrl: item.credentialUrl as string | undefined,
    })) as CertificationItem[],
    sectionVisibility: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      languages: true,
      projects: true,
      certifications: true,
    },
  };
  return { cv, template: raw.template };
};
