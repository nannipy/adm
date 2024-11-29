import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from '@/components/navbar'
import { ClerkProvider } from '@clerk/nextjs'
import Footer from '@/components/footer'
import Whatsapp from "@/components/whatsapp"; 
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
  title: "ADM Sport and Nutrition",
  description: "ADM Sport and Nutrition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans `}>
          <Navbar />
          <main className="flex-1 overflow-y-auto pb-10">
            {children}
          </main>
          <Whatsapp/>
          <div className="hidden md:block">
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
