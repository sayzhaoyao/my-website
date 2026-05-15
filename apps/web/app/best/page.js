import Link from "next/link";
import { getBestLists } from "../../lib/strapi";

export const metadata = {
  title: "Best E-commerce Tool Lists",
  description: "Browse curated best-tools lists for Shopify, Amazon, and e-commerce growth workflows.",
};

export default async function BestIndexPage() {
  const lists = await getBestLists();

  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Best tools</p>
          <h1>Ranked tool lists for e-commerce decisions.</h1>
          <p>Start with the job you need to solve, then compare tools by fit, workflow, and practical trade-offs.</p>
        </div>
      </header>
      <section className="section">
        <div className="container grid">
          {lists.map((list) => (
            <article className="card" key={list.documentId}>
              <h3><Link href={`/best/${list.slug}`}>{list.title}</Link></h3>
              <p>{list.seoDescription || list.intro}</p>
              <div className="meta">
                <span className="pill">{list.tools?.length || 0} tools</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
