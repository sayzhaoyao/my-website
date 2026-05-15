import { CategoryCard } from "../components/CategoryCard";
import { ToolCard } from "../components/ToolCard";
import { getAlternatives, getBestLists, getCategories, getComparisons, getTools } from "../lib/strapi";

export const metadata = {
  title: "AI and Software Tools for E-commerce Sellers",
  description:
    "Discover, compare, and review AI and software tools for Shopify, Amazon, and cross-border e-commerce sellers.",
};

export default async function HomePage() {
  const [categories, tools, bestLists, comparisons, alternatives] = await Promise.all([
    getCategories(),
    getTools(),
    getBestLists(),
    getComparisons(),
    getAlternatives(),
  ]);
  const featuredTools = tools.slice(0, 9);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">E-commerce software directory</p>
            <h1>Find better tools for growing an online store.</h1>
            <p className="hero-copy">
              A structured directory for sellers comparing AI, marketing, support, analytics, and automation tools.
              Built for useful SEO pages instead of thin scraped content.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#categories">Browse categories</a>
              <a className="button" href="#tools">Explore tools</a>
            </div>
          </div>
          <aside className="stats-panel" aria-label="Directory statistics">
            <div className="stat-row">
              <span className="stat-label">Categories</span>
              <span className="stat-value">{categories.length}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Tools</span>
              <span className="stat-value">{tools.length}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Update flow</span>
              <span className="stat-value">Review</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Decision pages</span>
              <span className="stat-value">{bestLists.length + comparisons.length + alternatives.length}</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Decision pages</h2>
              <p>SEO pages built around search intent: best tools, direct comparisons, and alternatives.</p>
            </div>
          </div>
          <div className="decision-grid">
            <article className="card">
              <h3><a href="/best">Best tools lists</a></h3>
              <p>Ranked pages for task-based and audience-based tool discovery.</p>
              <div className="meta"><span className="pill">{bestLists.length} pages</span></div>
            </article>
            <article className="card">
              <h3><a href="/compare">Comparisons</a></h3>
              <p>Side-by-side pages that help users choose between known tools.</p>
              <div className="meta"><span className="pill">{comparisons.length} pages</span></div>
            </article>
            <article className="card">
              <h3><a href="/alternatives">Alternatives</a></h3>
              <p>Pages for users who know one product but want better-fit options.</p>
              <div className="meta"><span className="pill">{alternatives.length} pages</span></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Categories</h2>
              <p>Start with a task, then compare tools that fit the workflow and store stage.</p>
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
              <h2>Featured tools</h2>
              <p>Seeded sample records from the CMS, ready for editorial review and enrichment.</p>
            </div>
          </div>
          <div className="grid">
            {featuredTools.map((tool) => (
              <ToolCard tool={tool} key={tool.documentId} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
