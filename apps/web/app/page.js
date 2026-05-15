import { CategoryCard } from "../components/CategoryCard";
import { ToolCard } from "../components/ToolCard";
import { getAlternatives, getAverageScore, getBestLists, getCategories, getComparisons, getTools } from "../lib/strapi";

export const metadata = {
  title: "E-commerce Software Reviews, Comparisons, and Tool Rankings",
  description:
    "Compare e-commerce software, AI tools, marketing platforms, Amazon seller tools, and Shopify apps with decision-focused reviews.",
  openGraph: {
    title: "E-commerce Software Reviews, Comparisons, and Tool Rankings",
    description:
      "Compare e-commerce software, AI tools, marketing platforms, Amazon seller tools, and Shopify apps with decision-focused reviews.",
    url: "/",
    type: "website",
    siteName: "Commerce Toolbase",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Software Reviews, Comparisons, and Tool Rankings",
    description:
      "Compare e-commerce software, AI tools, marketing platforms, Amazon seller tools, and Shopify apps with decision-focused reviews.",
  },
};

export default async function HomePage() {
  const [categories, tools, bestLists, comparisons, alternatives] = await Promise.all([
    getCategories(),
    getTools(),
    getBestLists(),
    getComparisons(),
    getAlternatives(),
  ]);
  const featuredTools = [...tools]
    .map((tool) => ({ ...tool, averageScore: getAverageScore(tool) || 0 }))
    .sort((a, b) => b.averageScore - a.averageScore || a.name.localeCompare(b.name))
    .slice(0, 6);
  const primaryCategory = categories.find((category) => category.slug === "email-marketing-tools") || categories[0];
  const featuredBestLists = bestLists.slice(0, 3);
  const featuredComparisons = comparisons.slice(0, 3);
  const featuredAlternatives = alternatives.slice(0, 2);
  const workflowSteps = [
    "Start from the task you need to improve.",
    "Shortlist tools with pricing, fit, and decision scores.",
    "Read comparison and alternatives pages before signing up.",
    "Review official sources and keep records in draft before publishing.",
  ];
  const faqItems = [
    {
      question: "Who is Commerce Toolbase for?",
      answer: "Commerce Toolbase is for e-commerce operators, Shopify merchants, Amazon sellers, and small teams comparing software before spending time or money.",
    },
    {
      question: "How are tools selected?",
      answer: "Tools are organized by workflow, scored with editorial criteria, and supported by source-aware CMS records so imported data can be reviewed before publishing.",
    },
    {
      question: "Does the site use affiliate links?",
      answer: "The site is built with affiliate monetization in mind. Tool pages include disclosure space and official-site calls to action, while still keeping recommendations review-first.",
    },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}#organization`,
        name: "Commerce Toolbase",
        url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        description: "Source-aware e-commerce software reviews, comparisons, rankings, and alternatives.",
      },
      {
        "@type": "WebSite",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}#website`,
        name: "Commerce Toolbase",
        url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        description: metadata.description,
        about: "E-commerce software reviews and comparisons",
        publisher: {
          "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}#organization`,
        },
      },
    ],
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">E-commerce software reviews</p>
            <h1>Choose better tools for your online store.</h1>
            <p className="hero-copy">
              Compare Shopify apps, Amazon seller software, AI tools, email platforms, analytics, and automation products with review-ready data and decision-focused pages.
            </p>
            <div className="hero-actions">
              {primaryCategory ? <a className="button primary" href={`/categories/${primaryCategory.slug}`}>Start with a category</a> : null}
              <a className="button" href="/best">View best tools</a>
            </div>
          </div>
          <aside className="home-verdict-card" aria-label="Recommended starting path">
            <span className="verdict-label">Start here</span>
            <h2>Pick a workflow, then compare the shortlist.</h2>
            <p>Most software decisions fail when teams start from brand names. Start from the job: retention, product research, SEO, support, analytics, or automation.</p>
            <div className="meta">
              <span className="pill">{categories.length} categories</span>
              <span className="pill">{tools.length} tools</span>
              <span className="pill">{bestLists.length + comparisons.length + alternatives.length} decision pages</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Find the right decision page</h2>
              <p>Use the page type that matches where you are in the buying process.</p>
            </div>
          </div>
          <div className="decision-grid">
            <article className="card intent-card">
              <h3><a href="/best">Best tools lists</a></h3>
              <p>Use these when you know the task but need a shortlist.</p>
              <div className="meta"><span className="pill">{bestLists.length} pages</span></div>
            </article>
            <article className="card intent-card">
              <h3><a href="/compare">Comparisons</a></h3>
              <p>Use these when you are choosing between two known products.</p>
              <div className="meta"><span className="pill">{comparisons.length} pages</span></div>
            </article>
            <article className="card intent-card">
              <h3><a href="/alternatives">Alternatives</a></h3>
              <p>Use these when a popular tool feels too expensive or too complex.</p>
              <div className="meta"><span className="pill">{alternatives.length} pages</span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Browse by e-commerce workflow</h2>
              <p>Each category page includes rankings, selection criteria, comparison snapshots, and FAQ content.</p>
            </div>
          </div>
          <div className="grid">
            {categories.map((category) => (
              <CategoryCard category={category} key={category.documentId} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="tools">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Top scored tools</h2>
              <p>These profiles already include decision scores and review notes.</p>
            </div>
          </div>
          <div className="grid">
            {featuredTools.map((tool) => (
              <ToolCard tool={tool} key={tool.documentId} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="card cta-card">
            <div className="section-header">
              <div>
                <h2>Why trust the reviews?</h2>
                <p>Commerce Toolbase separates source collection from editorial judgment, uses a published score model, and keeps affiliate context visible before monetization.</p>
              </div>
              <div className="hero-actions">
                <a className="button secondary" href="/methodology">Read methodology</a>
                <a className="button secondary" href="/editorial-policy">Editorial policy</a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <div className="detail-panel">
            <article className="card">
              <h2>Featured buying guides</h2>
              <div className="rank-list">
                {featuredBestLists.map((list, index) => (
                  <div className="rank-item" key={list.documentId}>
                    <span className="rank-number">{index + 1}</span>
                    <div>
                      <h3><a href={`/best/${list.slug}`}>{list.title}</a></h3>
                      <p>{list.intro || list.seoDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="card">
              <h2>Popular comparisons</h2>
              <div className="decision-grid">
                {featuredComparisons.map((comparison) => (
                  <article className="decision-box" key={comparison.documentId}>
                    <h3><a href={`/compare/${comparison.slug}`}>{comparison.title}</a></h3>
                    <p>{comparison.summary || comparison.recommendation}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>

          <aside className="side-stack">
            <div className="card">
              <h2>How to use the site</h2>
              <ol className="info-list ordered-list">
                {workflowSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>

            <div className="card cta-card">
              <h2>Looking for alternatives?</h2>
              <p>Start from a tool you already know, then compare replacement options.</p>
              {featuredAlternatives[0] ? (
                <a className="button primary full-width" href={`/alternatives/${featuredAlternatives[0].slug}`}>
                  View alternatives
                </a>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
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
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
