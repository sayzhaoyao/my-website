import Link from "next/link";
import { notFound } from "next/navigation";
import { getComparisonBySlug, getComparisons, listField } from "../../../lib/strapi";

export async function generateStaticParams() {
  const comparisons = await getComparisons();
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) return {};

  return {
    title: comparison.seoTitle || comparison.title,
    description: comparison.seoDescription || comparison.summary,
  };
}

export default async function CompareDetailPage({ params }) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const notes = listField(comparison.featureNotes);
  const toolA = comparison.toolA;
  const toolB = comparison.toolB;

  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Comparison</p>
          <h1>{comparison.title}</h1>
          <p>{comparison.summary}</p>
        </div>
      </header>
      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>Quick recommendation</h2>
              <p>{comparison.recommendation}</p>
            </article>
            <article className="card">
              <h2>Feature notes</h2>
              <ul className="info-list">
                {notes.map((note) => <li key={note}>{note}</li>)}
              </ul>
            </article>
            <article className="card">
              <h2>Final verdict</h2>
              <p>{comparison.verdict}</p>
            </article>
          </div>
          <aside className="card">
            <h2>Snapshot</h2>
            <div className="comparison-table">
              <div className="comparison-row">
                <strong>Tool A</strong>
                <span>{toolA ? <Link href={`/tools/${toolA.slug}`}>{toolA.name}</Link> : "Pending"}</span>
              </div>
              <div className="comparison-row">
                <strong>Tool B</strong>
                <span>{toolB ? <Link href={`/tools/${toolB.slug}`}>{toolB.name}</Link> : "Pending"}</span>
              </div>
              <div className="comparison-row">
                <strong>Pricing</strong>
                <span>{comparison.pricingNotes || "Pricing details need review."}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
