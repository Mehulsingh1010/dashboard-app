import type { Metadata } from 'next'
import './globals.css'
import { GlobalLoadingProvider } from '@/components/loader'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: "Stocker - Inventory Management System",
  description: "A comprehensive inventory management and analytics dashboard for efficient stock tracking and business insights.",
  keywords: ["inventory", "management", "stock", "analytics", "dashboard", "business"],
  authors: [{ name: "Stocker Team" }],
  creator: "Stocker",
  publisher: "Stocker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dashboard-app-two-sigma.vercel.app/",
    title: "Stocker - Inventory Management System",
    description: "A comprehensive inventory management and analytics dashboard for efficient stock tracking and business insights.",
    siteName: "Stocker",
    images: [
      {
        url: "/dashboard/home2.png",
        width: 1200,
        height: 630,
        alt: "Stocker Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stocker - Inventory Management System",
    description: "A comprehensive inventory management and analytics dashboard for efficient stock tracking and business insights.",
    images: ["/dashboard/home2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased">
        <GlobalLoadingProvider>
          {children}
          <Toaster />
        </GlobalLoadingProvider>
      </body>
    </html>
  )
}