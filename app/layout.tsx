import "./globals.css"
import { Inter, Roboto_Mono, Arvo, Roboto_Flex } from "next/font/google"

const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
  display: "swap",
})

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: "--font-roboto-mono",
  display: "swap",
})

const arvo = Roboto_Flex({
  subsets: ['latin'],
  variable: "--font-arvo",
  display: "swap",
})

export const metadata = {
  title: "Joshua Heiland | Philosopher",
  description: `That's me`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable} ${arvo.variable} font-arvo`}>
      <body>{children}</body>
    </html>
  )
}
