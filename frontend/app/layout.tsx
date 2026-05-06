import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iconic.com.mx'),
  title: {
    default: "Iconic — Sneakers originales en CDMX",
    template: "%s — Iconic",
  },
  description: "Sneakers originales con envío a todo México. Nike, Adidas, Jordan, New Balance y más. Tienda premium de sneakers en Ciudad de México.",
  applicationName: "Iconic",
  keywords: ["sneakers", "tenis", "CDMX", "Nike", "Adidas", "Jordan", "tienda online", "sneakers México"],
  authors: [{ name: "Iconic" }],
  openGraph: {
    type: "website",
    siteName: "Iconic",
    locale: "es_MX",
    url: "https://iconic.com.mx",
    images: [{ url: "/og/default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@iconic_mx",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${courierPrime.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-secondary">
        {children}
      </body>
    </html>
  );
}
