'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready:   (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

/**
 * Loads the reCAPTCHA v3 script once and exposes an `execute` function
 * that returns a token for a given action name.
 */
export function useRecaptcha() {
  const execute = useCallback((action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Load script if not already present
      if (!document.getElementById('recaptcha-script')) {
        const script      = document.createElement('script');
        script.id         = 'recaptcha-script';
        script.src        = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
        script.async      = true;
        script.onerror    = () => reject(new Error('Failed to load reCAPTCHA'));
        document.head.appendChild(script);
      }

      const attempt = () => {
        if (typeof window.grecaptcha === 'undefined') {
          setTimeout(attempt, 200);
          return;
        }
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, { action });
            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      };

      attempt();
    });
  }, []);

  return { execute };
}
