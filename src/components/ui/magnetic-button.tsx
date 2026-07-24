import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({
  children,
  as: Tag = "button",
  href,
  target,
  rel,
  onClick,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dist = Math.sqrt(x * x + y * y);
    const maxDist = 150;
    const strength = Math.min(1, dist / maxDist);
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(${1 + (1 - strength) * 0.02})`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const props = Tag === "a" ? { href, target, rel } : { onClick };

  return (
    <div
      ref={ref}
      className="inline-block transition-transform duration-200 ease-out"
      onMouseMove={move}
      onMouseLeave={reset}
    >
      <Tag {...props} className={className}>
        {children}
      </Tag>
    </div>
  );
}