import Link from "next/link";
import { sitePath } from "../../lib/site";
import { getAlternatives } from "../../lib/strapi";

export const metadata = {
  title: "E-commerce Tool Alternatives",
  description: "Find alternatives to popular e-commerce tools by use case, team size, and workflow fit.",
  alternates: {
    canonical: "/alternatives",
  },
};

export default async function AlternativesIndexPage() {
  const alternatives = await getAlternatives();
  const featuredAlternative = alternatives[0];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "E-commerce tool alternatives",
    description: metadata.description,
    mainEntity: alternatives.map((alternative, index) => ({
      "@type": "Article",
      position: index + 1,
      headline: alternative.title,
      description: alternative.seoDescription || alternative.intro,
      url: sitePath(`/alternatives/${alternative.slug}`),
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
            <p className="eyebrow">Alternatives</p>
            <h1>Find better-fit replacement tools.</h1>
            <p>Use these pages when you know one product but want options that better match your store, budget, channel mix, or workflow.</p>
            <div className="hero-actions">
              {featuredAlternative ? (
                <Link className="button primary" href={`/alternatives/${featuredAlternative.slug}`}>Open featured alternatives</Link>
              ) : null}
              <Link className="button secondary" href="/categories">Browse categories</Link>
            </div>
          </div>
          <aside className="verdict-panel">
            <span className="verdict-label">Alternatives hub</span>
            <strong>{alternatives.length} replacement guides</strong>
            <p>Each guide explains why teams switch, which criteria matter, and which tools deserve review first.</p>
          </aside>
        </div>
      </header>
      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <section className="hub-panel" aria-labelledby="all-alternatives">
              <div className="section-header compact">
                <div>
                  <h2 id="all-alternatives">All alternatives guides</h2>
                  <p>Replacement guides for tools that may no longer fit the workflow.</p>
                </div>
              </div>
              <div className="grid">
                {alternatives.map((alternative) => (
                  <article className="decision-box" key={alternative.documentId}>
                    <h3><Link href={`/alternatives/${alternative.slug}`}>{alternative.title}</Link></h3>
                    <p>{alternative.seoDescription || alternative.intro}</p>
                    <div className="meta">
                      <span className="pill">{alternative.alternativeTools?.length || 0} alternatives</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <article className="info-panel">
              <h2>How to evaluate alternatives</h2>
              <ol className="ordered-list">
                <li>Start with the reason the current tool is not working.</li>
                <li>Compare replacement tools by workflow fit, pricing, and migration effort.</li>
                <li>Open the top candidates and verify plan limits before committing.</li>
              </ol>
            </article>
          </div>
          <aside className="side-stack">
            <article className="card">
              <h2>Good alternatives pages include</h2>
              <ul className="info-list">
                <li>Reasons to switch</li>
                <li>Selection criteria</li>
                <li>Ranked replacement options</li>
                <li>Final recommendation</li>
              </ul>
            </article>
            <article className="card cta-card">
              <h2>Choosing between two tools?</h2>
              <p>Use direct comparisons when the shortlist is already narrowed to two named products.</p>
              <Link className="button primary full-width" href="/compare">View comparisons</Link>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}
