import type { APIErrorResponse } from '../types/api.types';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001').replace(
  /\/$/,
  ''
);

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as APIErrorResponse;
    throw new Error(errorBody.error || 'No fue posible completar la solicitud.');
  }

  return (await response.json()) as T;
};
