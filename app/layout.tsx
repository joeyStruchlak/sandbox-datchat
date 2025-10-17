// import type { Metadata } from 'next'
// import { GeistSans } from 'geist/font/sans'
// import { GeistMono } from 'geist/font/mono'
// import { Analytics } from '@vercel/analytics/next'
// import './globals.css'

// export const metadata: Metadata = {
//   title: 'Spend Analytix',
//   description: 'Analyze your spending patterns with AI.',
//   generator: 'Spend Analytix',
//   icons: {
//     icon: '/fav.png',
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <head />
//       <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
//         {children}
//         <Analytics />
//       </body>
//     </html>
//   )
// }

import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Spend Analytix",
  description: "Analyze your spending patterns with AI.",
  generator: "Spend Analytix",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
