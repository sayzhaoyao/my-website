import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { ToolCard } from "../../../components/ToolCard";
import { formatPricing, getAverageScore, getCategories, getCategoryBySlug, getToolsByCategorySlug } from "../../../lib/strapi";

function buildCriteria(categoryName) {
  return [
    `Fit for ${categoryName.toLowerCase()} workflows`,
    "Pricing clarity and value for small teams",
    "Ease of setup and ongoing maintenance",
    "Useful integrations for e-commerce operations",
    "Evidence that the tool solves a real buyer problem",
  ];
}

function getTopTools(tools) {
  return [...tools]
    .map((tool) => ({ ...tool, averageScore: getAverageScore(tool) || 0 }))
    .sort((a, b) => b.averageScore - a.averageScore || a.name.localeCompare(b.name))
    .slice(0, 5);
}

function getCategoryFaq(category, tools) {
  const topTool = getTopTools(tools)[0];
  const categoryLabel = category.name.toLowerCase();
  return [
    {
      question: `What are ${categoryLabel} used for?`,
      answer: `${category.name} help e-commerce teams compare software options for a specific workflow, then choose tools that match budget, team size, and operating complexity.`,
    },
    {
      question: `How should I choose from ${categoryLabel}?`,
      answer: "Start with the job you need done, shortlist tools with clear pricing and strong integrations, then review tradeoffs before committing to a paid plan.",
    },
    {
      question: `What is the best option in this ${categoryLabel} list?`,
      answer: topTool
        ? `${topTool.name} is currently one of the strongest options in this category based on the available decision scores and editorial notes.`
        : "This category does not have enough reviewed tools yet to name a top pick.",
    },
  ];
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.seoTitle || category.name,
    description: category.seoDescription || `Compare tools in ${category.name}.`,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [category, tools] = await Promise.all([
    getCategoryBySlug(slug),
    getToolsByCategorySlug(slug),
  ]);

  if (!category) {
    notFound();
  }

  const topTools = getTopTools(tools);
  const criteria = buildCriteria(category.name);
  const faqItems = getCategoryFaq(category, tools);
  const intro = category.seoDescription || category.intro || `Compare ${category.name.toLowerCase()} for e-commerce teams.`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: intro,
    mainEntity: tools.slice(0, 10).map((tool) => ({
      "@type": "SoftwareApplication",
      name: tool.name,
      url: `/tools/${tool.slug}`,
      description: tool.shortDescription,
    })),
  };

  return (
    <>
      <header className="page-head">
        <div className="container category-hero">
          <Breadcrumbs
            items={[
              { label: "Categories", href: "/categories" },
              { label: category.name, href: `/categories/${category.slug}` },
            ]}
          />
          <p className="eyebrow">Software category</p>
          <h1>{category.name}</h1>
          <p>{intro}</p>
          <div className="meta">
            <span className="pill">{tools.length} tools tracked</span>
            <span className="pill">{topTools.length} scored picks</span>
            <span className="pill">Review-first recommendations</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>Best {category.name.toLowerCase()} to shortlist</h2>
              {topTools.length > 0 ? (
                <ol className="rank-list">
                  {topTools.map((tool, index) => (
                    <li className="rank-item" key={tool.documentId}>
                      <span className="rank-number">{index + 1}</span>
                      <div>
                        <h3><a href={`/tools/${tool.slug}`}>{tool.name}</a></h3>
                        <p>{tool.decisionSummary || tool.shortDescription}</p>
                        <div className="meta">
                          <span className="score-badge">{tool.averageScore ? `${tool.averageScore}/5` : "Score pending"}</span>
                          <span className="pill">{formatPricing(tool)}</span>
                          {tool.freePlanAvailable ? <span className="pill">Free plan</span> : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="empty">No reviewed tools have been added to this category yet.</div>
              )}
            </article>

            <article className="card">
              <h2>All tracked tools</h2>
              {tools.length > 0 ? (
                <div className="grid">
                  {tools.map((tool) => (
                    <ToolCard tool={tool} key={tool.documentId} />
                  ))}
                </div>
              ) : (
                <div className="empty">No tools have been added to this category yet.</div>
              )}
            </article>

            <article className="card">
              <h2>Comparison snapshot</h2>
              <div className="comparison-table">
                <div className="comparison-row table-head">
                  <strong>Tool</strong>
                  <span>Best signal</span>
                </div>
                {topTools.map((tool) => (
                  <div className="comparison-row" key={tool.documentId}>
                    <strong>{tool.name}</strong>
                    <span>{tool.decisionSummary || `${formatPricing(tool)} pricing with ${tool.averageScore || "pending"} score.`}</span>
                  </div>
                ))}
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
            <div className="card">
              <h2>Selection criteria</h2>
              <ul className="info-list">
                {criteria.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="card cta-card">
              <h2>Start with the top picks</h2>
              <p>Open the highest-scored profiles, compare pricing and tradeoffs, then review the official site before signing up.</p>
              {topTools[0] ? (
                <a className="button primary full-width" href={`/tools/${topTools[0].slug}`}>
                  View top pick
                </a>
              ) : null}
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
