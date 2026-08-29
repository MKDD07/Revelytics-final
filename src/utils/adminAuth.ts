/**
 * Admin Authentication & Security Utilities
 * Powered by Web Crypto API (Cloudflare Workers & Browser compatible)
 */

const SECRET_SALT = 'revlytics-admin-salt-2026-sec';

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SECRET_SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, expectedHash: string): Promise<boolean> {
  const computedHash = await hashPassword(password);
  return computedHash === expectedHash;
}

export function encodeApiKey(apiKey: string): string {
  if (!apiKey) return '';
  return btoa(apiKey);
}

export function decodeApiKey(encoded: string): string {
  if (!encoded) return '';
  try {
    return atob(encoded);
  } catch {
    return encoded;
  }
}

export async function generateSessionToken(username: string): Promise<string> {
  const payload = {
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    nonce: Math.random().toString(36).substring(2),
  };
  const str = JSON.stringify(payload);
  const base64 = btoa(str);
  const signature = await hashPassword(base64);
  return `${base64}.${signature}`;
}

export async function verifySessionToken(token: string): Promise<{ valid: boolean; username?: string }> {
  if (!token) return { valid: false };
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return { valid: false };
    const [base64, signature] = parts;
    const expectedSignature = await hashPassword(base64);
    if (signature !== expectedSignature) return { valid: false };

    const payload = JSON.parse(atob(base64));
    if (payload.exp < Date.now()) {
      return { valid: false };
    }
    return { valid: true, username: payload.username };
  } catch {
    return { valid: false };
  }
}
