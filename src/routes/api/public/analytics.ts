import { createFileRoute } from "@tanstack/react-router";

// Receives anonymous analytics beacons. Logs to server console so they show
// up in stack_modern--server-function-logs / hosting logs. No PII stored.
export const Route = createFileRoute("/api/public/analytics")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const text = await request.text();
          if (text && text.length < 4096) {
            // eslint-disable-next-line no-console
            console.log("[analytics]", text);
          }
        } catch {
          /* swallow */
        }
        return new Response(null, { status: 204 });
      },
    },
  },
});
