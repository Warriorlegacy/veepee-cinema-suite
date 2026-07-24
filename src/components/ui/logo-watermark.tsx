import logo from "@/assets/veepee-logo.png.asset.json";

interface LogoWatermarkProps {
  className?: string;
  opacity?: number;
  size?: number;
  position?: "center" | "top-right" | "bottom-right" | "top-left" | "bottom-left";
  glow?: boolean;
}

export function LogoWatermark({
  className = "",
  opacity = 0.08,
  size = 850,
  position = "center",
  glow = true,
}: LogoWatermarkProps) {
  const positionClasses = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-10 right-10",
    "bottom-right": "bottom-10 right-10",
    "top-left": "top-10 left-10",
    "bottom-left": "bottom-10 left-10",
  }[position];

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden
    >
      <img
        src={logo.url}
        alt=""
        width={size}
        height={size}
        className={`absolute logo-watermark-img object-contain transition-all duration-700 ${positionClasses}`}
        style={{
          opacity,
          width: `${size}px`,
          maxWidth: "85vw",
          filter: glow
            ? "grayscale(0.5) brightness(1.8) drop-shadow(0 0 50px rgba(212, 20, 142, 0.3))"
            : "grayscale(1) brightness(1.8)",
        }}
      />
    </div>
  );
}