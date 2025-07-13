import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Stocker - Inventory Management System",
  description:
    "A comprehensive inventory management and analytics dashboard for efficient stock tracking and business insights.",
  icons: {
    icon: "/logo.png", 
  },
  openGraph: {
    images: "/dashboard/home2.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
