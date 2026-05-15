import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description: "Commerce Toolbase terms of use for software reviews, comparisons, source data, and affiliate links.",
};

export default function TermsPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Terms of Use</p>
          <h1>Use this site as research, not final purchasing advice.</h1>
          <p>Commerce Toolbase publishes software research, comparisons, and source-aware review pages for e-commerce teams.</p>
        </div>
      </header>
      <section className="section">
        <div className="container policy-content">
          <article className="card">
            <h2>Content Is Informational</h2>
            <p>Reviews, scores, rankings, comparisons, and alternatives are provided for research and decision support. Always verify current pricing, terms, integrations, limits, and availability on the official vendor website before purchasing.</p>
          </article>
          <article className="card">
            <h2>Software Changes</h2>
            <p>Software products change frequently. Commerce Toolbase uses source-aware workflows to track updates, but published pages may not reflect every recent product or pricing change.</p>
          </article>
          <article className="card">
            <h2>Affiliate Links</h2>
            <p>Some links may be affiliate or partner links. Affiliate relationships should not be treated as product endorsements by themselves.</p>
            <Link className="button secondary" href="/affiliate-disclosure">Read affiliate disclosure</Link>
          </article>
          <article className="card">
            <h2>Corrections</h2>
            <p>If you notice inaccurate information, send the page URL and official source link through the contact page.</p>
            <Link className="button secondary" href="/contact">Contact Commerce Toolbase</Link>
          </article>
        </div>
      </section>
    </>
  );
}
