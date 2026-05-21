import { siteConfig } from "@/shared/config/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: [siteConfig.social.instagram],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    areaServed: {
      "@type": "City",
      name: "Dubai",
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function vehicleSchema(car: {
  name: string;
  description: string;
  mainPhoto: string;
  price: number;
  year: number;
  id: number;
}) {
  const url = `${siteConfig.url}/cars/${car.id}`;
  const image = car.mainPhoto.startsWith("http")
    ? car.mainPhoto
    : `${siteConfig.url}${car.mainPhoto}`;

  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: car.name,
    description: car.description,
    image,
    url,
    vehicleModelDate: String(car.year),
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      url,
    },
  };
}
