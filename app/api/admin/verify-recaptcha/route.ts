import { NextRequest, NextResponse } from 'next/server';
import { verifyRecaptcha } from '@/lib/recaptcha';

const ADMIN_LOGIN_THRESHOLD = 0.5;
const ADMIN_LOGIN_ACTION = 'admin_login';

/**
 * Verifies a reCAPTCHA v3 token before the client is allowed to attempt
 * a Firebase Auth sign-in on the admin login page. Firebase Auth's
 * signInWithEmailAndPassword runs entirely client-side, so this route
 * is the only place we can check the token server-side before the
 * credentials are sent to Firebase.
 */
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Missing reCAPTCHA token.' },
        { status: 400 },
      );
    }

    const result = await verifyRecaptcha(token, {
      threshold: ADMIN_LOGIN_THRESHOLD,
      expectedAction: ADMIN_LOGIN_ACTION,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Bot verification failed. Please try again.' },
        { status: 403 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Admin reCAPTCHA] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Verification failed. Please try again.' },
      { status: 500 },
    );
  }
}
