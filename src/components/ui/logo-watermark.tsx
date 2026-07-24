import logo from "@/assets/veepee-logo.png.asset.json";

interface LogoWatermarkProps {
  className?: string;
  opacity?: number;
  size?: number;
}

export function LogoWatermark({ className = "", opacity = 0.04, size = 400 }: LogoWatermarkProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden
    >
      <img
        src={logo.url}
        alt=""
        width={size}
        height={size}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
        style={{ opacity, filter: "grayscale(1) brightness(2)" }}
      />
    </div>
  );
}