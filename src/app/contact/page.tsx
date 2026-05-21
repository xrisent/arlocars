import type { Metadata } from "next";

import { JsonLd, buildPageMetadata, localBusinessSchema } from "@/shared/seo";
import { ContactPage } from "@/views/contact";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Arlo Cars in Dubai for car sales, valuations, finance, registration renewal and automotive services.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <ContactPage />
    </>
  );
}
