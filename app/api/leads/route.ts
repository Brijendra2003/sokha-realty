import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validators';
import { adminDb } from '@/lib/firebase-admin';
import { appendLeadToSheet } from '@/lib/googleSheets';
import { verifyRecaptcha } from '@/lib/recaptcha';
import * as admin from 'firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { recaptchaToken, ...data } = parsed.data;

    // ── Verify reCAPTCHA ──────────────────────────────────────────
    const { success: isHuman } = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { success: false, error: 'Bot verification failed. Please try again.' },
        { status: 403 }
      );
    }

    // ── Save to Firestore ─────────────────────────────────────────
    const leadDoc = {
      name:            data.name,
      phone:           data.phone,
      email:           data.email || '',
      projectInterest: data.projectInterest || '',
      message:         data.message || '',
      source:          data.source,
      stage:           'New' as const,
      createdAt:       admin.firestore.FieldValue.serverTimestamp(),
      updatedAt:       admin.firestore.FieldValue.serverTimestamp(),
    };

    const ref = await adminDb.collection('leads').add(leadDoc);

    // ── Sync to Google Sheets (non-blocking on failure) ────────────
    try {
      await appendLeadToSheet({
        name:            data.name,
        phone:           data.phone,
        email:           data.email,
        projectInterest: data.projectInterest,
        message:         data.message,
        source:          data.source,
        stage:           'New',
        createdAt:       new Date().toISOString(),
        updatedAt:       new Date().toISOString(),
      });
    } catch (sheetErr) {
      console.error('[Leads API] Google Sheets sync failed:', sheetErr);
      // Don't fail the request — lead is already saved in Firestore
    }

    return NextResponse.json({ success: true, data: { id: ref.id } });
  } catch (err) {
    console.error('[Leads API] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
