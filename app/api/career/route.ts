import { NextRequest, NextResponse } from "next/server";
import { careerSchema } from "@/lib/validators";
import { adminDb } from "@/lib/firebase-admin";
import { verifyRecaptcha } from "@/lib/recaptcha";
import * as admin from "firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeUrl, ...rest } = body;
    const parsed = careerSchema.safeParse(rest);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const { recaptchaToken, ...data } = parsed.data;

    const { success: isHuman } = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { success: false, error: "Bot verification failed. Please try again." },
        { status: 403 },
      );
    }

    const ref = await adminDb.collection("career_applications").add({
      name: data.name,
      phone: data.phone,
      email: data.email,
      experience: data.experience,
      jobTitle: data.position || "",
      coverLetter: data.coverLetter || "",
      resumeUrl: resumeUrl || "",
      status: "New",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, data: { id: ref.id } });
  } catch (err) {
    console.error("[Career API] Error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit application. Please try again.",
      },
      { status: 500 },
    );
  }
}
