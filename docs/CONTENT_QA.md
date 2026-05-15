# Content QA Checklist

Use this checklist before treating a page as production-ready. The goal is to make each money page useful enough for readers and defensible enough for search engines.

## Page-Level Requirements

Every indexable page should have:

- one clear search intent,
- one H1 that matches the page promise,
- a unique title and meta description,
- a useful intro that answers who the page is for,
- internal links to related tool, category, comparison, or alternatives pages,
- source-aware language for claims that may change,
- a clear next step for the reader,
- no unverified pricing promises,
- no affiliate link without disclosure.

## Tool Review Page QA

Before publishing or promoting a tool review, confirm:

- the official website URL works,
- pricing language is cautious and current enough,
- `bestFor`, `recommendedFor`, and `notRecommendedFor` are specific,
- pros and cons describe real tradeoffs, not generic praise,
- decision summary gives a practical recommendation,
- all six score fields are reviewed against `docs/FRONTEND.md` and `/methodology`,
- source URLs include at least the official product page and any relevant pricing or help page,
- affiliate disclosure is present if `affiliateUrl` is used.

## Best List QA

Before publishing a buying guide, confirm:

- the list targets one buyer use case,
- the ranking order is explainable,
- selection criteria are visible and specific,
- each listed tool has enough review content to support inclusion,
- the verdict helps a reader choose based on team size, workflow, or maturity,
- the page links to relevant tool reviews and comparisons.

## Comparison Page QA

Before publishing a comparison page, confirm:

- the recommendation names which tool fits which use case,
- feature notes compare decision factors rather than restating product copy,
- pricing notes avoid stale plan claims,
- both linked tool pages are reviewed,
- the final verdict is useful even if the reader chooses neither product.

## Alternatives Page QA

Before publishing an alternatives page, confirm:

- the page explains why buyers look for alternatives,
- the replacement options are meaningfully different from the primary tool,
- selection criteria match the switching reason,
- the verdict names the first alternative to review and why,
- internal links help the reader compare options without returning to search.

## First Cluster Review Order

Review the email and SMS marketing cluster in this order:

1. `/tools/klaviyo`
2. `/tools/omnisend`
3. `/tools/postscript`
4. `/compare/klaviyo-vs-omnisend`
5. `/alternatives/klaviyo-alternatives`
6. `/best/best-email-marketing-tools-for-ecommerce`
7. `/categories/email-marketing-tools`

This order starts with the source tool pages, then reviews the decision pages that depend on them.

## Ready-To-Monetize Conditions

A page is ready for affiliate or partner CTA testing only when:

- the recommendation is editorially justified,
- the page includes disclosure,
- the official source links have been checked,
- the CTA points to a relevant product,
- the page would still be useful without the affiliate link.
