import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  Hero, TrustBar, Services, Products, Process,
  FeaturedProject, Workshop, IndustriesTicker, Testimonials, ContactCTA,
} from "@/components/home-sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEEPEE Engineers — Precision Laser Cutting & CNC Fabrication · Varanasi" },
      { name: "description", content: "Premium laser cutting, CNC fabrication, architectural metalwork and industrial manufacturing in Varanasi. Engineering precision, delivering excellence since 1976." },
      { property: "og:title", content: "VEEPEE Engineers — Engineering Precision. Delivering Excellence." },
      { property: "og:description", content: "Laser cutting · CNC fabrication · architectural metal · industrial manufacturing. Made in Varanasi." },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#0A0A0A" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <SiteHeader />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Products />
        <Process />
        <FeaturedProject />
        <Workshop />
        <IndustriesTicker />
        <Testimonials />
        <ContactCTA />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
