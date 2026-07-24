import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 p-2 text-white/60 hover:text-white z-10"
      >
        <X className="h-6 w-6" />
      </button>

      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white z-10"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      <img
        src={images[index]}
        alt={`Image ${index + 1}`}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {index < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white z-10"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans-brand text-xs text-white/60 tracking-[0.2em]">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}