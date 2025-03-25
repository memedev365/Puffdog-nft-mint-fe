import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import PageProvider from "@/components/PageProvider";

import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "react-multi-carousel/lib/styles.css";
import "./globals.css";
import { cn } from "@/utils/libs/utils";

const arco = localFont({
  src: "../../public/fonts/ARCO.otf",
  variable: "--font-arco",
});

const carmenSans = localFont({
  src: "../../public/fonts/carmen-sans/CarmenSans-Bold.eot",
  variable: "--font-carmen",
});

export const metadata: Metadata = {
  title: "NFT MINT | Puff Dog",
  description: "PUFF will introduce exclusive NFT collections that servemultiple purposes within the ecosystem.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/icons/favicon.ico",
        href: "/icons/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icons/favicon.ico",
        href: "/icons/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(arco.variable, carmenSans.variable)}>
        <React.StrictMode>
          <PageProvider>{children}</PageProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
