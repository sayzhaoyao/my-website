# Website Strategy

## Goal
Build a maintainable, SEO-friendly website that can update content automatically and eventually generate revenue.

## Key Principle
Do not build a thin auto-scraped content site. The safer long-term approach is:

- collect data from legal and reliable sources,
- transform it into structured, useful pages,
- add original value through comparison, filtering, summaries, scoring, tools, or editorial review,
- keep every indexed page useful on its own.

## Recommended Website Types

### 1. Niche Directory And Comparison Site
Examples:

- AI tools directory for a specific profession
- local services directory
- SaaS comparison site
- course/resource directory
- product alternatives database

Why it is strong:

- Good fit for SEO because each item/category/comparison can become a useful landing page.
- Easy to monetize with affiliate links, sponsored listings, lead generation, or ads.
- Content can update automatically from APIs, RSS feeds, public datasets, vendor pages, or manual submissions.

Risks:

- Needs clear differentiation. A generic directory is hard to rank.
- Must avoid copied descriptions. Rewrite, normalize, enrich, and add unique fields.

### 2. Programmatic SEO Data Site
Examples:

- "best X for Y" pages generated from structured criteria
- city/category landing pages with real useful data
- calculators and benchmark pages
- price/ranking/trend trackers

Why it is strong:

- Scales well when the data model is solid.
- Easier to maintain than writing every page manually.
- SEO can work if pages answer specific search intent.

Risks:

- Very easy to create low-value duplicate pages.
- Requires strict rules for which pages are indexable.

### 3. Deals, Coupons, Or Price Tracking Site
Examples:

- niche product deals
- software discounts
- marketplace price comparison

Why it is strong:

- Clear monetization through affiliate revenue.
- Automated updates are natural.

Risks:

- Competitive.
- Needs frequent updates, accuracy checks, and clear source policies.
- Thin coupon pages can be risky for SEO.

### 4. Content Hub With Tools
Examples:

- buying guides plus calculators
- templates plus explainers
- industry news summaries plus searchable database

Why it is strong:

- Tools create original value beyond articles.
- Better trust and retention than pure scraped content.

Risks:

- Requires more upfront product thinking and implementation.

## Recommended First Direction
Start with a niche directory/comparison site plus programmatic SEO pages.

Recommended positioning:

- choose one narrow niche,
- build a structured database,
- generate useful category/detail/comparison pages,
- add filtering, search, tags, pros/cons, pricing, update date, and source attribution,
- monetize with affiliate links, sponsorship, lead forms, or ads after traffic starts.

This balances automation, SEO, maintainability, and monetization.

## Backend Recommendation

### Best Overall For This Project: Strapi + PostgreSQL
Use Strapi as the content/admin backend and PostgreSQL as the database.

Why:

- Docker-friendly.
- Provides an admin panel out of the box.
- Good for structured content types such as tools, categories, sources, reviews, offers, and SEO metadata.
- Easier for non-technical editing than a custom admin.
- API-first, so the frontend can be Next.js, Astro, or another framework.

Suggested services:

- `frontend`: Next.js or Astro
- `cms`: Strapi
- `db`: PostgreSQL
- `worker`: crawler/import/update jobs
- `queue`: Redis, optional later
- `search`: Meilisearch, optional later
- `automation`: n8n, optional later for scheduled workflows

### Alternative: WordPress
Use WordPress if the site is mostly articles and you want the fastest content/admin workflow.

Pros:

- Very mature CMS.
- Excellent editorial workflow.
- Many SEO plugins.
- Easy for manual content work.

Cons:

- Custom structured data workflows can become plugin-heavy.
- More care needed for performance and security.

### Alternative: Directus
Use Directus if you want a database-first admin UI.

Pros:

- Clean admin over SQL data.
- Good for structured databases.

Cons:

- Less content-marketing oriented than WordPress.
- May require more decisions around editorial workflow.

## Frontend Recommendation

### Option A: Next.js
Good when the site needs:

- dynamic pages,
- admin previews,
- API routes,
- frequent updates,
- flexible rendering.

### Option B: Astro
Good when the site is mostly:

- content pages,
- directory/detail pages,
- very SEO/performance focused,
- low interactivity.

Recommended starting choice:

- Next.js if you expect dashboards, user accounts, submissions, or dynamic comparison tools.
- Astro if the first version is mainly SEO landing pages and content/detail pages.

## SEO Rules For Auto-Updated Content

- Do not publish copied full text from other websites.
- Prefer APIs, RSS feeds, public datasets, official sources, and sources that permit reuse.
- Store source URL, fetch time, update time, and license/permission notes.
- Generate unique summaries, comparisons, scoring, tags, and normalized attributes.
- Use canonical URLs carefully.
- Only index pages with enough unique value.
- Use `noindex` for thin tag pages, internal search results, duplicate filters, and low-data pages.
- Add human review for important money pages.
- Keep sitemap and `lastmod` updated.
- Use structured data only when it accurately represents visible page content.

## Initial Data Model

Core tables/content types:

- `Source`: name, URL, type, permission notes, last checked time.
- `Item`: name, slug, category, description, official URL, pricing, features, pros, cons, rating, source, last updated time.
- `Category`: name, slug, SEO title, description, parent category.
- `Comparison`: item A, item B, summary, differences, recommendation.
- `Article`: title, slug, summary, body, author/reviewer, SEO metadata.
- `AffiliateLink`: item, network, URL, disclosure, status.
- `ImportLog`: source, status, changed records, errors, run time.

## First MVP

Build:

- public homepage,
- category listing pages,
- item detail pages,
- comparison pages,
- search/filter,
- sitemap,
- robots.txt,
- admin backend,
- scheduled import job,
- manual review status before publishing.

Do not build yet:

- user accounts,
- complex analytics dashboard,
- paid memberships,
- too many niches,
- fully automated publishing without review.

## Open Decisions

- Which niche will the site target?
- Which country/language is the main market?
- Which monetization model comes first: affiliate, ads, leads, sponsorship, or paid listings?
- Which data sources are allowed and reliable?
- Should the first version use Next.js or Astro?
