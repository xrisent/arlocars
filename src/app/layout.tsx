import type { Metadata } from "next";

import { AppProviders } from "@/app/providers";
import { Header } from "@/widgets/header";

import "../shared/assets/scss/_index.scss";

export const metadata: Metadata = {
  title: "ArloCars",
  description: "ArloCars admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
