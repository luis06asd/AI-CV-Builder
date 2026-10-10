import type { RequestHandler } from 'express';
import { verifyAccessToken } from '../services/access-token.service.js';

declare global {
  namespace Express {
    interface Request {
      cvAccess?: { cvId: number };
    }
  }
}

export const requireCVAccess: RequestHandler = (request, response, next) => {
  const authorization = request.header('authorization');
  const token =
    authorization?.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
  const claims = token ? verifyAccessToken(token) : null;

  if (!claims) {
    response.status(401).json({ error: 'CV access is required or has expired.' });
    return;
  }

  const requestedId = Number(request.params.id);
  if (!Number.isSafeInteger(requestedId) || requestedId !== claims.cvId) {
    response.status(403).json({ error: 'You are not authorized to access this CV.' });
    return;
  }

  request.cvAccess = { cvId: claims.cvId };
  next();
};
