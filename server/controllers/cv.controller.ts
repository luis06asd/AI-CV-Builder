import type { Request, Response } from 'express';
import {
  createCV,
  deleteCV,
  getCVById,
  updateCV,
} from '../services/cv.service.js';
import type { CreateCVInput, UpdateCVInput } from '../types/cv.types.js';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isOptionalString = (value: unknown): boolean =>
  value === undefined || value === null || typeof value === 'string';

const isValidEmail = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isBlankSectionItem = (value: Record<string, unknown>): boolean =>
  Object.entries(value)
    .filter(([field]) => field !== 'id' && field !== 'isCurrent')
    .every(([, fieldValue]) => {
      if (Array.isArray(fieldValue)) {
        return fieldValue.every(
          (item) => typeof item !== 'string' || item.trim().length === 0
        );
      }

      return (
        fieldValue === undefined ||
        fieldValue === null ||
        (typeof fieldValue === 'string' && fieldValue.trim().length === 0)
      );
    });

const mutableCVFields = [
  'title',
  'full_name',
  'job_title',
  'email',
  'phone',
  'location',
  'website',
  'linkedin',
  'github',
  'summary',
  'avatar_url',
  'template',
] as const;

const sectionFields = [
  'experiences',
  'education',
  'skills',
  'languages',
  'projects',
  'certifications',
] as const;

const isOptionalDate = (value: unknown): boolean =>
  value === undefined || value === null || typeof value === 'string';

const isValidSections = (value: Record<string, unknown>): boolean => {
  for (const field of sectionFields) {
    if (value[field] === undefined) {
      continue;
    }

    if (!Array.isArray(value[field])) {
      return false;
    }
  }

  const experiences = value.experiences;
  if (
    Array.isArray(experiences) &&
    experiences.some(
      (item) =>
        !isRecord(item) ||
        (!isBlankSectionItem(item) &&
          (!isNonEmptyString(item.company) || !isNonEmptyString(item.role))) ||
        (!isBlankSectionItem(item) &&
          (!isOptionalString(item.location) ||
            !isOptionalDate(item.startDate) ||
            !isOptionalDate(item.endDate) ||
            typeof item.isCurrent !== 'boolean' ||
            !isOptionalString(item.description) ||
            !Array.isArray(item.bulletPoints) ||
            item.bulletPoints.some((point) => typeof point !== 'string')))
    )
  ) {
    return false;
  }

  const education = value.education;
  if (
    Array.isArray(education) &&
    education.some(
      (item) =>
        !isRecord(item) ||
        (!isBlankSectionItem(item) &&
          (!isNonEmptyString(item.institution) ||
            !isNonEmptyString(item.degree) ||
            !isOptionalString(item.fieldOfStudy) ||
            !isOptionalString(item.location) ||
            !isOptionalDate(item.startDate) ||
            !isOptionalDate(item.endDate) ||
            typeof item.isCurrent !== 'boolean' ||
            !isOptionalString(item.gpaOrHonors) ||
            !isOptionalString(item.description)))
    )
  ) {
    return false;
  }

  const skills = value.skills;
  if (
    Array.isArray(skills) &&
    skills.some(
      (item) =>
        !isRecord(item) ||
        (!isBlankSectionItem(item) &&
          (!isNonEmptyString(item.name) || !isOptionalString(item.level)))
    )
  ) {
    return false;
  }

  const languages = value.languages;
  if (
    Array.isArray(languages) &&
    languages.some(
      (item) =>
        !isRecord(item) ||
        (!isBlankSectionItem(item) &&
          (!isNonEmptyString(item.name) ||
            !isNonEmptyString(item.proficiency)))
    )
  ) {
    return false;
  }

  const projects = value.projects;
  if (
    Array.isArray(projects) &&
    projects.some(
      (item) =>
        !isRecord(item) ||
        (!isBlankSectionItem(item) &&
          (!isNonEmptyString(item.name) ||
            !isOptionalString(item.description) ||
            !Array.isArray(item.technologies) ||
            item.technologies.some(
              (technology) => typeof technology !== 'string'
            ) ||
            !isOptionalString(item.link) ||
            !isOptionalDate(item.startDate) ||
            !isOptionalDate(item.endDate)))
    )
  ) {
    return false;
  }

  const certifications = value.certifications;
  return !(
    Array.isArray(certifications) &&
    certifications.some(
      (item) =>
        !isRecord(item) ||
        (!isBlankSectionItem(item) &&
          (!isNonEmptyString(item.name) ||
            !isOptionalString(item.issuer) ||
            !isOptionalDate(item.issueDate) ||
            !isOptionalDate(item.expiryDate) ||
            !isOptionalString(item.credentialId) ||
            !isOptionalString(item.credentialUrl)))
    )
  );
};

const isValidCVFields = (value: Record<string, unknown>): boolean => {
  return (
    Object.keys(value).every(
      (field) =>
        field === 'password' ||
        mutableCVFields.includes(field as (typeof mutableCVFields)[number]) ||
        sectionFields.includes(field as (typeof sectionFields)[number])
    ) &&
    mutableCVFields.every((field) => isOptionalString(value[field])) &&
    isValidEmail(value.email) &&
    isValidSections(value)
  );
};

const parseCVId = (value: string | string[]): number | null => {
  if (Array.isArray(value)) {
    return null;
  }

  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
};

export const createCVController = async (
  request: Request,
  response: Response
): Promise<void> => {
  if (!isRecord(request.body)) {
    response.status(400).json({ error: 'Request body must be an object.' });
    return;
  }

  const { password } = request.body;
  if (typeof password !== 'string' || password.length < 8) {
    response.status(400).json({ error: 'Password must contain at least 8 characters.' });
    return;
  }

  if (
    !isValidCVFields(request.body) ||
    !isNonEmptyString(request.body.title) ||
    !isNonEmptyString(request.body.full_name)
  ) {
    response.status(400).json({ error: 'CV fields contain invalid values.' });
    return;
  }

  const createdCV = await createCV(request.body as unknown as CreateCVInput);
  response.status(201).json(createdCV);
};

export const getCVController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const id = parseCVId(request.params.id);
  if (id === null) {
    response.status(400).json({ error: 'CV id must be a positive integer.' });
    return;
  }

  const cv = await getCVById(id);
  if (!cv) {
    response.status(404).json({ error: 'CV not found.' });
    return;
  }

  response.status(200).json(cv);
};

export const updateCVController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const id = parseCVId(request.params.id);
  if (id === null) {
    response.status(400).json({ error: 'CV id must be a positive integer.' });
    return;
  }

  if (!isRecord(request.body) || !isValidCVFields(request.body)) {
    response.status(400).json({ error: 'CV fields contain invalid values.' });
    return;
  }

  if (
    request.body.password !== undefined &&
    (typeof request.body.password !== 'string' || request.body.password.length < 8)
  ) {
    response.status(400).json({ error: 'Password must contain at least 8 characters.' });
    return;
  }

  if (
    (request.body.title !== undefined &&
      !isNonEmptyString(request.body.title)) ||
    (request.body.full_name !== undefined &&
      !isNonEmptyString(request.body.full_name))
  ) {
    response.status(400).json({ error: 'Title and full_name cannot be empty.' });
    return;
  }

  const input = request.body as unknown as UpdateCVInput;
  if (Object.keys(input).length === 0) {
    response.status(400).json({ error: 'At least one field is required.' });
    return;
  }

  const existingCV = await getCVById(id);
  if (!existingCV) {
    response.status(404).json({ error: 'CV not found.' });
    return;
  }

  const valueOrExisting = <K extends (typeof mutableCVFields)[number]>(
    field: K
  ): UpdateCVInput[K] =>
    Object.prototype.hasOwnProperty.call(input, field)
      ? input[field]
      : existingCV[field];

  const mergedInput: UpdateCVInput = {
    password: input.password,
    title: valueOrExisting('title'),
    full_name: valueOrExisting('full_name'),
    job_title: valueOrExisting('job_title'),
    email: valueOrExisting('email'),
    phone: valueOrExisting('phone'),
    location: valueOrExisting('location'),
    website: valueOrExisting('website'),
    linkedin: valueOrExisting('linkedin'),
    github: valueOrExisting('github'),
    summary: valueOrExisting('summary'),
    avatar_url: valueOrExisting('avatar_url'),
    template: valueOrExisting('template'),
    experiences: input.experiences,
    education: input.education,
    skills: input.skills,
    languages: input.languages,
    projects: input.projects,
    certifications: input.certifications,
  };

  const updatedCV = await updateCV(id, mergedInput);
  response.status(200).json(updatedCV);
};

export const deleteCVController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const id = parseCVId(request.params.id);
  if (id === null) {
    response.status(400).json({ error: 'CV id must be a positive integer.' });
    return;
  }

  const deleted = await deleteCV(id);
  if (!deleted) {
    response.status(404).json({ error: 'CV not found.' });
    return;
  }

  response.status(200).json({ message: 'CV deleted successfully.' });
};
