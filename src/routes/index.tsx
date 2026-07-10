import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  Hero, TrustBar, Services, Products, CatalogueCTA, Process,
  FeaturedProject, Workshop, IndustriesTicker, Testimonials, ContactCTA,
} from "@/components/home-sections";
import heroImg from "@/assets/hero-sparks.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEEPEE Engineers — Precision Laser Cutting & CNC Fabrication · Varanasi" },
      { name: "description", content: "Premium laser cutting, CNC fabrication, architectural metalwork and industrial manufacturing in Varanasi. Engineering precision, delivering excellence since 1976." },
      { property: "og:title", content: "VEEPEE Engineers — Engineering Precision. Delivering Excellence." },
      { property: "og:description", content: "Laser cutting · CNC fabrication · architectural metal · industrial manufacturing. Made in Varanasi." },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "VEEPEE Engineers",
          image: heroImg,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "225/1 Maheshpur Industrial Estate",
            addressLocality: "Varanasi",
            postalCode: "221106",
            addressRegion: "UP",
            addressCountry: "IN",
          },
          telephone: "+91-90000-00000",
          email: "hello@veepeeengineers.com",
          openingHours: "Mo-Sa 09:00-19:00",
          areaServed: "IN",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "120" },
        }),
      },
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
        <CatalogueCTA />
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
