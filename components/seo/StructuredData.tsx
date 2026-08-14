import { contact } from "@/lib/content/data/contact";
import { profile } from "@/lib/content/data/profile";
import { siteUrl } from "@/lib/site-url";

function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    address: {
      "@type": "PostalAddress",
      addressCountry: profile.location,
    },
    sameAs: [contact.linkedIn],
    url: siteUrl,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile.name,
    description:
      "Maayan Pony is an Electrical Engineer at HIT, specializing in Electro-Optics and Microelectronics, with hands-on laboratory and research experience.",
    inLanguage: "en",
    url: siteUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(website) }} />
    </>
  );
}
