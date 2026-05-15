import Link from "next/link";
import { getBestLists } from "../../lib/strapi";

export const metadata = {
  title: "Best E-commerce Tool Lists",
  description: "Browse curated best-tools lists for Shopify, Amazon, and e-commerce growth workflows.",
};

export default async function BestIndexPage() {
  const lists = await getBestLists();
  const featured = lists[0];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Best E-commerce Tool Lists",
    description: metadata.description,
    mainEntity: lists.map((list) => ({
      "@type": "Article",
      headline: list.title,
      url: `/best/${list.slug}`,
      description: list.seoDescription || list.intro,
    })),
  };

  return (
    <>
      <header className="page-head">
        <div className="container tool-hero">
          <div>
          <p className="eyebrow">Best tools</p>
          <h1>Ranked tool lists for e-commerce decisions.</h1>
          <p>Start with the job you need to solve, then compare tools by fit, workflow, and practical trade-offs.</p>
            <div className="hero-actions">
              {featured ? <Link className="button primary" href={`/best/${featured.slug}`}>Open featured guide</Link> : null}
              <Link className="button" href="/categories">Browse categories</Link>
            </div>
          </div>
          <aside className="verdict-panel">
            <span className="verdict-label">Buying guide hub</span>
            <strong>{lists.length} ranked lists</strong>
            <p>Use these pages when you know the workflow and need a practical shortlist before comparing individual products.</p>
          </aside>
        </div>
      </header>

      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>All buying guides</h2>
              <div className="grid">
                {lists.map((list) => (
                  <article className="card" key={list.documentId}>
                    <h3><Link href={`/best/${list.slug}`}>{list.title}</Link></h3>
                    <p>{list.seoDescription || list.intro}</p>
                    <div className="meta">
                      <span className="pill">{list.tools?.length || 0} tools</span>
                      <span className="pill">Ranked shortlist</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="card">
              <h2>How to use these lists</h2>
              <div className="decision-grid">
                <div className="decision-box">
                  <h3>Start here if</h3>
                  <p>You know the workflow, but you do not know which tools deserve a closer look.</p>
                </div>
                <div className="decision-box">
                  <h3>Next step</h3>
                  <p>Open the top two or three tool profiles, compare pricing, and check alternatives before signing up.</p>
                </div>
              </div>
            </article>
          </div>

          <aside className="side-stack">
            <div className="card">
              <h2>What each guide includes</h2>
              <ul className="info-list">
                <li>Ranked tool shortlist</li>
                <li>Selection criteria</li>
                <li>Decision notes for each tool</li>
                <li>Final verdict and next step</li>
              </ul>
            </div>
            <div className="card cta-card">
              <h2>Prefer direct comparisons?</h2>
              <p>Use comparison pages when you are choosing between two named tools.</p>
              <Link className="button primary full-width" href="/compare">View comparisons</Link>
            </div>
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
