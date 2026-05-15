# MVP Specification

## MVP Goal
Create the first shippable version of an SEO-friendly e-commerce tools directory and comparison website.

The MVP should prove:

- the content model works,
- the admin workflow is easy,
- pages can be generated for SEO,
- data can be updated automatically,
- monetization fields are ready even if revenue starts later.

## Recommended Stack

Use Docker locally.

Recommended first stack:

- Frontend: Next.js
- CMS/Admin: Strapi
- Database: PostgreSQL
- Worker: Node.js import/update scripts

Optional later:

- Redis for queues and caching.
- Meilisearch for fast search.
- n8n for visual automation workflows.

## Why Next.js For This MVP

Next.js is a good fit because the project may need:

- dynamic category/detail/comparison pages,
- server-side rendering or static generation,
- SEO metadata per page,
- sitemap and robots generation,
- API routes or server actions later,
- easy deployment options.

Astro is still a good alternative if the site remains mostly static, but Next.js gives more flexibility for future comparison tools and admin preview workflows.

## Core Public Pages

### Homepage
Purpose:

- explain the site quickly,
- show top categories,
- show featured tools,
- link to comparisons and guides.

SEO target:

- broad brand/category query.

### Category Page
URL pattern:

```text
/categories/[category-slug]
```

Purpose:

- list tools by task,
- support filtering and sorting,
- explain what the category is useful for.

Required fields:

- SEO title,
- meta description,
- H1,
- intro,
- tool list,
- related categories,
- related comparisons.

### Tool Detail Page
URL pattern:

```text
/tools/[tool-slug]
```

Purpose:

- help a user decide whether a tool is worth trying.

Required sections:

- overview,
- best for,
- pricing summary,
- key features,
- pros and cons,
- alternatives,
- source/update info,
- affiliate disclosure if applicable.

### Comparison Page
URL pattern:

```text
/compare/[tool-a]-vs-[tool-b]
```

Purpose:

- capture high-intent comparison searches.

Required sections:

- quick recommendation,
- feature comparison,
- pricing comparison,
- use-case comparison,
- alternatives,
- final verdict.

### Alternatives Page
URL pattern:

```text
/alternatives/[tool-slug]
```

Purpose:

- capture "alternative to X" searches.

Required sections:

- why users look for alternatives,
- recommended alternatives,
- comparison table,
- selection criteria.

## Admin Content Types

### Tool
Fields:

- name
- slug
- status: draft, review, published, archived
- website URL
- affiliate URL
- affiliate disclosure
- logo
- short description
- long description
- categories
- pricing model
- starting price
- free plan available
- key features
- pros
- cons
- best for
- decision summary
- ease of use score
- pricing value score
- integration score
- automation depth score
- SEO usefulness score
- support quality score
- recommended for
- not recommended for
- source URLs
- last imported at
- last reviewed at
- SEO title
- SEO description

### Category
Fields:

- name
- slug
- parent category
- intro
- SEO title
- SEO description
- indexable: yes/no

### Comparison
Fields:

- tool A
- tool B
- slug
- summary
- recommendation
- feature notes
- pricing notes
- verdict
- SEO title
- SEO description
- status

### Source
Fields:

- name
- source type
- URL
- permission notes
- fetch frequency
- last checked at
- status

### Import Log
Fields:

- source
- run status
- started at
- finished at
- records created
- records updated
- errors

## Automation Rules

Start with safe automation:

- import records as draft or review,
- never auto-publish brand new tools,
- allow auto-updating low-risk fields such as pricing text, source URL, and changelog notes,
- require manual review before major content changes go live,
- log every import run.

## SEO Rules

Index:

- strong category pages,
- tool detail pages with enough unique information,
- comparison pages with real decision value,
- alternatives pages with useful recommendations.

Noindex:

- internal search results,
- thin tag pages,
- duplicate filter combinations,
- draft/review pages,
- pages with missing key data.

Required technical SEO:

- unique title and meta description per indexable page,
- single H1 per page,
- canonical URL,
- sitemap.xml,
- robots.txt,
- Open Graph metadata,
- structured data where accurate,
- visible last updated date for tool pages.

## Editorial Scoring Rules

Use the score model to make pages more useful than a normal directory.

Current scoring dimensions:

- ease of use,
- pricing value,
- integrations,
- automation depth,
- SEO usefulness,
- support quality.

Scores should stay editorial, not purely automated. Automated collection can propose values, but production scores should be reviewed before publishing. Each important tool page should explain who the tool is recommended for and who should avoid it, because those sections help both users and search engines understand the decision context.

## MVP Build Order

1. Docker compose for PostgreSQL and Strapi.
2. Strapi content types and admin fields.
3. Next.js frontend skeleton.
4. Homepage, category page, and tool detail page.
5. SEO metadata, sitemap, and robots.
6. Manual seed data for 20 to 50 tools.
7. Import worker prototype.
8. Comparison and alternatives pages.
9. Local QA and build checks.

## First Milestone

Milestone 1 should stop when:

- Docker starts the backend locally,
- Strapi admin is accessible,
- PostgreSQL persists data,
- Tool and Category content types exist,
- one test tool can be created in the admin,
- the frontend can read and display that tool.

Current implementation status:

- Docker Compose file added.
- PostgreSQL service added.
- Strapi CMS service added.
- Tool, Category, Source, and Import Log content types added.
- Local startup instructions added in `docs/LOCAL_DEVELOPMENT.md`.
- Frontend has been created with homepage, category pages, tool detail pages, Best Tools pages, comparison pages, alternatives pages, trust/legal pages, robots.txt, sitemap.xml, RSS feed, manifest, and generated icons.
- Tool detail pages include decision scores and recommendation guidance.
