import Link from "next/link";

export const metadata = {
  title: "Editorial Policy",
  description: "How Commerce Toolbase researches, reviews, updates, and discloses e-commerce software recommendations.",
};

export default function EditorialPolicyPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Editorial Policy</p>
          <h1>How we review e-commerce software.</h1>
          <p>Commerce Toolbase is built around decision-focused reviews, source-aware updates, and human editorial checks before important claims are published.</p>
        </div>
      </header>
      <section className="section">
        <div className="container policy-content">
          <article className="card">
            <h2>Review Principles</h2>
            <ul className="info-list">
              <li>We prioritize practical fit for e-commerce teams over generic feature lists.</li>
              <li>We separate automated source collection from human recommendations.</li>
              <li>We avoid hard-coding pricing claims unless they have been manually verified.</li>
              <li>We update important pages when official sources or product positioning changes.</li>
            </ul>
          </article>
          <article className="card">
            <h2>How Automation Is Used</h2>
            <p>Automation helps identify changes on official websites, pricing pages, and product-update pages. Those changes are routed into an internal review queue before they affect public editorial content.</p>
            <p>Scores, verdicts, pros, cons, and affiliate recommendations should remain editorial decisions.</p>
          </article>
          <article className="card">
            <h2>Corrections</h2>
            <p>Software products change often. If a page appears outdated, the recommended next step is to verify the official source, update the relevant CMS entry, and mark the review queue item as resolved.</p>
            <div className="hero-actions">
              <Link className="button secondary" href="/methodology">Read methodology</Link>
              <Link className="button secondary" href="/affiliate-disclosure">Read affiliate disclosure</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
