import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPricing, getAverageScore, getToolBySlug, getTools, listField } from "../../../lib/strapi";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { ScoreBadge } from "../../../components/ScoreBadge";
import { ScoreList } from "../../../components/ScoreList";

function formatDate(value) {
  if (!value) {
    return "Pending editorial review";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getVerdict(tool) {
  const score = getAverageScore(tool);
  if (!score) {
    return "Review pending";
  }

  if (score >= 4.2) {
    return "Strong pick";
  }

  if (score >= 3.4) {
    return "Good fit for the right team";
  }

  return "Use-case dependent";
}

function paragraphs(value) {
  if (!value || typeof value !== "string") {
    return [];
  }

  return value.split(/\n+/).map((item) => item.trim()).filter(Boolean);
}

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
  const sourceUrls = listField(tool.sourceUrls);
  const categories = tool.categories || [];
  const sources = tool.sources || [];
  const verdict = getVerdict(tool);
  const officialUrl = tool.affiliateUrl || tool.websiteUrl;
  const pricingText = formatPricing(tool);
  const updatedAt = tool.lastReviewedAt || tool.updatedAt || tool.lastImportedAt;
  const editorialParagraphs = paragraphs(tool.longDescription);
  const faqItems = [
    {
      question: `What is ${tool.name} best for?`,
      answer: bestFor.length > 0
        ? `${tool.name} is best for ${bestFor.join(", ")}.`
        : `${tool.name} is still waiting for a complete editorial fit summary.`,
    },
    {
      question: `Does ${tool.name} have a free plan?`,
      answer: tool.freePlanAvailable
        ? `${tool.name} appears to offer a free plan or free starting option. Confirm current limits on the official site before choosing.`
        : `A free plan is not confirmed for ${tool.name}. Check the official pricing page before making a final decision.`,
    },
    {
      question: `Who should skip ${tool.name}?`,
      answer: notRecommendedFor.length > 0
        ? `${tool.name} may be a poor fit for ${notRecommendedFor.join(", ")}.`
        : `Skip ${tool.name} until the editorial review confirms the right use cases and tradeoffs.`,
    },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.shortDescription,
    applicationCategory: "BusinessApplication",
    url: tool.websiteUrl,
    offers: {
      "@type": "Offer",
      price: tool.startingPrice || 0,
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
  };

  return (
    <>
      <header className="page-head">
        <div className="container tool-hero">
          <div>
            <Breadcrumbs
              items={[
                { label: "Tools", href: "/categories" },
                { label: tool.name, href: `/tools/${tool.slug}` },
              ]}
            />
            <p className="eyebrow">Tool review</p>
            <h1>{tool.name} review</h1>
            <p>{tool.shortDescription}</p>
            <div className="meta">
              <ScoreBadge tool={tool} />
              <span className="pill">{verdict}</span>
              <span className="pill">Updated {formatDate(updatedAt)}</span>
            </div>
            <div className="hero-actions">
              {officialUrl ? (
                <a className="button primary" href={officialUrl} rel="nofollow sponsored noopener" target="_blank">
                  Visit official site
                </a>
              ) : null}
              {categories[0] ? (
                <Link className="button" href={`/categories/${categories[0].slug}`}>
                  Compare similar tools
                </Link>
              ) : (
                <Link className="button" href="/">Back to directory</Link>
              )}
            </div>
          </div>
          <div className="verdict-panel" aria-label={`${tool.name} quick verdict`}>
            <span className="verdict-label">Quick verdict</span>
            <strong>{verdict}</strong>
            <p>{tool.decisionSummary || `Use ${tool.name} when its strengths match your workflow and budget.`}</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card tool-summary-card">
              <h2>Should you use {tool.name}?</h2>
              <div className="decision-grid">
                <div className="decision-box positive">
                  <h3>Choose it if</h3>
                  <ul className="info-list">
                    {(recommendedFor.length > 0 ? recommendedFor : bestFor).slice(0, 4).map((item) => <li key={item}>{item}</li>)}
                    {recommendedFor.length === 0 && bestFor.length === 0 ? <li>You need this category and can review the pricing fit.</li> : null}
                  </ul>
                </div>
                <div className="decision-box caution">
                  <h3>Skip it if</h3>
                  <ul className="info-list">
                    {notRecommendedFor.length > 0 ? notRecommendedFor.slice(0, 4).map((item) => <li key={item}>{item}</li>) : <li>The tool has not been fully reviewed for your use case.</li>}
                  </ul>
                </div>
              </div>
            </article>

            <article className="card">
              <h2>Editorial take</h2>
              <p>{tool.decisionSummary || tool.shortDescription}</p>
              {editorialParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
              <div className="decision-grid">
                <div>
                  <h3>Pros</h3>
                  {pros.length > 0 ? (
                    <ul className="info-list">
                      {pros.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : <p>Pros are pending editorial review.</p>}
                </div>
                <div>
                  <h3>Cons</h3>
                  {cons.length > 0 ? (
                    <ul className="info-list">
                      {cons.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : <p>Cons are pending editorial review.</p>}
                </div>
              </div>
            </article>

            <article className="card">
              <h2>Review notes</h2>
              <div className="comparison-table">
                <div className="comparison-row">
                  <strong>Pricing fit</strong>
                  <span>{pricingText}{tool.freePlanAvailable ? " with a free plan available." : " with no confirmed free plan."}</span>
                </div>
                <div className="comparison-row">
                  <strong>Review status</strong>
                  <span>{tool.editorialStatus || "review"}</span>
                </div>
                <div className="comparison-row">
                  <strong>Last updated</strong>
                  <span>{formatDate(updatedAt)}</span>
                </div>
              </div>
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
            <div className="card cta-card">
              <h2>Try {tool.name}</h2>
              <p>{tool.affiliateDisclosure || "This page may use affiliate links. Recommendations should still be reviewed against your own needs."}</p>
              {officialUrl ? (
                <a className="button primary full-width" href={officialUrl} rel="nofollow sponsored noopener" target="_blank">
                  Visit official site
                </a>
              ) : null}
            </div>

            <div className="card">
              <h2>Snapshot</h2>
              <ul className="info-list">
                <li><strong>Verdict:</strong> {verdict}</li>
                <li><strong>Pricing:</strong> {pricingText}</li>
                <li><strong>Free plan:</strong> {tool.freePlanAvailable ? "Yes" : "No or unknown"}</li>
                <li><strong>Last reviewed:</strong> {formatDate(tool.lastReviewedAt)}</li>
              </ul>

              <h3>Best for</h3>
              <div className="meta">
                {bestFor.length > 0 ? bestFor.map((item) => <span className="pill" key={item}>{item}</span>) : <span className="pill">Review pending</span>}
              </div>
            </div>

            <div className="card">
              <h2>Categories</h2>
              <div className="meta">
                {categories.map((category) => (
                  <Link className="pill" href={`/categories/${category.slug}`} key={category.documentId}>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="card">
              <h2>Sources</h2>
              <ul className="info-list">
                {sourceUrls.slice(0, 4).map((url) => (
                  <li key={url}><a href={url} rel="nofollow noopener" target="_blank">{url}</a></li>
                ))}
                {sourceUrls.length === 0 && sources.length === 0 ? <li>Source details are pending.</li> : null}
                {sources.slice(0, 3).map((source) => (
                  <li key={source.documentId}>{source.name}</li>
                ))}
              </ul>
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
