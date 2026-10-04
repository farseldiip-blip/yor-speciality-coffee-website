import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YOR Speciality Coffee — Your Own Rhythm',
  description: 'Specialty coffee for people who move at their own pace. Find YOR in Mansoura, Egypt — open every day until 2 AM.',
  generator: 'v0.app',
  metadataBase: new URL('https://yor-coffee.vercel.app'),
  openGraph: { title: 'YOR Speciality Coffee', description: 'Your Own Rhythm. Specialty coffee in Mansoura.', type: 'website' },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#999A6E' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
