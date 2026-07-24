import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "veepee-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto md:mx-4 md:right-auto">
      <div className="glass rounded-xl p-4 flex items-start gap-3 shadow-deep border border-white/10">
        <p className="flex-1 text-xs text-metallic font-body leading-relaxed">
          This site uses cookies to improve your experience. By continuing you accept our{" "}
          <a href="/privacy" className="text-magenta underline">privacy policy</a>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="px-3 py-1.5 text-xs font-sans-brand uppercase tracking-[0.2em] bg-magenta-gradient text-white rounded-md"
          >
            Accept
          </button>
          <button onClick={accept} aria-label="Close" className="text-metallic hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}