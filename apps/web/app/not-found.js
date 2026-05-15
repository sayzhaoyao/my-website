import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-head">
      <div className="container">
        <p className="eyebrow">Not found</p>
        <h1>Page not found</h1>
        <p>The page may have moved, or the record is still waiting for editorial review.</p>
        <div className="hero-actions">
          <Link className="button primary" href="/">Back to homepage</Link>
        </div>
      </div>
    </section>
  );
}
