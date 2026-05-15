import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { getAverageScore, formatPricing, getComparisonBySlug, getComparisons, listField } from "../../../lib/strapi";

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
  const toolAScore = getAverageScore(toolA);
  const toolBScore = getAverageScore(toolB);
  const faqItems = [
    {
      question: `Which is better, ${toolA?.name || "Tool A"} or ${toolB?.name || "Tool B"}?`,
      answer: comparison.verdict || comparison.recommendation || "The better choice depends on your use case, budget, and workflow requirements.",
    },
    {
      question: "What should I check before choosing?",
      answer: "Confirm plan limits, integrations, reporting needs, migration effort, and whether the workflow fits your team size.",
    },
    {
      question: "Should I compare alternatives too?",
      answer: "Yes. If neither product clearly fits your use case, open the alternatives hub before committing to a paid plan.",
    },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.seoDescription || comparison.summary,
    about: [toolA?.name, toolB?.name].filter(Boolean),
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
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
            <Breadcrumbs
              items={[
                { label: "Compare", href: "/compare" },
                { label: comparison.title, href: `/compare/${comparison.slug}` },
              ]}
            />
            <p className="eyebrow">Comparison</p>
            <h1>{comparison.title}</h1>
            <p>{comparison.summary}</p>
            <div className="hero-actions">
              {toolA ? <Link className="button primary" href={`/tools/${toolA.slug}`}>Review {toolA.name}</Link> : null}
              {toolB ? <Link className="button secondary" href={`/tools/${toolB.slug}`}>Review {toolB.name}</Link> : null}
            </div>
          </div>
          <aside className="verdict-panel">
            <span className="verdict-label">Quick recommendation</span>
            <strong>{comparison.recommendation || "Compare workflow fit before choosing."}</strong>
            <p>{comparison.pricingNotes || "Check current plans and feature limits before purchasing."}</p>
          </aside>
        </div>
      </header>
      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>Decision snapshot</h2>
              <div className="comparison-table">
                <div className="comparison-row table-head">
                  <strong>Criteria</strong>
                  <span>{toolA?.name || "Tool A"} vs {toolB?.name || "Tool B"}</span>
                </div>
                <div className="comparison-row">
                  <strong>Best fit</strong>
                  <span>{comparison.recommendation || "Use the tool that best matches your workflow and budget."}</span>
                </div>
                <div className="comparison-row">
                  <strong>Pricing</strong>
                  <span>{comparison.pricingNotes || "Pricing details need review."}</span>
                </div>
                <div className="comparison-row">
                  <strong>Scores</strong>
                  <span>
                    {toolA?.name || "Tool A"}: {toolAScore || "Not scored"} / {toolB?.name || "Tool B"}: {toolBScore || "Not scored"}
                  </span>
                </div>
              </div>
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
              <h2>Tool snapshot</h2>
              <ul className="info-list">
                <li>
                  <strong>{toolA ? <Link href={`/tools/${toolA.slug}`}>{toolA.name}</Link> : "Tool A pending"}</strong>
                  {toolA ? <span> - {formatPricing(toolA)}</span> : null}
                </li>
                <li>
                  <strong>{toolB ? <Link href={`/tools/${toolB.slug}`}>{toolB.name}</Link> : "Tool B pending"}</strong>
                  {toolB ? <span> - {formatPricing(toolB)}</span> : null}
                </li>
              </ul>
            </article>
            <article className="card cta-card">
              <h2>Still unsure?</h2>
              <p>Check broader buying guides and alternatives before choosing a paid plan.</p>
              <Link className="button primary full-width" href="/best">View buying guides</Link>
              <Link className="button secondary full-width" href="/alternatives">View alternatives</Link>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}
