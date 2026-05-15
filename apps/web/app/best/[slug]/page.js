import Link from "next/link";
import { notFound } from "next/navigation";
import { getBestListBySlug, getBestLists, listField } from "../../../lib/strapi";
import { ScoreBadge } from "../../../components/ScoreBadge";

export async function generateStaticParams() {
  const lists = await getBestLists();
  return lists.map((list) => ({ slug: list.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const list = await getBestListBySlug(slug);
  if (!list) return {};

  return {
    title: list.seoTitle || list.title,
    description: list.seoDescription || list.intro,
  };
}

export default async function BestDetailPage({ params }) {
  const { slug } = await params;
  const list = await getBestListBySlug(slug);

  if (!list) {
    notFound();
  }

  const criteria = listField(list.selectionCriteria);
  const tools = list.tools || [];

  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Best tools list</p>
          <h1>{list.title}</h1>
          <p>{list.intro || list.seoDescription}</p>
        </div>
      </header>
      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>Top picks</h2>
              <ol className="rank-list">
                {tools.map((tool, index) => (
                  <li className="rank-item" key={tool.documentId}>
                    <span className="rank-number">{index + 1}</span>
                    <div>
                      <h3><Link href={`/tools/${tool.slug}`}>{tool.name}</Link></h3>
                      <p>{tool.decisionSummary || tool.shortDescription}</p>
                      <div className="meta">
                        <ScoreBadge tool={tool} />
                        <span className="pill">{tool.pricingModel || "unknown"}</span>
                        {tool.freePlanAvailable ? <span className="pill">Free plan</span> : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
            <article className="card">
              <h2>Verdict</h2>
              <p>{list.verdict || "This list is pending deeper editorial review."}</p>
            </article>
          </div>
          <aside className="card">
            <h2>Selection criteria</h2>
            <ul className="info-list">
              {criteria.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
