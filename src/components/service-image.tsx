import { useState, useMemo, type ImgHTMLAttributes } from "react";
import placeholder from "@/assets/placeholder-service.svg";

// Import local service images (both generated PNGs and existing JPGs)
import laserCutting from "@/assets/service-laser-cutting.png";
import cncFabrication from "@/assets/service-cnc-fabrication.png";
import engineeringComponents from "@/assets/service-engineering-components.png";
import gatesRailings from "@/assets/service-gates-railings.png";
import architecturalMetal from "@/assets/service-architectural-metal.png";
import industrialManufacturing from "@/assets/service-industrial-manufacturing.png";
import hotDipGalvanized from "@/assets/service-hot-dip-galvanized.png";
import tubewellFittings from "@/assets/service-tubewell-fittings.png";
import powderCoating from "@/assets/service-powder-coating.jpg";
import plateBending from "@/assets/service-plate-bending.jpg";
import pipeRolling from "@/assets/service-pipe-rolling.jpg";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onError"> & {
  src?: string | null;
  alt: string;
  eager?: boolean;
  /** Build a srcset when the URL matches the `<base>-<width>.jpg` convention. */
  responsive?: boolean;
};

// Map service IDs and lowercased names to local imports
const LOCAL_MAPPINGS: Record<string, string> = {
  // Mapping by Supabase UUIDs
  "5300a1c0-ad1d-4b15-89b5-1f847d2922d8": laserCutting,
  "b86b9ae1-2a73-4aa2-bbb8-bceb6abd5661": cncFabrication,
  "344202eb-a66d-49de-b082-41198736eba5": engineeringComponents,
  "f1f4cf46-0dd1-4e75-928d-e05347ad98d6": gatesRailings,
  "3d525269-6ee0-448c-963a-7c731854bb62": architecturalMetal,
  "65ac2c65-492f-4e8b-8a97-525abb49baf4": industrialManufacturing,
  "5b4ce05b-4ed8-4f8b-a20e-1479ef0631e6": hotDipGalvanized,
  "ec5ac136-c055-4cea-ae77-344f310f4405": tubewellFittings,
  "900e626e-7e2e-4353-a716-2c31298091a4": powderCoating,
  "28eb02f4-6388-4b01-b649-234cdfbcc5c2": plateBending,
  "d89a6998-dc01-4b8d-893b-acf5571d3214": pipeRolling,

  // Mapping by service name (lowercased)
  "laser cutting": laserCutting,
  "cnc fabrication": cncFabrication,
  "engineering components": engineeringComponents,
  "gates & railings": gatesRailings,
  "architectural metal": architecturalMetal,
  "industrial manufacturing": industrialManufacturing,
  "hot dip galvanized": hotDipGalvanized,
  "tubewell fittings": tubewellFittings,
  "powder coating": powderCoating,
  "plate bending": plateBending,
  "pipe rolling": pipeRolling,
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
  const matchedLocal = useMemo(() => {
    if (src) {
      for (const [key, val] of Object.entries(LOCAL_MAPPINGS)) {
        if (src.includes(key)) return val;
      }
    }
    const altLower = alt.toLowerCase().trim();
    if (LOCAL_MAPPINGS[altLower]) {
      return LOCAL_MAPPINGS[altLower];
    }
    return null;
  }, [src, alt]);

  const [failed, setFailed] = useState(false);
  const effective = matchedLocal || !src || failed ? (matchedLocal || placeholder) : src;
  const srcSet = useMemo(
    () => (responsive && !failed && src && !matchedLocal ? buildSrcSet(src) : undefined),
    [responsive, failed, src, matchedLocal],
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

