import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/seo";
import { HomePage } from "@/views/home";

export const metadata: Metadata = buildPageMetadata({
  title: "Used Cars in Dubai",
  description:
    "Buy and sell used cars in Dubai with Arlo Cars. Verified vehicles, flexible finance, registration renewal and full automotive services.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
