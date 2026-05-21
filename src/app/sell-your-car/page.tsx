import type { Metadata } from "next";

import { JsonLd, buildPageMetadata, faqPageSchema } from "@/shared/seo";
import { SellYourCarPage } from "@/views/sell-your-car";
import { sellYourCarFaqs } from "@/views/sell-your-car/constants/faqs";

export const metadata: Metadata = buildPageMetadata({
  title: "Sell Your Car",
  description:
    "Sell your car fast in Dubai — instant valuation, hassle-free inspection and same-day secure payment with Arlo Cars.",
  path: "/sell-your-car",
  ogImage: "/sell-your-car/why-choose-image.png",
});

export default function SellYourCar() {
  return (
    <>
      <JsonLd
        data={faqPageSchema(
          sellYourCarFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
        )}
      />
      <SellYourCarPage />
    </>
  );
}
