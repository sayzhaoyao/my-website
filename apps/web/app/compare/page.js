import Link from "next/link";
import { sitePath } from "../../lib/site";
import { getComparisons } from "../../lib/strapi";

export const metadata = {
  title: "E-commerce Tool Comparisons",
  description: "Compare popular e-commerce software tools side by side before choosing a stack.",
  alternates: {
    canonical: "/compare",
  },
};

export default async function CompareIndexPage() {
  const comparisons = await getComparisons();
  const featuredComparison = comparisons[0];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "E-commerce tool comparisons",
    description: metadata.description,
    mainEntity: comparisons.map((comparison, index) => ({
      "@type": "Article",
      position: index + 1,
      headline: comparison.title,
      description: comparison.summary,
      url: sitePath(`/compare/${comparison.slug}`),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="page-head">
        <div className="container tool-hero">
          <div>
            <p className="eyebrow">Comparisons</p>
            <h1>Choose between two named tools.</h1>
            <p>Use these side-by-side pages when your shortlist is already narrow and you need a practical recommendation before signing up.</p>
            <div className="hero-actions">
              {featuredComparison ? (
                <Link className="button primary" href={`/compare/${featuredComparison.slug}`}>Open featured comparison</Link>
              ) : null}
              <Link className="button secondary" href="/best">Browse buying guides</Link>
            </div>
          </div>
          <aside className="verdict-panel">
            <span className="verdict-label">Comparison hub</span>
            <strong>{comparisons.length} decision pages</strong>
            <p>Each page explains the use case, pricing tradeoffs, feature differences, and final verdict.</p>
          </aside>
        </div>
      </header>
      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>All comparisons</h2>
              <div className="grid">
                {comparisons.map((comparison) => (
                  <article className="decision-box" key={comparison.documentId}>
                    <h3><Link href={`/compare/${comparison.slug}`}>{comparison.title}</Link></h3>
                    <p>{comparison.summary}</p>
                    <div className="meta">
                      <span className="pill">Final verdict included</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>
            <article className="card">
              <h2>When to use a comparison page</h2>
              <ol className="ordered-list">
                <li>You already have two tools in mind.</li>
                <li>You need to compare pricing, workflow fit, and feature depth.</li>
                <li>You want a next step instead of a broad directory list.</li>
              </ol>
            </article>
          </div>
          <aside className="side-stack">
            <article className="card">
              <h2>What we compare</h2>
              <ul className="info-list">
                <li>Best-fit user and team size</li>
                <li>Pricing and plan tradeoffs</li>
                <li>Feature depth and workflow fit</li>
                <li>Final recommendation</li>
              </ul>
            </article>
            <article className="card cta-card">
              <h2>Need replacement options?</h2>
              <p>Use alternatives pages when one tool is already known but may not be the best fit.</p>
              <Link className="button primary full-width" href="/alternatives">View alternatives</Link>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}
