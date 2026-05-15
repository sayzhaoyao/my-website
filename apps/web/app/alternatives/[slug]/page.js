import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPricing, getAlternativeBySlug, getAlternatives, listField } from "../../../lib/strapi";
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
  const topAlternative = tools[0];
  const faqItems = [
    {
      question: `What is the best ${primaryTool?.name || "tool"} alternative?`,
      answer: topAlternative
        ? `${topAlternative.name} is the first option to review here, but the best fit depends on your workflow, budget, and channel priorities.`
        : "Start by matching alternatives to your workflow, budget, and must-have integrations.",
    },
    {
      question: "Why do teams look for alternatives?",
      answer: reasons[0] || "Teams usually compare alternatives because of pricing, complexity, missing features, or workflow mismatch.",
    },
    {
      question: "What should I verify before switching?",
      answer: "Check plan limits, migration effort, core integrations, reporting needs, and whether the alternative supports your highest-value workflow.",
    },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: alternative.title,
    description: alternative.seoDescription || alternative.intro,
    about: primaryTool?.name,
    mainEntity: [
      {
        "@type": "ItemList",
        itemListElement: tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.name,
          url: `/tools/${tool.slug}`,
        })),
      },
      ...faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ],
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
            <h1>{alternative.title}</h1>
            <p>{alternative.intro || alternative.seoDescription}</p>
            <div className="hero-actions">
              {topAlternative ? <Link className="button primary" href={`/tools/${topAlternative.slug}`}>Review {topAlternative.name}</Link> : null}
              {primaryTool ? <Link className="button secondary" href={`/tools/${primaryTool.slug}`}>Compare against {primaryTool.name}</Link> : null}
            </div>
          </div>
          <aside className="verdict-panel">
            <span className="verdict-label">Best starting point</span>
            <strong>{topAlternative?.name || "Review the shortlist"}</strong>
            <p>{alternative.verdict || "Use the ranked list and criteria below to choose the best-fit replacement."}</p>
          </aside>
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
                        <span className="pill">{formatPricing(tool)}</span>
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
                  <span>Best reason to review</span>
                </div>
                {tools.map((tool) => (
                  <div className="comparison-row" key={tool.documentId}>
                    <strong><Link href={`/tools/${tool.slug}`}>{tool.name}</Link></strong>
                    <span>{tool.decisionSummary || tool.shortDescription || formatPricing(tool)}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="card">
              <h2>Verdict</h2>
              <p>{alternative.verdict}</p>
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
            <article className="card">
              <h2>Context</h2>
              {primaryTool ? (
                <p>Primary tool: <Link href={`/tools/${primaryTool.slug}`}>{primaryTool.name}</Link></p>
              ) : null}
              <h3>Why look elsewhere</h3>
              <ul className="info-list">
                {reasons.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article className="card">
              <h2>Selection criteria</h2>
              <ul className="info-list">
                {criteria.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
            <article className="card cta-card">
              <h2>Need a direct matchup?</h2>
              <p>Open the comparison hub when you are choosing between two named tools.</p>
              <Link className="button primary full-width" href="/compare">View comparisons</Link>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}
