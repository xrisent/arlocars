import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/seo";
import { AutomotiveSolutionsPage } from "@/views/automotive-solutions";

export const metadata: Metadata = buildPageMetadata({
  title: "Automotive Solutions",
  description:
    "Car registration renewal, maintenance, cosmetic repairs and premium car care in Dubai — handled by Arlo Cars.",
  path: "/automotive-solutions",
  ogImage: "/automotive-solutions/car-renewal.jpg",
});

export default function AutomotiveSolutions() {
  return <AutomotiveSolutionsPage />;
}
