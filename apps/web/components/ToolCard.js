import Link from "next/link";
import { formatPricing } from "../lib/strapi";
import { ScoreBadge } from "./ScoreBadge";

export function ToolCard({ tool }) {
  const categories = tool.categories || [];

  return (
    <article className="card">
      <h3>
        <Link href={`/tools/${tool.slug}`}>{tool.name}</Link>
      </h3>
      <p>{tool.shortDescription}</p>
      <div className="meta">
        <ScoreBadge tool={tool} />
        <span className="pill">{formatPricing(tool)}</span>
        {tool.freePlanAvailable ? <span className="pill">Free plan</span> : null}
        {categories.slice(0, 2).map((category) => (
          <Link className="pill" href={`/categories/${category.slug}`} key={category.documentId}>
            {category.name}
          </Link>
        ))}
      </div>
    </article>
  );
}
