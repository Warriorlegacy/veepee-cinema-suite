import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Receives anonymous analytics beacons. Validates payload strictly and logs
// only sanitized, structured fields to prevent log injection / poisoning.
const AnalyticsSchema = z.object({
  event: z.string().min(1).max(64),
  path: z.string().max(256).optional(),
  ref: z.string().max(512).optional(),
  ts: z.number().int().nonnegative().optional(),
}).catchall(z.union([z.string().max(256), z.number(), z.boolean()]));

// Strip control characters (newlines, CR, ANSI escapes, etc.) from strings.
function sanitize(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").slice(0, 512);
  }
  return value;
}

export const Route = createFileRoute("/api/public/analytics")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const text = await request.text();
          if (!text || text.length > 4096) {
            return new Response(null, { status: 204 });
          }
          let json: unknown;
          try {
            json = JSON.parse(text);
          } catch {
            return new Response(null, { status: 204 });
          }
          const parsed = AnalyticsSchema.safeParse(json);
          if (!parsed.success) {
            return new Response(null, { status: 204 });
          }
          const clean: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(parsed.data)) {
            clean[k] = sanitize(v);
          }
          // eslint-disable-next-line no-console
          console.log("[analytics]", JSON.stringify(clean));
        } catch {
          /* swallow */
        }
        return new Response(null, { status: 204 });
      },
    },
  },
});
