import Link from "next/link";

export const metadata = {
  title: "Review Methodology",
  description: "How Commerce Toolbase scores e-commerce software, verifies sources, and separates automation from editorial judgment.",
};

const scoreDimensions = [
  {
    name: "Ease of use",
    description: "Setup effort, interface clarity, onboarding quality, and how quickly an e-commerce team can reach a useful workflow.",
  },
  {
    name: "Pricing value",
    description: "Plan transparency, free or trial access, scaling costs, and whether the feature depth fits the expected monthly spend.",
  },
  {
    name: "Integrations",
    description: "Native support for commerce platforms, marketing tools, marketplaces, analytics systems, and operational data sources.",
  },
  {
    name: "Automation depth",
    description: "Workflow builders, rules, triggers, templates, AI assistance, and how much repeat work the tool can safely reduce.",
  },
  {
    name: "SEO usefulness",
    description: "Direct value for search visibility, product content, structured content, keyword research, listing optimization, or technical SEO workflows.",
  },
  {
    name: "Support quality",
    description: "Help center clarity, onboarding support, documentation, migration help, and the support expectations implied by the product tier.",
  },
];

const sourcePriority = [
  "Official product, pricing, documentation, changelog, and help center pages.",
  "CMS source records and import logs that show when a source was checked.",
  "Manual editorial notes from page review and product-fit analysis.",
  "Third-party context used only for research, not as automatic source-of-truth content.",
];

export default function MethodologyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Commerce Toolbase Review Methodology",
    description: metadata.description,
    about: "Software review methodology for e-commerce tools",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Methodology</p>
          <h1>How Commerce Toolbase scores and reviews software.</h1>
          <p>Scores are designed to help e-commerce teams compare practical fit, not to crown a universal winner. Automation can collect source changes, but published recommendations need editorial review.</p>
        </div>
      </header>

      <section className="section">
        <div className="container policy-content">
          <article className="card">
            <h2>Score Scale</h2>
            <p>Each score uses a 1-to-5 scale. A 5 means the tool is unusually strong for the dimension and target workflow. A 3 means useful but with meaningful tradeoffs. A 1 means weak fit, missing evidence, or limited relevance for that dimension.</p>
          </article>

          <article className="card">
            <h2>Scoring Dimensions</h2>
            <ul className="info-list">
              {scoreDimensions.map((dimension) => (
                <li key={dimension.name}>
                  <strong>{dimension.name}:</strong> {dimension.description}
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2>Source Priority</h2>
            <ol className="ordered-list">
              {sourcePriority.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ol>
          </article>

          <article className="card">
            <h2>Automation Rules</h2>
            <p>Collection scripts can identify official page metadata, pricing-page changes, changelog updates, and source freshness signals. New tools and important claims should enter draft or review workflows before public publishing.</p>
            <p>Scores, verdicts, rankings, pros, cons, recommended users, skip conditions, and affiliate recommendations should remain human editorial decisions.</p>
          </article>

          <article className="card cta-card">
            <h2>How To Challenge A Review</h2>
            <p>Send the page URL, official source URL, and the claim that needs correction. Useful corrections should be routed through the CMS and review queue before the public page changes.</p>
            <div className="hero-actions">
              <Link className="button secondary" href="/contact">Send a correction</Link>
              <Link className="button secondary" href="/editorial-policy">Editorial policy</Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
