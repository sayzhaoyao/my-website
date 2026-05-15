import Link from "next/link";

export const metadata = {
  title: "About Commerce Toolbase",
  description: "Learn what Commerce Toolbase is building and how it helps e-commerce teams choose software with source-aware reviews.",
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Commerce Toolbase",
    description: metadata.description,
    about: {
      "@type": "Organization",
      name: "Commerce Toolbase",
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>Software decisions for e-commerce teams.</h1>
          <p>Commerce Toolbase helps store owners, operators, and marketers compare software by workflow, fit, tradeoffs, and source-aware updates.</p>
        </div>
      </header>
      <section className="section">
        <div className="container policy-content">
          <article className="card">
            <h2>What We Are Building</h2>
            <p>Commerce Toolbase is a decision-focused software review site for e-commerce workflows such as retention marketing, product research, SEO, customer support, analytics, automation, and creative production.</p>
          </article>
          <article className="card">
            <h2>How It Works</h2>
            <ul className="info-list">
              <li>Tools are organized by real e-commerce jobs instead of broad software labels.</li>
              <li>Reviews include recommended users, skip conditions, scores, pros, cons, and sources.</li>
              <li>Automated collection tracks official pages and routes important changes into an internal review queue.</li>
              <li>Public recommendations stay editorial and should be checked against current vendor details.</li>
            </ul>
          </article>
          <article className="card cta-card">
            <h2>Start With A Workflow</h2>
            <p>Browse categories when you know the problem. Use comparisons or alternatives when your shortlist is already narrow.</p>
            <div className="hero-actions">
              <Link className="button primary" href="/categories">Browse categories</Link>
              <Link className="button secondary" href="/methodology">Review methodology</Link>
              <Link className="button secondary" href="/editorial-policy">Editorial policy</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
