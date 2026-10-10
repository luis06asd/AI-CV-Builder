import type { APIErrorResponse } from '../types/api.types';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001').replace(
  /\/$/,
  ''
);

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const accessToken = sessionStorage.getItem('ai_cv_builder_access_token');
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as APIErrorResponse;
    throw new Error(errorBody.error || 'No fue posible completar la solicitud.');
  }

  return (await response.json()) as T;
};
