import Link from "next/link";
import { getComparisons } from "../../lib/strapi";

export const metadata = {
  title: "E-commerce Tool Comparisons",
  description: "Compare popular e-commerce software tools side by side before choosing a stack.",
};

export default async function CompareIndexPage() {
  const comparisons = await getComparisons();

  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Comparisons</p>
          <h1>Side-by-side tool comparisons.</h1>
          <p>For users who already know two tools and need a practical recommendation.</p>
        </div>
      </header>
      <section className="section">
        <div className="container grid">
          {comparisons.map((comparison) => (
            <article className="card" key={comparison.documentId}>
              <h3><Link href={`/compare/${comparison.slug}`}>{comparison.title}</Link></h3>
              <p>{comparison.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
