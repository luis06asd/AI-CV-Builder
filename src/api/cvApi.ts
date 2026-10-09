import type { CVData } from '../types/cv.types';
import type { TemplateId } from '../types/template.types';
import {
  toCreateCVRequest,
  type CreateCVResponse,
} from '../types/api.types';
import { apiRequest } from './client';

export const createCV = (
  cv: CVData,
  template: TemplateId,
  password: string
): Promise<CreateCVResponse> =>
  apiRequest<CreateCVResponse>('/api/cvs', {
    method: 'POST',
    body: JSON.stringify(toCreateCVRequest(cv, template, password)),
  });
