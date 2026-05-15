import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPricing, getToolBySlug, getTools, listField } from "../../../lib/strapi";
import { ScoreBadge } from "../../../components/ScoreBadge";
import { ScoreList } from "../../../components/ScoreList";

export async function generateStaticParams() {
  const tools = await getTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {};
  }

  return {
    title: tool.seoTitle || `${tool.name} review and alternatives`,
    description: tool.seoDescription || tool.shortDescription,
  };
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const features = listField(tool.keyFeatures);
  const pros = listField(tool.pros);
  const cons = listField(tool.cons);
  const bestFor = listField(tool.bestFor);
  const recommendedFor = listField(tool.recommendedFor);
  const notRecommendedFor = listField(tool.notRecommendedFor);
  const categories = tool.categories || [];

  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Tool profile</p>
          <h1>{tool.name}</h1>
          <p>{tool.shortDescription}</p>
          <div className="meta">
            <ScoreBadge tool={tool} />
          </div>
          <div className="hero-actions">
            {tool.websiteUrl ? (
              <a className="button primary" href={tool.websiteUrl} rel="nofollow sponsored noopener" target="_blank">
                Visit official site
              </a>
            ) : null}
            <Link className="button" href="/">Back to directory</Link>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>Overview</h2>
              <p>{tool.decisionSummary || tool.longDescription || tool.shortDescription}</p>
            </article>

            <article className="card">
              <h2>Decision scores</h2>
              <ScoreList tool={tool} />
            </article>

            <article className="card">
              <h2>Key features</h2>
              {features.length > 0 ? (
                <ul className="info-list">
                  {features.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p>Feature details are pending editorial review.</p>
              )}
            </article>

            <article className="card">
              <h2>Pros and cons</h2>
              <div className="grid">
                <div>
                  <h3>Pros</h3>
                  <ul className="info-list">
                    {pros.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3>Cons</h3>
                  <ul className="info-list">
                    {cons.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          </div>

          <aside className="card">
            <h2>Snapshot</h2>
            <ul className="info-list">
              <li><strong>Pricing:</strong> {formatPricing(tool)}</li>
              <li><strong>Free plan:</strong> {tool.freePlanAvailable ? "Yes" : "No or unknown"}</li>
              <li><strong>Last reviewed:</strong> {tool.lastReviewedAt ? new Date(tool.lastReviewedAt).toLocaleDateString("en-US") : "Pending"}</li>
            </ul>

            <h3>Best for</h3>
            <div className="meta">
              {bestFor.length > 0 ? bestFor.map((item) => <span className="pill" key={item}>{item}</span>) : <span className="pill">Review pending</span>}
            </div>

            <h3>Recommended for</h3>
            <ul className="info-list">
              {recommendedFor.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <h3>Not recommended for</h3>
            <ul className="info-list">
              {notRecommendedFor.map((item) => <li key={item}>{item}</li>)}
            </ul>

            <h3>Categories</h3>
            <div className="meta">
              {categories.map((category) => (
                <Link className="pill" href={`/categories/${category.slug}`} key={category.documentId}>
                  {category.name}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
