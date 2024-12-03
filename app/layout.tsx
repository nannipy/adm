import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/navbar'
import { ClerkProvider } from '@clerk/nextjs'
import Footer from '@/components/footer'
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://adm-sport-nutrition.vercel.app'),
  title: {
    default: 'ADM Sport and Nutrition',
    template: '%s | ADM Sport and Nutrition',
  },
  description: 'ADM Sport and Nutrition: Your Partner in Athletic Performance and Nutritional Wellness',
  verification: {
    // Add Google verification code if available
    // google: 'your-verification-code',
  },
  openGraph: {
    title: 'ADM Sport and Nutrition',
    description: 'ADM Sport and Nutrition: Your Partner in Athletic Performance and Nutritional Wellness',
    url: 'https://adm-sport-nutrition.vercel.app',
    siteName: 'ADM Sport and Nutrition',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://adm-sport-nutrition.vercel.app/images/meta-tags.png',
        width: 1200,
        height: 630,
        alt: 'ADM Sport and Nutrition Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADM Sport and Nutrition',
    description: 'ADM Sport and Nutrition: Your Partner in Athletic Performance and Nutritional Wellness',
    images: ['https://adm-sport-nutrition.vercel.app/images/meta-tags.png'],
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
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  applicationName: 'ADM Sport and Nutrition',
  creator: 'ADM Team',
  keywords: [
    'ADM Sport and Nutrition',
    'sports nutrition',
    'athletic performance',
    'supplements',
    'fitness',
    'wellness',
  ],
  
  authors: [{ name: 'ADM Sport and Nutrition Team' }],
  category: 'health and fitness',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ADM Sport and Nutrition',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="ADM" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
          <Navbar />
          <main className="flex-1 overflow-y-auto pb-10">
            {children}
          </main>
          <div className="hidden md:block">
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}