# Commerce Toolbase

This repository contains a local Docker-based stack for an SEO-friendly e-commerce software directory, review, comparison, and alternatives website.

## Current Structure

```text
my-website/
+-- AGENTS.md
+-- README.md
+-- docs/
|   +-- MVP_SPEC.md
|   +-- LOCAL_DEVELOPMENT.md
|   +-- CMS_ADMIN.md
|   +-- CONTENT_PLAN.md
|   +-- DEPLOYMENT.md
|   +-- FRONTEND.md
|   +-- IMPORT_WORKER.md
|   +-- LAUNCH_CHECKLIST.md
|   +-- PROJECT_PLAN.md
|   +-- SEED_DATA.md
|   +-- SITE_DIRECTION.md
|   +-- SOURCE_POLICY.md
|   +-- WEBSITE_STRATEGY.md
|-- apps/
|   +-- cms/
|   +-- web/
|   +-- worker/
+-- .agents/
    +-- skills/
        +-- design-ui-designer/
        |   +-- SKILL.md
        +-- engineering-code-reviewer/
        |   +-- SKILL.md
        +-- engineering-frontend-developer/
        |   +-- SKILL.md
        +-- marketing-seo-specialist/
        |   +-- SKILL.md
        +-- product-manager/
            +-- SKILL.md
```

## Local App

The local app includes Docker Compose, Strapi, PostgreSQL, a Next.js frontend, and worker scripts for safe content collection/review workflows.

To start the local stack after Docker Desktop is running:

```powershell
docker compose up --build
```

Then open:

```text
Website: http://localhost:3000
CMS:     http://localhost:1337/admin
```

Important public routes include:

```text
/categories
/tools/[slug]
/best
/compare
/alternatives
/sitemap.xml
/robots.txt
/feed.xml
/manifest.webmanifest
```

## Services

```text
Frontend: Next.js on port 3000
CMS:      Strapi on port 1337
Database: PostgreSQL on port 5432
Worker:   Node.js scripts through the Docker Compose tools profile
```

## Checks

GitHub Actions runs a Docker Compose build and smoke test on pushes and pull requests.

## Content Review Pipeline

Run a local website/CMS health check after Docker is running:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-local.ps1
```

Run a local content collection and review check:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-content-review.ps1
```

To also write actionable review items into the CMS Review Queue:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-content-review.ps1 -WriteQueue
```

If you already checked the dry-run report and only want to sync that existing report:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-content-review.ps1 -UseExistingReport -WriteQueue
```

## Next Step

Read these files in order:

1. `docs/SITE_DIRECTION.md`
2. `docs/MVP_SPEC.md`
3. `docs/CONTENT_PLAN.md`
4. `docs/CONTENT_QA.md`
5. `docs/LOCAL_DEVELOPMENT.md`
6. `docs/CMS_ADMIN.md`
7. `docs/FRONTEND.md`
8. `docs/IMPORT_WORKER.md`
9. `docs/SOURCE_POLICY.md`
10. `docs/LAUNCH_CHECKLIST.md`
11. `docs/DEPLOYMENT.md`
12. `docs/PROJECT_PLAN.md`
13. `docs/WEBSITE_STRATEGY.md`

The current recommendation is to build a niche directory and comparison website for AI and software tools used by cross-border e-commerce sellers, using Next.js, Strapi, PostgreSQL, and Docker Compose.

The next implementation milestone is to polish the first content cluster, configure production hosting, add analytics, and prepare affiliate links only after partner approval and manual editorial review.
