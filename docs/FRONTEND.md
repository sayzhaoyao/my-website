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
- `/categories/[slug]`
- `/tools/[slug]`
- `/best`
- `/best/[slug]`
- `/compare`
- `/compare/[slug]`
- `/alternatives`
- `/alternatives/[slug]`
- `/robots.txt`
- `/sitemap.xml`

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

- Tool pages show overview, pricing, pros and cons, categories, recommended users, users who should skip the tool, and a six-part decision score.
- Tool review pages include a quick verdict, conversion CTA, affiliate disclosure area, review notes, FAQ, sources, and SoftwareApplication structured data.
- Best Tools pages rank related tools and surface each tool's average score.
- Comparison pages explain the recommendation between two tools.
- Alternatives pages connect one primary tool to replacement options.

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
- robots.txt,
- sitemap.xml,
- semantic page structure,
- server-rendered content.
