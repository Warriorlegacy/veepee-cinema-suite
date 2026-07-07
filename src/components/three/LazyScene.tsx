import { lazy, Suspense } from "react";
import type { ComponentType } from "react";

function SceneFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black pointer-events-none animate-pulse" />
  );
}

export function lazyScene<T extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<T> }>
) {
  const Lazy = lazy(importFn);
  return (props: T) => (
    <Suspense fallback={<SceneFallback />}>
      <Lazy {...props} />
    </Suspense>
  );
}
