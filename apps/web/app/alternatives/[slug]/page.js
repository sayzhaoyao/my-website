import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlternativeBySlug, getAlternatives, listField } from "../../../lib/strapi";
import { ScoreBadge } from "../../../components/ScoreBadge";

export async function generateStaticParams() {
  const alternatives = await getAlternatives();
  return alternatives.map((alternative) => ({ slug: alternative.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const alternative = await getAlternativeBySlug(slug);
  if (!alternative) return {};

  return {
    title: alternative.seoTitle || alternative.title,
    description: alternative.seoDescription || alternative.intro,
  };
}

export default async function AlternativeDetailPage({ params }) {
  const { slug } = await params;
  const alternative = await getAlternativeBySlug(slug);

  if (!alternative) {
    notFound();
  }

  const reasons = listField(alternative.whyLookForAlternatives);
  const criteria = listField(alternative.selectionCriteria);
  const primaryTool = alternative.primaryTool;
  const tools = alternative.alternativeTools || [];

  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Alternatives</p>
          <h1>{alternative.title}</h1>
          <p>{alternative.intro || alternative.seoDescription}</p>
        </div>
      </header>
      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>Recommended alternatives</h2>
              <ol className="rank-list">
                {tools.map((tool, index) => (
                  <li className="rank-item" key={tool.documentId}>
                    <span className="rank-number">{index + 1}</span>
                    <div>
                      <h3><Link href={`/tools/${tool.slug}`}>{tool.name}</Link></h3>
                      <p>{tool.decisionSummary || tool.shortDescription}</p>
                      <div className="meta">
                        <ScoreBadge tool={tool} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
            <article className="card">
              <h2>Verdict</h2>
              <p>{alternative.verdict}</p>
            </article>
          </div>
          <aside className="card">
            <h2>Context</h2>
            {primaryTool ? (
              <p>Primary tool: <Link href={`/tools/${primaryTool.slug}`}>{primaryTool.name}</Link></p>
            ) : null}
            <h3>Why look elsewhere</h3>
            <ul className="info-list">
              {reasons.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <h3>Selection criteria</h3>
            <ul className="info-list">
              {criteria.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
