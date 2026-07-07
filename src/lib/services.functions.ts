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
