import { useEffect, useRef } from "react";

export function CursorFollower() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const move = (e: MouseEvent) => {
      if (!dot.current) return;
      dot.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };
    const over = (e: Event) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [role=button], input, select, textarea, [data-cursor]");
      if (!dot.current) return;
      dot.current.style.width = clickable ? "24px" : "8px";
      dot.current.style.height = clickable ? "24px" : "8px";
      dot.current.style.borderColor = clickable ? "rgba(212,20,142,0.6)" : "rgba(212,20,142,0.4)";
      dot.current.style.backgroundColor = clickable ? "rgba(212,20,142,0.08)" : "transparent";
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      ref={dot}
      className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full border transition-[width,height,background,border-color] duration-150"
      style={{
        width: 8,
        height: 8,
        borderColor: "rgba(212,20,142,0.4)",
        borderWidth: 1.5,
        boxShadow: "0 0 12px rgba(212,20,142,0.3)",
        willChange: "transform",
      }}
      aria-hidden
    />
  );
}