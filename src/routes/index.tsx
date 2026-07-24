import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { BackToTop } from "@/components/ui/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";
import {
  Hero, TrustBar, Services, Products, CatalogueCTA, Process,
  FeaturedProject, Workshop, TechnicalSpecs, IndustriesTicker, Testimonials, ContactCTA, FAQSection,
} from "@/components/home-sections";
import heroImg from "@/assets/hero-sparks.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Metal Fabrication & Laser Cutting in Varanasi | VEEPEE Engineers",
      },
      {
        name: "description",
        content:
          "VEEPEE Engineers — #1 metal fabricator in Varanasi since 1976. Fiber laser cutting, CNC fabrication, custom steel gates, jaali screens, railings & architectural metalwork. Get a free quote: +91-9125142400.",
      },
      {
        property: "og:title",
        content:
          "Metal Fabrication & Laser Cutting in Varanasi | VEEPEE Engineers",
      },
      {
        property: "og:description",
        content:
          "VEEPEE Engineers — #1 metal fabricator in Varanasi since 1976. Fiber laser cutting, CNC fabrication, custom steel gates, jaali screens, railings & architectural metalwork. Get a free quote: +91-9125142400.",
      },
      { property: "og:url", content: "https://veepeeengr.com/" },
      { property: "og:locale", content: "en_IN" },
    ],
    links: [
      { rel: "canonical", href: "https://veepeeengr.com/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never,
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://veepeeengr.com/#business",
          name: "VEEPEE Engineers",
          image: heroImg,
          priceRange: "₹₹",
          address: {
            "@type": "PostalAddress",
            streetAddress: "225/1 Maheshpur Industrial Estate",
            addressLocality: "Varanasi",
            addressRegion: "Uttar Pradesh",
            postalCode: "221106",
            addressCountry: "IN",
          },
          telephone: "+91-9125142400",
          email: "veepeeengr@gmail.com",
          openingHours: "Mo-Sa 09:00-19:00",
          areaServed: [
            "Varanasi", "Prayagraj", "Mirzapur", "Jaunpur",
            "Ghazipur", "Chandauli", "Bhadohi", "Lucknow",
            "Uttar Pradesh", "India",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.7",
            reviewCount: "93",
            bestRating: "5",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What metal fabrication services does VEEPEE Engineers offer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "VEEPEE Engineers offers a comprehensive range of metal fabrication services including fiber laser cutting, CNC fabrication, custom steel gates and grilles, jaali screens, decorative railings, architectural metalwork, hot-dip galvanizing, industrial manufacturing, pipe repair clamps, dismantling joints, and tubewell fittings. We serve residential, commercial, and industrial clients across Varanasi, Uttar Pradesh, and Eastern India.",
              },
            },
            {
              "@type": "Question",
              name: "Where is VEEPEE Engineers located in Varanasi?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "VEEPEE Engineers is located at 225/1 Maheshpur Industrial Estate, Varanasi, Uttar Pradesh 221106, India. You can reach us by phone at +91-9125142400 or +91-7985759501, or via WhatsApp 24×7.",
              },
            },
            {
              "@type": "Question",
              name: "How do I get a quote for laser cutting or metal fabrication in Varanasi?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can get a free quote from VEEPEE Engineers by calling +91-9125142400, sending a WhatsApp message, or filling out the contact form on our website. Share your drawings, DXF/CAD files, required quantity, and preferred material and we will respond within one working day.",
              },
            },
            {
              "@type": "Question",
              name: "Does VEEPEE Engineers supply across India or only in Varanasi?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "While our workshop is based in Varanasi, VEEPEE Engineers supplies metal fabrication work and products across Uttar Pradesh, Bihar, Jharkhand, and Eastern India. We regularly serve clients in Prayagraj, Mirzapur, Jaunpur, Ghazipur, Chandauli, Bhadohi, and Lucknow.",
              },
            },
            {
              "@type": "Question",
              name: "Is VEEPEE Engineers GST registered and UDYAM certified?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. VEEPEE Engineers is a fully GST-registered business (GSTIN: 09ABTPJ5945P1ZK) and holds a UDYAM registration (UDYAM-UP-75-0001103), recognising it as a certified MSME unit in Uttar Pradesh. We are also listed on IndiaMART and JustDial.",
              },
            },
            {
              "@type": "Question",
              name: "What materials does VEEPEE Engineers work with?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "VEEPEE Engineers works with a wide range of metals including mild steel (MS), stainless steel (SS), aluminium, galvanised iron (GI), and corten steel. We offer precision cutting thickness up to 25mm on mild steel and provide powder coating, hot-dip galvanizing, and polishing as finishing options.",
              },
            },
          ],
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
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Products />
        <div className="section-divider" />
        <CatalogueCTA />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <FeaturedProject />
        <div className="section-divider" />
        <Workshop />
        <div className="section-divider" />
        <TechnicalSpecs />
        <div className="section-divider" />
        <IndustriesTicker />
        <div className="section-divider" />
        <Testimonials />
        <div className="section-divider" />
        <FAQSection />
        <div className="section-divider" />
        <ContactCTA />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <BackToTop />
      <CookieConsent />
    </div>
  );
}
