import type { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error('CV request failed:', message);
  response.status(500).json({ error: 'Internal server error.' });
};
