import Link from "next/link";
import { getAlternatives } from "../../lib/strapi";

export const metadata = {
  title: "E-commerce Tool Alternatives",
  description: "Find alternatives to popular e-commerce tools by use case, team size, and workflow fit.",
};

export default async function AlternativesIndexPage() {
  const alternatives = await getAlternatives();

  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Alternatives</p>
          <h1>Find better-fit alternatives.</h1>
          <p>For users who know one product but want options that better match their store, budget, or workflow.</p>
        </div>
      </header>
      <section className="section">
        <div className="container grid">
          {alternatives.map((alternative) => (
            <article className="card" key={alternative.documentId}>
              <h3><Link href={`/alternatives/${alternative.slug}`}>{alternative.title}</Link></h3>
              <p>{alternative.seoDescription || alternative.intro}</p>
              <div className="meta">
                <span className="pill">{alternative.alternativeTools?.length || 0} alternatives</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
