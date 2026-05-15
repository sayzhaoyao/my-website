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

## Collect URL Metadata

The first collector reads a local list of official URLs, fetches public page metadata, and writes a tool import JSON file.

Run:

```powershell
docker compose --profile tools run --rm worker npm run collect:url-metadata -- --input data/url-sources.sample.json --output data/generated/url-metadata.tools.json
```

Then validate the generated import file:

```powershell
docker compose --profile tools run --rm worker npm run import:tools -- --file data/generated/url-metadata.tools.json --dry-run
```

If it looks good, write it to Strapi:

```powershell
docker compose --profile tools run --rm worker npm run import:tools -- --file data/generated/url-metadata.tools.json --write --source-name "URL metadata collector" --source-url "file://data/url-sources.sample.json" --source-type official_site
```

Generated collector output is ignored by Git:

```text
apps/worker/data/generated/
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

If manual token creation is unreliable locally, generate a worker token with:

```powershell
docker compose exec cms node scripts/create-worker-token.js worker-local-full-access
```

The script writes the plaintext token to this ignored local file:

```text
apps/cms/.tmp/worker-token.txt
```

Copy that value into `.env` as `STRAPI_API_TOKEN`, then delete the temporary token file.

Then run:

```powershell
docker compose --profile tools run --rm worker npm run import:tools -- --file data/tools.sample.json --write
```

The write token should allow:

- `Tool`: find, findOne, create, update
- `Category`: find, findOne
- `Source`: find, findOne, create, update
- `Import Log`: create, update

Optional source metadata:

```powershell
docker compose --profile tools run --rm worker npm run import:tools -- --file data/tools.sample.json --write --source-name "Manual test import" --source-url "file://tools.sample.json"
```

## Safety Rules

- Imports should default to `editorialStatus: review`.
- Do not auto-publish new records unless the source and content are trusted.
- Keep source URLs on every imported record.
- Use dry-run before every new source format.
- Review scores manually before publishing.
- Every write run creates an import log.

## Duplicate Detection

The worker currently checks for existing tools in this order:

1. matching `slug`,
2. matching `websiteUrl`.

If an existing record is found, the worker updates it instead of creating a duplicate.

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

URL collector input example:

```text
apps/worker/data/url-sources.sample.json
```

## Next Worker Milestones

1. Add richer collectors for pricing pages, changelogs, RSS feeds, and official APIs.
2. Add source confidence and skipped-field notes to import logs.
3. Add allowlist and robots-policy notes per source.
4. Add scheduled execution only after manual imports are reliable.
