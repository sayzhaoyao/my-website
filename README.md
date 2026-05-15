# My Website

This repository contains a local Docker-based website stack for a niche directory and comparison site.

## Current Structure

```text
my-website/
+-- AGENTS.md
+-- README.md
+-- docs/
|   +-- MVP_SPEC.md
|   +-- LOCAL_DEVELOPMENT.md
|   +-- CMS_ADMIN.md
|   +-- FRONTEND.md
|   +-- PROJECT_PLAN.md
|   +-- SEED_DATA.md
|   +-- SITE_DIRECTION.md
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

The local app includes Docker Compose, Strapi, PostgreSQL, and a Next.js frontend.

To start the local stack after Docker Desktop is running:

```powershell
docker compose up --build
```

Then open:

```text
Website: http://localhost:3000
CMS:     http://localhost:1337/admin
```

## Services

```text
Frontend: Next.js on port 3000
CMS:      Strapi on port 1337
Database: PostgreSQL on port 5432
```

## Content Review Pipeline

Run a local content collection and review check:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-content-review.ps1
```

To also write actionable review items into the CMS Review Queue:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-content-review.ps1 -WriteQueue
```

## Next Step

Read these files in order:

1. `docs/SITE_DIRECTION.md`
2. `docs/MVP_SPEC.md`
3. `docs/LOCAL_DEVELOPMENT.md`
4. `docs/CMS_ADMIN.md`
5. `docs/FRONTEND.md`
6. `docs/SEED_DATA.md`
7. `docs/PROJECT_PLAN.md`
8. `docs/WEBSITE_STRATEGY.md`
9. `docs/IMPORT_WORKER.md`

The current recommendation is to build a niche directory and comparison website for AI and software tools used by cross-border e-commerce sellers, using Next.js, Strapi, PostgreSQL, and Docker Compose.

The next implementation milestone is to connect safe external sources to the import worker, review imported drafts in Strapi, and improve public pages with richer editorial content.
