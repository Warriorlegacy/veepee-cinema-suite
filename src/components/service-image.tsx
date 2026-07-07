import { useState, useMemo, type ImgHTMLAttributes } from "react";
import placeholder from "@/assets/placeholder-service.svg";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> & {
  src?: string | null;
  alt: string;
  eager?: boolean;
  /** Build a srcset when the URL matches the `<base>-<width>.jpg` convention. */
  responsive?: boolean;
};

const RESPONSIVE_WIDTHS = [400, 800, 1600];

function buildSrcSet(url: string): string | undefined {
  const m = url.match(/^(.+)-(\d+)\.jpg(\?.*)?$/);
  if (!m) return undefined;
  const base = m[1];
  const qs = m[3] ?? "";
  return RESPONSIVE_WIDTHS.map((w) => `${base}-${w}.jpg${qs} ${w}w`).join(", ");
}

/**
 * Service image with automatic placeholder fallback on missing URL / load error,
 * lazy loading, async decoding and sensible responsive `sizes`.
 */
export function ServiceImage({
  src,
  alt,
  eager = false,
  responsive = false,
  sizes = "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw",
  className,
  width = 1280,
  height = 800,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);
  const effective = !src || failed ? placeholder : src;
  const srcSet = useMemo(
    () => (responsive && !failed && src ? buildSrcSet(src) : undefined),
    [responsive, failed, src],
  );
  return (
    <img
      {...rest}
      src={effective}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : "auto"}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
