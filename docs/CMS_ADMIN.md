# CMS Admin

## Admin URL

```text
http://localhost:1337/admin
```

## Language

The Strapi admin panel is configured with these available interface languages:

- Simplified Chinese: `zh-Hans`
- English: `en`

On the first login, Strapi may still show the login screen in the browser/default language. After logging in, open the user profile/preferences menu and choose Simplified Chinese if it is not selected automatically.

The local administrator account has also been updated in PostgreSQL with:

```text
prefered_language = zh-Hans
```

If the browser still shows the old interface, log out and log back in, then hard refresh the page.

## Custom Content Types

Main content types:

- `Tool`
- `Category`
- `Source`
- `Import Log`
- `Review Queue`

API field names remain in English to keep frontend development and integrations maintainable.

## Review Queue Workflow

The Review Queue is shown as `审核队列` in the CMS. It is for internal editorial checks created by the collection worker.

Open items usually come from:

- changed canonical or final URLs,
- changed pricing pages,
- changed changelog or product-update pages,
- changed page titles, descriptions, or H1 text,
- newly collected tools.

Priority meaning:

- `high`: URL identity changed or a new/removed tool appears. Check this first.
- `medium`: pricing or changelog page changed. Check pricing, plan limits, feature updates, and dated claims.
- `low`: metadata changed. Usually safe to review after high and medium items.

Suggested handling:

1. Open the related tool page and official source URLs.
2. Read `changeSummary` first. It lists the changed scope, field, previous value, and current value.
3. Confirm whether public content needs an update.
4. Update the Tool, Best List, Comparison, or Alternatives page content if needed.
5. Change `itemStatus` to `resolved` when handled.
6. Use `ignored` only when the change is known noise.

The Review Queue is intentionally not public. It is for admin users and worker API tokens only.

## Review Queue CLI

List open review items from the repository root:

```powershell
docker compose --profile tools run --rm worker npm run review:list
```

Useful filters:

```powershell
docker compose --profile tools run --rm worker npm run review:list -- --priority high
docker compose --profile tools run --rm worker npm run review:list -- --status in_review
```

Safely preview a status change:

```powershell
docker compose --profile tools run --rm worker npm run review:update -- --queue-key collection-change-shopify --status in_review
```

Write the status change after checking the dry-run:

```powershell
docker compose --profile tools run --rm worker npm run review:update -- --queue-key collection-change-shopify --status resolved --note "Checked official pricing and no public copy update was needed." --write
```
