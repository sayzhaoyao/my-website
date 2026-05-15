import { notFound } from "next/navigation";
import { ToolCard } from "../../../components/ToolCard";
import { getCategories, getCategoryBySlug, getToolsByCategorySlug } from "../../../lib/strapi";

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

  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Category</p>
          <h1>{category.name}</h1>
          <p>{category.seoDescription || category.intro || "Compare tools for this e-commerce workflow."}</p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          {tools.length > 0 ? (
            <div className="grid">
              {tools.map((tool) => (
                <ToolCard tool={tool} key={tool.documentId} />
              ))}
            </div>
          ) : (
            <div className="empty">No tools have been added to this category yet.</div>
          )}
        </div>
      </section>
    </>
  );
}
