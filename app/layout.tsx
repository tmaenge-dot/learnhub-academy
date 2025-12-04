import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enge's Deliverables Academy - TVET Educational Apps & Vocational Training",
  description: "Professional vocational training apps and learning materials for TVET students in Botswana and Africa. Access quality educational applications for shorthand, information processing, and technical vocational education. Free learning resources for office administration and IT students.",
  keywords: ["TVET", "vocational training", "educational apps", "Botswana education", "shorthand app", "Pitman shorthand", "information processing", "technical education", "office administration", "secretarial training", "TVET Botswana", "online learning", "mobile learning apps", "free TVET apps", "African education", "vocational skills", "career training", "Palapye education", "Southern Africa TVET"],
  authors: [{ name: "Enge's Deliverables Academy" }],
  creator: "Enge's Deliverables Academy",
  publisher: "Enge's Deliverables Academy",
  metadataBase: new URL('https://tmaenge-dot.github.io/learnhub-academy/'),
  alternates: {
    canonical: '/',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tmaenge-dot.github.io/learnhub-academy/',
    title: "Enge's Deliverables Academy - Free TVET Educational Apps for Africa",
    description: "🎓 Master vocational skills with our free TVET apps! Pitman Shorthand, Information Processing & more. 📱 Used by 1000+ students across Africa. Download now!",
    siteName: "Enge's Deliverables Academy",
    images: [
      {
        url: '/learnhub-academy/og-image.png',
        width: 1200,
        height: 630,
        alt: "Enge's Deliverables Academy - TVET Educational Apps",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@EngesAcademy',
    creator: '@EngesAcademy',
    title: "Enge's Deliverables Academy - Free TVET Apps 🎓",
    description: "Master vocational skills with our free educational apps. Pitman Shorthand, Information Processing & more. Join 1000+ students!",
    images: ['/learnhub-academy/og-image.png'],
  },
  verification: {
    google: 'googlea7e2428f940baac1',
  },
  category: 'education',
  classification: 'Vocational Education and Training',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Enges Academy',
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="googlea7e2428f940baac1" />
        {/* Monetag Verification */}
        <meta name="monetag" content="25d51aaf50edeb812bf3f343f2ebd1c6" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B2W483REBH"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B2W483REBH');
            `,
          }}
        />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Enge's Deliverables Academy",
              "description": "TVET educational apps and vocational training resources",
              "url": "https://tmaenge-dot.github.io/learnhub-academy/",
              "logo": "https://tmaenge-dot.github.io/learnhub-academy/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Palapye",
                "addressCountry": "BW"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+267-745-68896",
                "contactType": "Customer Service",
                "email": "info@engesdeliverables.academy"
              }
            }),
          }}
        />
        {/* Monetag Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/learnhub-academy/sw.js', { scope: '/learnhub-academy/' })
                  .then(registration => console.log('Monetag SW registered'))
                  .catch(err => console.log('Monetag SW registration failed'));
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
