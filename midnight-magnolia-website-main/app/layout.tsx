import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Lora, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { CartProvider } from "@/app/hooks/useCart"
import SacredCart from "./components/SacredCart"

// Font configurations
const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

// Safe URL helper function
function getSafeUrl(envVar: string | undefined, fallback = "https://midnight-magnolia.com"): string {
  if (!envVar) return fallback

  // Clean the environment variable in case it includes the variable name
  const cleanUrl = envVar.replace(/^NEXT_PUBLIC_SITE_URL=/, "").trim()

  try {
    // Validate URL format
    new URL(cleanUrl)
    return cleanUrl
  } catch {
    console.warn(`Invalid URL in environment variable: ${envVar}, using fallback: ${fallback}`)
    return fallback
  }
}

// Get site URL safely
const siteUrl = getSafeUrl(process.env.NEXT_PUBLIC_SITE_URL)

export const metadata: Metadata = {
  title: {
    default: "Midnight Magnolia | Southern Gothic Wellness Sanctuary",
    template: "%s | Midnight Magnolia",
  },
  description:
    "Digital sanctuary for healing through Southern Gothic grace. Blending ancestral wisdom, gentle productivity, and sacred wellness for people with chronic illness and ADHD.",
  keywords: [
    "wellness",
    "Southern Gothic",
    "chronic illness",
    "ADHD",
    "healing",
    "ancestral wisdom",
    "digital sanctuary",
    "productivity",
    "self-care",
  ],
  authors: [{ name: "Midnight Magnolia" }],
  creator: "Midnight Magnolia",
  publisher: "Midnight Magnolia",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Midnight Magnolia | Southern Gothic Wellness Sanctuary",
    description:
      "Digital sanctuary for healing through Southern Gothic grace. Blending ancestral wisdom and gentle productivity.",
    siteName: "Midnight Magnolia",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Midnight Magnolia - Southern Gothic Wellness Sanctuary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Midnight Magnolia | Southern Gothic Wellness Sanctuary",
    description:
      "Digital sanctuary for healing through Southern Gothic grace. Blending ancestral wisdom and gentle productivity.",
    images: ["/images/og-image.jpg"],
    creator: "@midnightmagnolia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A192F" />
        <meta name="msapplication-TileColor" content="#0A192F" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-20">{children}</main>
              <Footer />
            </div>
            <SacredCart />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
