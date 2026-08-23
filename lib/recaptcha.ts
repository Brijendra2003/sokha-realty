/**
 * lib/recaptcha.ts
 *
 * Shared server-side reCAPTCHA v3 verification. Previously this same
 * function was copy-pasted into app/api/contact, app/api/career, and
 * app/api/leads — centralised here so there's one implementation to
 * maintain, and so it can be reused (e.g. by the admin login route).
 */

const DEFAULT_THRESHOLD = 0.5;

interface RecaptchaResult {
  success: boolean;
  score?: number;
  action?: string;
}

export async function verifyRecaptcha(
  token: string,
  options?: { threshold?: number; expectedAction?: string },
): Promise<RecaptchaResult> {
  const threshold = options?.threshold ?? DEFAULT_THRESHOLD;

  if (!token) return { success: false };

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY!,
        response: token,
      }),
    });
    const json = await res.json();

    const scoreOk = json.success === true && (json.score ?? 0) >= threshold;
    const actionOk = options?.expectedAction
      ? json.action === options.expectedAction
      : true;

    return { success: scoreOk && actionOk, score: json.score, action: json.action };
  } catch {
    return { success: false };
  }
}
