import Link from "next/link";
import { getCategories, getTools } from "../../lib/strapi";

export const metadata = {
  title: "E-commerce Software Categories",
  description: "Browse e-commerce software categories for product research, email marketing, SEO, support, analytics, automation, and creative workflows.",
  alternates: {
    canonical: "/categories",
  },
};

export default async function CategoriesIndexPage() {
  const [categories, tools] = await Promise.all([getCategories(), getTools()]);
  const toolCounts = new Map();

  for (const tool of tools) {
    for (const category of tool.categories || []) {
      toolCounts.set(category.slug, (toolCounts.get(category.slug) || 0) + 1);
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "E-commerce software categories",
    description: metadata.description,
    mainEntity: categories.map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.name,
      url: `/categories/${category.slug}`,
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
            <p className="eyebrow">Categories</p>
            <h1>Browse software by e-commerce workflow.</h1>
            <p>Start with a category when you know the job to solve but have not chosen a shortlist yet.</p>
            <div className="hero-actions">
              <Link className="button primary" href="/best">View buying guides</Link>
              <Link className="button secondary" href="/compare">View comparisons</Link>
            </div>
          </div>
          <aside className="verdict-panel">
            <span className="verdict-label">Category hub</span>
            <strong>{categories.length} workflow categories</strong>
            <p>Each category page includes ranked tools, selection criteria, comparison snapshots, and FAQ content.</p>
          </aside>
        </div>
      </header>
      <section className="section">
        <div className="container grid">
          {categories.map((category) => (
            <article className="card intent-card" key={category.documentId}>
              <h2><Link href={`/categories/${category.slug}`}>{category.name}</Link></h2>
              <p>{category.intro}</p>
              <div className="meta">
                <span className="pill">{toolCounts.get(category.slug) || 0} tools</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
