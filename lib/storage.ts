/**
 * lib/storage.ts  — CLIENT-SAFE upload helpers
 *
 * This file is imported by client components ('use client').
 * It must NOT import any Node.js-only packages (cloudinary, fs, etc.).
 * All uploads go through /api/upload which runs server-side.
 */

export type UploadProgress = (progress: number) => void;

/**
 * Upload a file to Cloudinary via the /api/upload route.
 * Safe to call from any client component.
 */
export async function uploadFile(
  file: File,
  path: string,
  onProgress?: UploadProgress
): Promise<string> {
  onProgress?.(10);

  // Derive folder and publicId from the path string
  // e.g. "projects/my-project/123-elevation.jpg"
  //   →  folder:   "sokha-realty/projects/my-project"
  //      publicId: "123-elevation"
  const parts = path.split("/");
  const filename = parts.pop()!;
  const folder = `sokha-realty/${parts.join("/")}`;
  const publicId = filename.replace(/\.[^.]+$/, ""); // strip extension

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  formData.append("publicId", publicId);

  onProgress?.(30);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  onProgress?.(90);

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error((json as { error?: string }).error ?? "Upload failed");
  }

  const data = (await res.json()) as { url: string };

  onProgress?.(100);
  return data.url;
}

/**
 * Generate a deterministic storage path string.
 * Used as the Cloudinary folder + public_id inside uploadFile().
 *
 * e.g. makeStoragePath('projects', 'my-slug', file)
 *   →  "projects/my-slug/1718000000000-elevation.jpg"
 */
export function makeStoragePath(
  folder: string,
  slug: string,
  file: File
): string {
  const ext = file.name.split(".").pop() ?? "jpg";
  const name = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
  return `${folder}/${slug}/${Date.now()}-${name}.${ext}`;
}

// NOTE: deleteFileByUrl() has been intentionally removed from this file.
// Deleting Cloudinary assets is a server-only operation.
// If you need to delete an image, call cloudinary.uploader.destroy()
// directly inside an API route — see lib/cloudinary.ts.
