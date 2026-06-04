// Lightweight, privacy-friendly analytics. No cookies. Sends a beacon to
// /api/public/analytics when available; safely no-ops otherwise.

type EventPayload = Record<string, string | number | boolean | undefined>;

const ENDPOINT = "/api/public/analytics";

function send(event: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      event,
      path: window.location.pathname,
      ref: document.referrer || undefined,
      ts: Date.now(),
      ...payload,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
    } else {
      fetch(ENDPOINT, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
    }
  } catch {
    /* swallow */
  }
}

export function trackPageView() {
  send("pageview");
}

export function trackEvent(event: string, payload: EventPayload = {}) {
  send(event, payload);
}
