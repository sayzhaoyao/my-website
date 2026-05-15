import Link from "next/link";
import Script from "next/script";
import { defaultDescription, getSiteUrl, siteName } from "../lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Commerce Toolbase software review preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
        <div className="site-shell">
          <header className="site-header">
            <div className="container header-inner">
              <Link className="brand" href="/">
                <span className="brand-mark" aria-hidden="true">CT</span>
                <span>Commerce Toolbase</span>
              </Link>
              <nav className="nav" aria-label="Primary navigation">
                <Link href="/categories">Categories</Link>
                <Link href="/best">Best</Link>
                <Link href="/compare">Compare</Link>
                <Link href="/alternatives">Alternatives</Link>
                <Link href="/sitemap.xml">Sitemap</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="footer">
            <div className="container footer-inner">
              <p>Commerce Toolbase tracks e-commerce tools with source-aware, review-ready content.</p>
              <nav className="footer-links" aria-label="Footer navigation">
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/methodology">Methodology</Link>
                <Link href="/editorial-policy">Editorial Policy</Link>
                <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
                <Link href="/privacy-policy">Privacy</Link>
                <Link href="/terms">Terms</Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
