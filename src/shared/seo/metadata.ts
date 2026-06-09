import type { Metadata } from "next";

import { siteConfig } from "@/shared/config/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogImage = siteConfig.ogImage,
}: PageMetadataInput): Metadata {
  const pageTitle = `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
