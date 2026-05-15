import Link from "next/link";

export const metadata = {
  title: "Affiliate Disclosure",
  description: "Commerce Toolbase affiliate disclosure and how monetization is separated from editorial recommendations.",
  alternates: {
    canonical: "/affiliate-disclosure",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Affiliate Disclosure</p>
          <h1>How this site may earn revenue.</h1>
          <p>Commerce Toolbase may use affiliate links or partner links on some software pages. Recommendations should still be based on fit, tradeoffs, and verified source context.</p>
        </div>
      </header>
      <section className="section">
        <div className="container policy-content">
          <article className="card">
            <h2>Affiliate Links</h2>
            <p>If you click a partner link and purchase a product, this site may earn a commission at no extra cost to you. Not every tool has an affiliate relationship.</p>
          </article>
          <article className="card">
            <h2>Editorial Independence</h2>
            <ul className="info-list">
              <li>Affiliate availability should not determine whether a tool is listed.</li>
              <li>Paid relationships should not override pros, cons, or best-fit guidance.</li>
              <li>Pricing, plan limits, and product claims should be checked against official sources.</li>
            </ul>
          </article>
          <article className="card">
            <h2>Buyer Reminder</h2>
            <p>Always verify the current plan, contract terms, feature availability, integrations, and support details on the official vendor site before making a purchase.</p>
            <Link className="button secondary" href="/editorial-policy">Read editorial policy</Link>
          </article>
        </div>
      </section>
    </>
  );
}
