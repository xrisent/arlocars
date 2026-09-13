import type { Metadata } from "next";

import { buildPageMetadata, JsonLd, localBusinessSchema } from "@/shared/seo";
import { HomePage } from "@/views/home";

export const metadata: Metadata = buildPageMetadata({
  title: "ARLO CARS – Defined by Excellence, Driven by Trust",
  description:
    "Buy and sell cars in Dubai with Arlo Cars. Verified vehicles, flexible finance, registration renewal and full automotive services.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <HomePage />
    </>
  );
}
