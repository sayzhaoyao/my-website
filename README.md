# My Website

This repository is currently in the planning/setup stage. It contains project instructions, agent skills, and a website planning document, but it does not yet contain a runnable website.

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

## Next Step

Planning has started. Read these files in order:

1. `docs/SITE_DIRECTION.md`
2. `docs/MVP_SPEC.md`
3. `docs/LOCAL_DEVELOPMENT.md`
4. `docs/CMS_ADMIN.md`
5. `docs/FRONTEND.md`
6. `docs/SEED_DATA.md`
7. `docs/PROJECT_PLAN.md`
8. `docs/WEBSITE_STRATEGY.md`

The current recommendation is to build a niche directory and comparison website for AI and software tools used by cross-border e-commerce sellers, using Next.js, Strapi, PostgreSQL, and Docker Compose.

The next implementation milestone is to enrich the first content records and add comparison/alternatives pages.
