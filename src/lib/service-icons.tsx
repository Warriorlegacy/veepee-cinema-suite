import {
  Zap, Cog, Wrench, Building2, Sparkles, Factory, Shield, Droplets, Hammer,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Zap, Cog, Wrench, Building2, Sparkles, Factory, Shield, Droplets, Hammer,
};

export const ICON_NAMES = Object.keys(ICONS);

export function getServiceIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Zap;
  return ICONS[name] ?? Zap;
}
