# Frontend

## Stack

- Framework: Next.js
- Runtime: Docker Compose
- Data source: Strapi REST API

## Local URL

```text
http://localhost:3000
```

## Start

From the repository root:

```powershell
docker compose up --build -d
```

## Production Build Check

The default web service runs as a production preview for local stability. It builds when the container starts so Next.js can read Strapi over the Docker Compose network:

```powershell
docker compose up --build -d web
```

To run a production build check directly in the already-running container:

```powershell
docker compose logs -f web
```

If you need hot-reload development later, change `.env`:

```text
WEB_DOCKER_TARGET=development
WEB_NODE_ENV=development
```

Then re-add local bind mounts for `apps/web` in `docker-compose.yml` or run the frontend outside Docker with Node installed.

## Pages

- `/`
- `/categories`
- `/categories/[slug]`
- `/tools/[slug]`
- `/best`
- `/best/[slug]`
- `/compare`
- `/compare/[slug]`
- `/alternatives`
- `/alternatives/[slug]`
- `/about`
- `/contact`
- `/editorial-policy`
- `/affiliate-disclosure`
- `/privacy-policy`
- `/terms`
- `/manifest.webmanifest`
- `/robots.txt`
- `/sitemap.xml`
- `/feed.xml`

## Data Flow

The frontend reads public, published content from Strapi using the internal Docker network URL:

```text
STRAPI_INTERNAL_URL=http://cms:1337
```

The CMS bootstrap grants Public role read access to:

- `category.find`
- `category.findOne`
- `tool.find`
- `tool.findOne`
- `best-list.find`
- `best-list.findOne`
- `comparison.find`
- `comparison.findOne`
- `alternative.find`
- `alternative.findOne`

## Decision Content

The frontend is built around decision pages rather than a simple link directory:

- The homepage explains the review site positioning, routes users by search intent, surfaces categories, scored tools, buying guides, comparisons, alternatives, FAQ, and WebSite structured data.
- Tool pages show overview, pricing, pros and cons, categories, recommended users, users who should skip the tool, and a six-part decision score.
- Tool review pages include a quick verdict, conversion CTA, affiliate disclosure area, review notes, FAQ, sources, and SoftwareApplication structured data.
- Category pages include shortlist rankings, selection criteria, comparison snapshots, FAQ content, and CollectionPage structured data.
- The category index page lists workflow categories and links users into category-specific shortlists.
- Best Tools pages include ranked shortlists, selection criteria, quick comparison tables, CTA blocks, FAQ content, and ItemList structured data.
- Comparison pages include a hero recommendation, decision snapshot, feature notes, pricing context, FAQ content, internal links, and Article structured data.
- Alternatives pages include a hero recommendation, ranked replacement options, quick comparison tables, switch criteria, FAQ content, internal links, and Article/ItemList structured data.
- Editorial policy and affiliate disclosure pages provide public trust and monetization context.
- About, contact, privacy, and terms pages provide site identity, contact, and basic legal context.

Tool score fields currently used by the UI:

- `easeOfUseScore`
- `pricingValueScore`
- `integrationScore`
- `automationDepthScore`
- `seoUsefulnessScore`
- `supportQualityScore`

## SEO

Implemented:

- page-level metadata,
- dynamic category metadata,
- dynamic tool metadata,
- Best Tools pages,
- comparison pages,
- alternatives pages,
- category index,
- editorial policy,
- affiliate disclosure,
- about and contact pages,
- privacy policy,
- terms of use,
- default Open Graph and Twitter metadata,
- web app manifest,
- robots.txt,
- sitemap.xml,
- RSS feed,
- semantic page structure,
- server-rendered content.

The RSS feed exposes public discovery pages, category pages, buying guides, comparisons, alternatives, and tool review pages for feed readers and lightweight content syndication.
