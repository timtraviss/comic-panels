import type { Metadata } from 'next'
import { Inter, Crimson_Pro, Bowlby_One } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/app/_components/Nav/Nav'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
  variable: '--font-crimson',
  display: 'swap',
})

const bowlbyOne = Bowlby_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bowlby',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PANELS',
  description: 'A reading-first comic book database.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${crimsonPro.variable} ${bowlbyOne.variable}`}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
