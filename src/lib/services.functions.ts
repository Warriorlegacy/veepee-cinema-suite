import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string | null;
  sort_order: number;
};

export type ServiceImageRow = {
  id: string;
  service_id: string;
  url: string;
  caption: string | null;
  sort_order: number;
};

const BUCKET = "service-images";

/** Given a public storage URL, extract the object path within the bucket. */
function pathFromPublicUrl(url: string): string | null {
  const marker = `/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return decodeURIComponent(url.slice(idx + marker.length));
}

type GateSession = { unlocked?: boolean };

const sessionConfig = () => ({
  password: process.env.SESSION_SECRET!,
  name: "vp-admin",
  maxAge: 60 * 60 * 24 * 30,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
});

function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function requireUnlocked() {
  const session = await useSession<GateSession>(sessionConfig());
  if (!session.data.unlocked) {
    throw new Error("Unauthorized: admin session required");
  }
}

function serverSupabase() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

/* ─────────── Public: list services ─────────── */
export const listServices = createServerFn({ method: "GET" }).handler(
  async (): Promise<Service[]> => {
    const supabase = serverSupabase();
    const { data, error } = await supabase
      .from("services")
      .select("id, name, description, icon, image_url, sort_order")
      .order("sort_order", { ascending: true });
    if (error) {
      console.error("[listServices]", error);
      return [];
    }
    return data ?? [];
  },
);

/* ─────────── Public: get one service with gallery ─────────── */
export const getServiceDetail = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<{ service: Service; images: ServiceImageRow[] } | null> => {
    const supabase = serverSupabase();
    const { data: svc, error } = await supabase
      .from("services")
      .select("id, name, description, icon, image_url, sort_order")
      .eq("id", data.id)
      .maybeSingle();
    if (error || !svc) return null;
    const { data: images } = await supabase
      .from("service_images")
      .select("id, service_id, url, caption, sort_order")
      .eq("service_id", data.id)
      .order("sort_order", { ascending: true });
    return { service: svc, images: images ?? [] };
  });

/* ─────────── Public: list gallery images per service (used in admin) ─────────── */
export const listServiceImages = createServerFn({ method: "GET" })
  .inputValidator((data: { serviceId: string }) => data)
  .handler(async ({ data }): Promise<ServiceImageRow[]> => {
    const supabase = serverSupabase();
    const { data: rows, error } = await supabase
      .from("service_images")
      .select("id, service_id, url, caption, sort_order")
      .eq("service_id", data.serviceId)
      .order("sort_order", { ascending: true });
    if (error) return [];
    return rows ?? [];
  });

/* ─────────── Admin gate ─────────── */
export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env.SITE_PASSWORD;
    if (!expected) throw new Error("SITE_PASSWORD is not configured");
    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const };
    }
    const session = await useSession<GateSession>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const isAdminUnlocked = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useSession<GateSession>(sessionConfig());
    return { unlocked: !!session.data.unlocked };
  },
);

/* ─────────── Admin: create service ─────────── */
const ALLOWED_ICONS = [
  "Zap", "Cog", "Wrench", "Building2", "Sparkles",
  "Factory", "Shield", "Droplets", "Hammer",
];

export const createService = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error("Expected FormData");
    return data;
  })
  .handler(async ({ data }) => {
    await requireUnlocked();

    const name = String(data.get("name") ?? "").trim().slice(0, 120);
    const description = String(data.get("description") ?? "").trim().slice(0, 400);
    const iconRaw = String(data.get("icon") ?? "Zap");
    const icon = ALLOWED_ICONS.includes(iconRaw) ? iconRaw : "Zap";
    const file = data.get("image") as File | null;

    if (!name || !description) throw new Error("Name and description are required");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let image_url: string | null = null;
    if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB");
      const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const path = `uploads/${randomUUID()}.${ext}`;
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { error: upErr } = await supabaseAdmin.storage
        .from("service-images")
        .upload(path, bytes, {
          contentType: file.type || "image/jpeg",
          upsert: false,
        });
      if (upErr) throw new Error("Image upload failed: " + upErr.message);
      const { data: pub } = supabaseAdmin.storage
        .from("service-images")
        .getPublicUrl(path);
      image_url = pub.publicUrl;
    }

    // Next sort_order = max + 10
    const { data: maxRow } = await supabaseAdmin
      .from("services")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const sort_order = (maxRow?.sort_order ?? 0) + 10;

    const { error } = await supabaseAdmin.from("services").insert({
      name, description, icon, image_url, sort_order,
    });
    if (error) throw new Error(error.message);

    return { ok: true as const };
  });

export const deleteService = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("services").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/* ─────────── Admin: gallery image add / delete ─────────── */
const RESPONSIVE_WIDTHS = [400, 800, 1600] as const;

export const addServiceImage = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error("Expected FormData");
    return data;
  })
  .handler(async ({ data }) => {
    await requireUnlocked();

    const service_id = String(data.get("service_id") ?? "").trim();
    const caption = String(data.get("caption") ?? "").trim().slice(0, 160) || null;
    if (!service_id) throw new Error("Missing service_id");

    // Prefer client-resized variants (image_400 / image_800 / image_1600);
    // fall back to a single `image` when the client didn't resize.
    const variantFiles: { width: number; file: File }[] = [];
    for (const w of RESPONSIVE_WIDTHS) {
      const f = data.get(`image_${w}`);
      if (f && typeof f === "object" && "arrayBuffer" in f && (f as File).size > 0) {
        variantFiles.push({ width: w, file: f as File });
      }
    }
    if (variantFiles.length === 0) {
      const f = data.get("image") as File | null;
      if (!f || typeof f !== "object" || !("arrayBuffer" in f) || f.size === 0) {
        throw new Error("Please choose an image");
      }
      variantFiles.push({ width: 1600, file: f });
    }
    for (const { file } of variantFiles) {
      if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5 MB");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const baseId = randomUUID();
    let primaryUrl = "";
    for (const { width, file } of variantFiles) {
      const path = `gallery/${service_id}/${baseId}-${width}.jpg`;
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { error: upErr } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(path, bytes, { contentType: "image/jpeg", upsert: false });
      if (upErr) throw new Error("Image upload failed: " + upErr.message);
      const { data: pub } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
      if (width === 1600 || !primaryUrl) primaryUrl = pub.publicUrl;
    }

    const { data: maxRow } = await supabaseAdmin
      .from("service_images")
      .select("sort_order")
      .eq("service_id", service_id)
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const sort_order = (maxRow?.sort_order ?? 0) + 10;

    const { error } = await supabaseAdmin.from("service_images").insert({
      service_id, url: primaryUrl, caption, sort_order,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteServiceImage = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("service_images")
      .select("url")
      .eq("id", data.id)
      .maybeSingle();
    if (row?.url) {
      const path = pathFromPublicUrl(row.url);
      if (path && path.startsWith("gallery/")) {
        // Try to remove all responsive variants (<base>-<w>.jpg) plus the exact file.
        const paths = new Set<string>([path]);
        const m = path.match(/^(.+)-(\d+)\.jpg$/);
        if (m) {
          for (const w of [400, 800, 1600]) paths.add(`${m[1]}-${w}.jpg`);
        }
        await supabaseAdmin.storage.from(BUCKET).remove([...paths]);
      }
    }
    const { error } = await supabaseAdmin.from("service_images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
