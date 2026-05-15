# Import Worker

## Purpose

The worker is the first safe automation layer for content updates.

It currently supports importing tool records from a local JSON file into Strapi. This gives the project a stable path for future network collection without mixing scraper code directly into the CMS or frontend.

## Location

```text
apps/worker
```

## Default Behavior

The worker defaults to dry-run mode. It reads and validates input data, but does not write to Strapi.

Run from the repository root:

```powershell
docker compose --profile tools run --rm worker
```

Equivalent explicit command:

```powershell
docker compose --profile tools run --rm worker npm run import:tools -- --file data/tools.sample.json --dry-run
```

## Write To Strapi

Writing requires a Strapi API token.

Create one in:

```text
Strapi Admin -> Settings -> API Tokens
```

For local testing, give the token enough permission to read and write tools and read categories. Add it to `.env`:

```text
STRAPI_API_TOKEN=your_token_here
```

Then run:

```powershell
docker compose --profile tools run --rm worker npm run import:tools -- --file data/tools.sample.json --write
```

## Safety Rules

- Imports should default to `editorialStatus: review`.
- Do not auto-publish new records unless the source and content are trusted.
- Keep source URLs on every imported record.
- Use dry-run before every new source format.
- Review scores manually before publishing.

## Input Format

The input file is an array of tool records.

Important fields:

- `name`
- `slug`
- `shortDescription`
- `websiteUrl`
- `pricingModel`
- `keyFeatures`
- `pros`
- `cons`
- `bestFor`
- `decisionSummary`
- six score fields from 1 to 5
- `recommendedFor`
- `notRecommendedFor`
- `sourceUrls`
- `categorySlugs`
- `seoTitle`
- `seoDescription`

See:

```text
apps/worker/data/tools.sample.json
```

## Next Worker Milestones

1. Add source-specific collectors that output the same JSON format.
2. Add import logs in Strapi for every run.
3. Add duplicate detection by official URL and slug.
4. Add scheduled execution only after manual imports are reliable.
