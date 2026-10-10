import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const TOKEN_TTL_SECONDS = 60 * 60 * 2;

const getTokenSecret = (): string => {
  const secret = process.env.CV_ACCESS_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('CV_ACCESS_TOKEN_SECRET must contain at least 32 characters.');
  }
  return secret;
};

const sign = (payload: string): string =>
  createHmac('sha256', getTokenSecret()).update(payload).digest('base64url');

export interface AccessTokenClaims {
  cvId: number;
  expiresAt: number;
}

export const createAccessToken = (cvId: number): string => {
  const payload = `${cvId}.${Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS}.${randomBytes(16).toString('base64url')}`;
  return `${payload}.${sign(payload)}`;
};

export const verifyAccessToken = (token: string): AccessTokenClaims | null => {
  const parts = token.split('.');
  if (parts.length !== 4) return null;

  const [cvIdValue, expiresValue, nonce, signature] = parts;
  const payload = `${cvIdValue}.${expiresValue}.${nonce}`;
  const expectedSignature = sign(payload);

  if (
    signature.length !== expectedSignature.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    return null;
  }

  const cvId = Number(cvIdValue);
  const expiresAt = Number(expiresValue);
  if (
    !Number.isSafeInteger(cvId) ||
    cvId < 1 ||
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  return { cvId, expiresAt };
};
