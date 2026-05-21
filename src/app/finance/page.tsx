import type { Metadata } from "next";

import { buildPageMetadata } from "@/shared/seo";
import { FinancePage } from "@/views/finance";

export const metadata: Metadata = buildPageMetadata({
  title: "Car Finance",
  description:
    "Flexible car finance in Dubai with competitive rates, fast approval and fully managed paperwork through Arlo Cars.",
  path: "/finance",
  ogImage: "/finance/finance-why-image.jpg",
});

export default function Finance() {
  return <FinancePage />;
}
