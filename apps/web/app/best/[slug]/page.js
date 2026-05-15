import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { formatPricing, getAverageScore, getBestListBySlug, getBestLists, listField } from "../../../lib/strapi";
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
    alternates: {
      canonical: `/best/${list.slug}`,
    },
  };
}

export default async function BestDetailPage({ params }) {
  const { slug } = await params;
  const list = await getBestListBySlug(slug);

  if (!list) {
    notFound();
  }

  const criteria = listField(list.selectionCriteria);
  const tools = (list.tools || []).map((tool) => ({ ...tool, averageScore: getAverageScore(tool) || 0 }));
  const topTool = tools[0];
  const faqItems = [
    {
      question: `How were these ${list.title.toLowerCase()} selected?`,
      answer: criteria.length > 0
        ? `The shortlist is based on ${criteria.join(", ")}.`
        : "The shortlist is based on workflow fit, pricing clarity, ease of setup, integrations, and editorial review notes.",
    },
    {
      question: "Should I choose the first ranked tool automatically?",
      answer: "No. Use the ranking as a shortlist, then compare pricing, integrations, and fit for your team before signing up.",
    },
    {
      question: "Are these rankings final?",
      answer: "No. Tool data is designed to be updated through the CMS and import workflow as pricing, features, and editorial notes change.",
    },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.title,
    description: list.seoDescription || list.intro,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        url: `/tools/${tool.slug}`,
        description: tool.shortDescription,
      },
    })),
  };

  return (
    <>
      <header className="page-head">
        <div className="container tool-hero">
          <div>
            <Breadcrumbs
              items={[
                { label: "Best", href: "/best" },
                { label: list.title, href: `/best/${list.slug}` },
              ]}
            />
            <p className="eyebrow">Best tools list</p>
            <h1>{list.title}</h1>
            <p>{list.intro || list.seoDescription}</p>
            <div className="hero-actions">
              {topTool ? <Link className="button primary" href={`/tools/${topTool.slug}`}>View top pick</Link> : null}
              <Link className="button" href="/best">All buying guides</Link>
            </div>
          </div>
          <aside className="verdict-panel">
            <span className="verdict-label">Top pick</span>
            <strong>{topTool?.name || "Pending"}</strong>
            <p>{topTool?.decisionSummary || "This guide is waiting for enough reviewed tools to name a top pick."}</p>
          </aside>
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
                        <span className="pill">{formatPricing(tool)}</span>
                        {tool.freePlanAvailable ? <span className="pill">Free plan</span> : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <article className="card">
              <h2>Quick comparison</h2>
              <div className="comparison-table">
                <div className="comparison-row table-head">
                  <strong>Tool</strong>
                  <span>Decision note</span>
                </div>
                {tools.map((tool) => (
                  <div className="comparison-row" key={tool.documentId}>
                    <strong>{tool.name}</strong>
                    <span>{tool.decisionSummary || `${formatPricing(tool)} pricing with ${tool.averageScore || "pending"} score.`}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="card">
              <h2>Verdict</h2>
              <p>{list.verdict || "This list is pending deeper editorial review."}</p>
            </article>

            <article className="card">
              <h2>FAQ</h2>
              <div className="faq-list">
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </article>
          </div>

          <aside className="side-stack">
            <div className="card">
              <h2>Selection criteria</h2>
              <ul className="info-list">
                {criteria.length > 0
                  ? criteria.map((item) => <li key={item}>{item}</li>)
                  : <li>Criteria are pending editorial review.</li>}
              </ul>
            </div>
            <div className="card cta-card">
              <h2>Start with the shortlist</h2>
              <p>Open the top profiles, compare scores and pricing, then review the official site before signing up.</p>
              {topTool ? <Link className="button primary full-width" href={`/tools/${topTool.slug}`}>Review {topTool.name}</Link> : null}
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
