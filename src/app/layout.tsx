import type { Metadata } from "next";

import { AppProviders } from "@/app/providers";
import { siteConfig } from "@/shared/config/site";
import { JsonLd, organizationSchema } from "@/shared/seo";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

import "../shared/assets/scss/_index.scss";
import "../shared/assets/scss/_media.scss";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Used Cars & Automotive Services in Dubai`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.defaultDescription,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        <Header />
        <AppProviders>{children}</AppProviders>
        <Footer />
      </body>
    </html>
  );
}
