import { z } from "zod";

// ─── Indian Phone Validation ─────────────────────────────────────
export const indianPhoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export function validateIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().]/g, "");
  return indianPhoneRegex.test(cleaned);
}

export function cleanPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-().]/g, "");
  // Normalise to 10-digit number (strip +91 prefix if present)
  return cleaned.replace(/^\+91/, "").replace(/^91(?=[6-9])/, "");
}

// ─── Shared Field Schemas ─────────────────────────────────────────
const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(80, "Name is too long")
  .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid name");

const phoneSchema = z
  .string()
  .min(10, "Enter a valid 10-digit Indian mobile number")
  .refine(validateIndianPhone, {
    message:
      "Please enter a valid Indian mobile number (starting with 6, 7, 8, or 9)",
  });

const emailSchema = z.string().email("Please enter a valid email address");

// ─── Enquiry / Lead Form ──────────────────────────────────────────
export const enquirySchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  projectInterest: z.string().optional(),
  message: z.string().max(500, "Message too long").optional(),
  source: z
    .enum([
      "Project Page",
      "Blog Page",
      "Contact Page",
      "Home Page",
      "Career Page",
    ])
    .default("Project Page"),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// ─── Contact Form ─────────────────────────────────────────────────
export const contactSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  subject: z.string().min(3, "Subject is required").max(150),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// ─── Career Form ──────────────────────────────────────────────────
export const careerSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: emailSchema,
  experience: z.string().min(1, "Please specify your experience"),
  position: z.string().optional(),
  coverLetter: z.string().max(1500, "Cover letter is too long").optional(),
  recaptchaToken: z.string().min(1, "reCAPTCHA verification failed"),
});

// ─── Types inferred from schemas ──────────────────────────────────
export type EnquiryInput = z.infer<typeof enquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CareerInput = z.infer<typeof careerSchema>;
