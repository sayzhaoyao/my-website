# Source Policy

## Purpose

The site can use automation to discover changes, but important public content should stay editorially reviewed.

Automation may collect:

- official homepage metadata,
- official pricing page metadata,
- official changelog or product-update metadata,
- canonical URLs,
- last-modified headers,
- public page titles, descriptions, and H1 text.

Automation should not directly publish:

- exact pricing claims,
- plan-limit claims,
- feature availability claims,
- affiliate recommendations,
- tool scores,
- final verdicts,
- legal, compliance, or deliverability claims.

## Preferred Source Order

1. Official product website.
2. Official pricing page or official help-center billing article.
3. Official changelog, release notes, or product-update page.
4. Official API docs for developer-facing products.
5. Manual editorial notes.

Avoid scraping forums, social posts, review sites, or third-party articles into CMS fields. They can inform research, but should not become automatic source-of-truth content.

## Worker Safety

The URL collector refuses to fetch:

- non-HTTP/HTTPS URLs,
- localhost,
- loopback addresses,
- common private network ranges,
- `.local` hostnames.

Generated files stay ignored under:

```text
apps/worker/data/generated/
```

## Review Rules

Use the Review Queue before editing public pages.

High priority:

- canonical URL changed,
- final URL changed,
- tool appeared or disappeared.

Medium priority:

- pricing page changed,
- changelog or product-update page changed.

Low priority:

- page title, description, or H1 changed.

When a queue item is resolved, update the relevant public content only if the change affects user decisions.
