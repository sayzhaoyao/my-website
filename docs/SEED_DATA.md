# Seed Data

## Purpose

The local CMS includes optional sample data for development:

- 8 e-commerce software categories.
- 20 sample tool records.
- 3 sample Best Tools pages.
- 3 sample comparison pages.
- 2 sample alternatives pages.
- 1 manual source record.
- 1 import log record.

The sample tools also include editorial decision fields:

- six 1-to-5 score fields,
- a short decision summary,
- recommended user types,
- not-recommended user types.

This makes it easier to verify the admin backend and later build the frontend against realistic content.

## Enable Or Disable

Sample seeding is controlled by `.env`:

```text
SEED_SAMPLE_DATA=true
```

Set it to `false` if you want to start with an empty CMS.

The seed is idempotent. It checks existing slugs and URLs before creating records, so restarting the CMS should not create duplicates.

## Important

Seeded tool information is for local development only. Before publishing a production site:

- verify each official URL,
- confirm pricing and feature claims,
- review all score values against a written scoring policy,
- add affiliate disclosures,
- replace generic editorial notes with reviewed content,
- keep source records and update logs.

## Verification

Verified on 2026-05-14:

- Strapi starts with `SEED_SAMPLE_DATA=true`.
- The seed runs without crashing the CMS.
- `http://localhost:1337/admin` returns HTTP 200 after seeding.
- Logical document counts after seeding:
  - 8 categories
  - 20 tools
  - 3 best lists
  - 3 comparisons
  - 2 alternatives
  - 1 source
  - 1 import log
- Re-running the seed does not create duplicate logical documents.

Strapi 5 stores separate draft and published rows for draft-enabled content types, so database row counts are expected to be higher than logical document counts.
