import Link from "next/link";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Commerce Toolbase",
    template: "%s | Commerce Toolbase",
  },
  description: "A curated directory of AI and software tools for e-commerce sellers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
                <Link href="/editorial-policy">Editorial Policy</Link>
                <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
