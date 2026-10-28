import { Inter, Outfit } from 'next/font/google'
import React from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { getPayloadClient } from '@/lib/payload'
import { Toaster } from '@/components/ui/sonner'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export async function generateMetadata() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const ogImage =
    siteSettings.ogImage && typeof siteSettings.ogImage === 'object'
      ? siteSettings.ogImage.url
      : undefined

  return {
    title: siteSettings.siteTitle,
    description: siteSettings.siteDescription,
    metadataBase: new URL(serverUrl),
    openGraph: {
      title: siteSettings.siteTitle,
      description: siteSettings.siteDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayloadClient()
  const [header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <SiteHeader header={header} />
        <main>{children}</main>
        <SiteFooter footer={footer} />
        <Toaster />
      </body>
    </html>
  )
}
