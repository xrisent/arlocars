export const siteConfig = {
  name: "Arlo Cars",
  legalName: "Arlo Cars",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arlocars.ae",
  locale: "en_AE",
  defaultDescription:
    "Dubai used car dealer — buy, sell, finance, registration renewal and full automotive services. Trusted expertise, transparent deals.",
  email: "info@arlocars.ae",
  phone: "+971526902710",
  phoneDisplay: "+971 52 690 2710",
  address: {
    streetAddress: "Dubai",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  ogImage: "/hero-banner-1.jpg",
  social: {
    instagram: "https://www.instagram.com/arlocarsdxb/",
  },
} as const;
