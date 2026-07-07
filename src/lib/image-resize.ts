/**
 * Client-side image validation + downscaling.
 * Produces a set of JPEG blobs at target widths, preserving aspect ratio.
 * Never upscales — a variant is skipped if the source is already smaller.
 */

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type as typeof ACCEPTED_IMAGE_TYPES[number])) {
    return "Only JPG, PNG or WebP images are allowed.";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "Image must be under 5 MB.";
  }
  return null;
}

export type ResizedVariant = { width: number; blob: Blob };

export const GALLERY_WIDTHS = [400, 800, 1600] as const;

async function drawResized(bitmap: ImageBitmap, targetW: number): Promise<Blob> {
  const scale = Math.min(1, targetW / bitmap.width);
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(w, h);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not available");
    ctx.drawImage(bitmap, 0, 0, w, h);
    return await canvas.convertToBlob({ type: "image/jpeg", quality: 0.85 });
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");
  ctx.drawImage(bitmap, 0, 0, w, h);
  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
      "image/jpeg",
      0.85,
    ),
  );
}

export async function resizeToVariants(
  file: File,
  widths: readonly number[] = GALLERY_WIDTHS,
): Promise<ResizedVariant[]> {
  const bitmap = await createImageBitmap(file);
  try {
    const out: ResizedVariant[] = [];
    const seen = new Set<number>();
    for (const w of widths) {
      const effective = Math.min(w, bitmap.width);
      if (seen.has(effective)) continue;
      seen.add(effective);
      out.push({ width: effective, blob: await drawResized(bitmap, effective) });
    }
    return out;
  } finally {
    bitmap.close?.();
  }
}
