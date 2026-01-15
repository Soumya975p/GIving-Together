import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Network Expansion - Fundraising Guide',
  description: 'Tilling the Soil - Chapter I',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
