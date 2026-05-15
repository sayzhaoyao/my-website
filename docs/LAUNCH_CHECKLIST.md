# Launch Checklist

This checklist is for moving Commerce Toolbase from local Docker testing to a public, monetizable website.

## Current Local Baseline

- Docker Compose runs PostgreSQL, Strapi, Next.js, and the worker.
- CMS admin is available at `http://localhost:1337/admin`.
- Website preview is available at `http://localhost:3000`.
- Public pages include homepage, categories, tool reviews, best lists, comparisons, alternatives, editorial policy, affiliate disclosure, privacy policy, terms, sitemap, robots, RSS feed, manifest, and generated icons.
- Automated collection/import scripts write to review workflows instead of publishing directly.

## Before Public Launch

### Content Quality

- Review the first topic cluster manually: email/SMS marketing tools for e-commerce.
- Confirm each published tool has a clear verdict, best-for section, skip-if section, pros, cons, pricing summary, and source links.
- Keep pricing claims cautious unless the latest source was checked recently.
- Add affiliate links only after joining each partner program and confirming disclosure requirements.
- Remove, noindex, or keep unpublished any thin page that lacks useful decision content.

### SEO Readiness

- Set `NEXT_PUBLIC_SITE_URL` to the final production domain.
- Follow `docs/DEPLOYMENT.md` for hosting and environment setup.
- Check every indexable page has a unique title, description, H1, canonical URL, and internal links.
- Confirm `/sitemap.xml`, `/robots.txt`, and `/feed.xml` work on the production domain.
- Submit the sitemap in Google Search Console after deployment.
- Add the production domain to Bing Webmaster Tools.
- Track indexed pages and search queries weekly for the first month.

### Trust And Compliance

- Replace placeholder contact details with a working inbox by setting `NEXT_PUBLIC_CONTACT_EMAIL`.
- Review privacy policy and terms before launch.
- Keep affiliate disclosure visible on any page with affiliate links.
- Document editorial methodology before scaling reviews.
- Avoid publishing automated claims that have not been reviewed.

### Monetization Setup

- Start with affiliate programs for tools already covered in the first topic cluster.
- Add `affiliateUrl` and `affiliateDisclosure` only after acceptance into a program.
- Track clicks using a privacy-conscious analytics setup before optimizing CTA placement.
- Do not add paid listings until editorial rules and labeling are clear.
- Defer display ads until there is enough organic traffic to avoid hurting early UX.

### Analytics And Operations

- Add privacy-conscious analytics such as Plausible, Umami, or a configured self-hosted option. For Plausible, set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in the frontend environment.
- Add uptime monitoring for the website and CMS.
- Schedule weekly source collection and review queue checks.
- Keep backups for PostgreSQL before production use.
- Confirm Docker secrets and `.env` values are not committed.

## First 30 Days After Launch

1. Publish and polish the first complete content cluster.
2. Submit sitemap and monitor crawl coverage.
3. Improve pages receiving impressions but low clicks.
4. Add affiliate links only where the recommendation is editorially justified.
5. Expand one adjacent topic cluster instead of covering many unrelated categories.

## Do Not Launch Until

- The production domain is configured.
- The first cluster has been manually reviewed.
- Legal/trust pages have real contact and policy details.
- The CMS admin is protected with strong credentials.
- Backups and rollback steps are documented.
