import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary-config";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "sokha-realty/misc";
    const publicId = formData.get("publicId") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Convert File → Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine resource type
    const isResume = file.type.includes("pdf") || file.type.includes("word");
    const resourceType = isResume ? "raw" : "image";

    // Upload to Cloudinary
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            ...(publicId ? { public_id: publicId } : {}),
            resource_type: resourceType,
            // Auto-optimize images
            ...(resourceType === "image" && {
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            }),
          },
          (error, result) => {
            if (error || !result) reject(error ?? new Error("Upload failed"));
            else resolve(result as { secure_url: string; public_id: string });
          },
        );
        uploadStream.end(buffer);
      },
    );

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("[Upload API] Error:", err);
    return NextResponse.json(
      { success: false, error: "Upload failed. Please try again." },
      { status: 500 },
    );
  }
}

// Allow up to 10MB uploads
// export const config = {
//   api: { bodyParser: false },
// };
