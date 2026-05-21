import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/seo";
import { AboutUsPage } from "@/views/about-us";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "15+ years of automotive expertise in Dubai. Arlo Cars — transparency, trust and customer-first used car buying and selling.",
  path: "/about-us",
  ogImage: "/about-us/about-us.webp",
});

export default function AboutUs() {
  return <AboutUsPage />;
}
