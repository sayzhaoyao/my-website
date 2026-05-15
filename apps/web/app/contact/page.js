import Link from "next/link";

export const metadata = {
  title: "Contact Commerce Toolbase",
  description: "Contact Commerce Toolbase for corrections, source updates, partnership notes, and software review suggestions.",
  alternates: {
    canonical: "/contact",
  },
};

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@commerce-toolbase.example";

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Commerce Toolbase",
    description: metadata.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Send corrections, updates, and partnership notes.</h1>
          <p>Use this contact page for factual corrections, source updates, software suggestions, and affiliate or partnership inquiries.</p>
        </div>
      </header>
      <section className="section">
        <div className="container policy-content">
          <article className="card">
            <h2>Email</h2>
            <p><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
            <p>Include the page URL, official source URL, and a short explanation so the change can be reviewed quickly.</p>
          </article>
          <article className="card">
            <h2>Useful Details To Include</h2>
            <ul className="info-list">
              <li>Correction request or source update.</li>
              <li>Official pricing, changelog, or product documentation URL.</li>
              <li>Tool name and relevant page on Commerce Toolbase.</li>
              <li>Partnership or affiliate program details, if relevant.</li>
            </ul>
          </article>
          <article className="card cta-card">
            <h2>Before Sending</h2>
            <p>For editorial standards and affiliate context, review the policy pages first.</p>
            <div className="hero-actions">
              <Link className="button secondary" href="/editorial-policy">Editorial policy</Link>
              <Link className="button secondary" href="/affiliate-disclosure">Affiliate disclosure</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
