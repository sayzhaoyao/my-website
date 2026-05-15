import Link from "next/link";

export function CategoryCard({ category }) {
  return (
    <article className="card">
      <h3>
        <Link href={`/categories/${category.slug}`}>{category.name}</Link>
      </h3>
      <p>{category.seoDescription || category.intro || "Explore tools in this category."}</p>
      <div className="meta">
        <span className="pill">SEO page</span>
        {category.indexable ? <span className="pill">Indexable</span> : null}
      </div>
    </article>
  );
}
