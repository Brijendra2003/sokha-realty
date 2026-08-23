import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators';
import { adminDb } from '@/lib/firebase-admin';
import { appendLeadToSheet } from '@/lib/googleSheets';
import { verifyRecaptcha } from '@/lib/recaptcha';
import * as admin from 'firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { recaptchaToken, ...data } = parsed.data;

    const { success: isHuman } = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { success: false, error: 'Bot verification failed. Please try again.' },
        { status: 403 }
      );
    }

    const ref = await adminDb.collection('leads').add({
      name:      data.name,
      phone:     data.phone,
      email:     data.email,
      message:   `[${data.subject}] ${data.message}`,
      source:    'Contact Page',
      stage:     'New',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    try {
      await appendLeadToSheet({
        name:      data.name,
        phone:     data.phone,
        email:     data.email,
        message:   `[${data.subject}] ${data.message}`,
        source:    'Contact Page',
        stage:     'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (sheetErr) {
      console.error('[Contact API] Sheets sync failed:', sheetErr);
    }

    return NextResponse.json({ success: true, data: { id: ref.id } });
  } catch (err) {
    console.error('[Contact API] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
