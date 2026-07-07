import { useState, type ImgHTMLAttributes } from "react";
import placeholder from "@/assets/placeholder-service.svg";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> & {
  src?: string | null;
  alt: string;
  eager?: boolean;
};

/**
 * Service image with automatic placeholder fallback on missing URL / load error,
 * lazy loading, async decoding and sensible responsive `sizes`.
 */
export function ServiceImage({
  src,
  alt,
  eager = false,
  sizes = "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw",
  className,
  width = 1280,
  height = 800,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);
  const effective = !src || failed ? placeholder : src;
  return (
    <img
      {...rest}
      src={effective}
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
