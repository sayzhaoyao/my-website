import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Commerce Toolbase privacy policy for visitors, analytics, affiliate links, and contact requests.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Privacy Policy</p>
          <h1>How visitor data is handled.</h1>
          <p>This page explains the privacy baseline for Commerce Toolbase as a software review and comparison website.</p>
        </div>
      </header>
      <section className="section">
        <div className="container policy-content">
          <article className="card">
            <h2>Information We May Collect</h2>
            <ul className="info-list">
              <li>Basic usage data such as pages visited, referring pages, browser type, and approximate device information.</li>
              <li>Information you send by email, such as correction requests, partnership notes, or software suggestions.</li>
              <li>Affiliate click data if a page uses partner links or tracking parameters.</li>
            </ul>
          </article>
          <article className="card">
            <h2>How Information Is Used</h2>
            <p>Information may be used to improve site content, diagnose technical issues, review corrections, respond to messages, and understand which comparison pages are useful to readers.</p>
          </article>
          <article className="card">
            <h2>Third-Party Services</h2>
            <p>Commerce Toolbase may use third-party tools for analytics, hosting, affiliate tracking, or email communication. Those services may process data according to their own policies.</p>
          </article>
          <article className="card">
            <h2>Contact</h2>
            <p>For privacy questions or correction requests, use the contact page.</p>
            <Link className="button secondary" href="/contact">Contact Commerce Toolbase</Link>
          </article>
        </div>
      </section>
    </>
  );
}
