# Local Development

## Current Stack

- CMS/Admin: Strapi
- Frontend: Next.js
- Database: PostgreSQL
- Runtime: Docker Compose

## Requirements

- Docker Desktop installed and running.
- Docker Compose available through `docker compose`.

Node.js is not required on the host machine for the current backend milestone because the CMS runs inside Docker.

## First Run

From the repository root:

```powershell
docker compose up --build
```

Then open:

```text
Website: http://localhost:3000
CMS: http://localhost:1337/admin
```

On first visit, Strapi will ask you to create the admin user.

## Current Verification Status

Verified on 2026-05-14:

- `docker compose config --quiet` passes.
- `docker compose up --build -d` starts successfully.
- PostgreSQL is healthy.
- Strapi starts successfully.
- `http://localhost:1337/admin` returns HTTP 200.
- The initial content tables exist in PostgreSQL:
  - `tools`
  - `categories`
  - `sources`
  - `import_logs`
- Sample seed data has been verified:
  - 8 category documents
  - 20 tool documents
  - 1 source document
  - 1 import log document
- A GitHub Actions workflow also validates Docker Compose startup and public smoke-test endpoints on push and pull request.

The Compose file uses configurable image sources and currently defaults to `mirror.gcr.io` for the base `postgres` and `node` images. If your network can access Docker Hub normally, you can switch these values in `.env`:

```text
POSTGRES_IMAGE=postgres:16-alpine
NODE_IMAGE=node:22-alpine
```

## Stop Services

```powershell
docker compose down
```

## Frontend Build Check

```powershell
docker compose logs -f web
```

## Local Verification

After the stack is running, check CMS schemas, seed content completeness, worker source samples, the main website, SEO endpoints, canonical URLs, icons, and CMS admin route:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/verify-local.ps1
```

The verification script waits for the frontend and CMS to become ready, which helps after a fresh `docker compose up --build -d` when the Next.js container is still finishing its production build.

## Content Review Pipeline

Run the local collection, comparison, and review-queue dry-run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-content-review.ps1
```

Write actionable review items into Strapi after checking the dry-run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-content-review.ps1 -WriteQueue
```

If a dry-run already produced the report you want, sync that existing report without collecting again:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/run-content-review.ps1 -UseExistingReport -WriteQueue
```

Generated collector files and reports stay ignored under:

```text
apps/worker/data/generated/
```

## Reset Local Database

Before resetting or making large CMS changes, create a local PostgreSQL backup:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/backup-postgres.ps1
```

Backups are written to `backups/`, which is intentionally ignored by Git.

This deletes local PostgreSQL data and uploaded media volumes:

```powershell
docker compose down -v
```

Use this only when you are comfortable losing local CMS content.

## Services

### PostgreSQL

- Container: `my-website-postgres`
- Port: `5432`
- Database: `my_website`
- User: `my_website`

### Strapi CMS

- Container: `my-website-cms`
- Port: `1337`
- Admin: `http://localhost:1337/admin`

### Next.js Frontend

- Container: `my-website-web`
- Port: `3000`
- Website: `http://localhost:3000`

## Content Types Included

- `Tool`
- `Category`
- `Source`
- `Import Log`
- `Review Queue`

## Notes

- New imported tools should start as draft or review content.
- Do not auto-publish newly imported records.
- Keep source URLs and import logs for every automated update path.
