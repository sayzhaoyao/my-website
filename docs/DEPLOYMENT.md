# Deployment Notes

Commerce Toolbase has four runtime parts:

- Next.js frontend in `apps/web`
- Strapi CMS in `apps/cms`
- PostgreSQL database
- Worker scripts in `apps/worker`

For launch, keep the frontend public and keep the CMS/admin protected.

## Recommended First Production Shape

Use a simple split deployment:

- Frontend: Vercel, Netlify, Cloudflare Pages, or another Next.js-capable host.
- CMS: Render, Railway, Fly.io, a VPS, or another Node.js host that can run Strapi.
- Database: managed PostgreSQL from the CMS host or a dedicated provider.
- Worker: run manually or on a scheduled job after the CMS API token is configured.

This keeps public page delivery fast while avoiding database management on day one.

## Required Production Environment

Set these values in the production environment. Do not commit real secrets.

### Frontend

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.example
STRAPI_INTERNAL_URL=https://cms.your-domain.example
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.example
```

If the frontend host cannot reach the CMS through an internal network, `STRAPI_INTERNAL_URL` should be the HTTPS CMS URL.

`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is optional. Leave it empty until Plausible or a compatible analytics setup is ready.

### Strapi

```text
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=true
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
```

Generate new production secrets. Do not reuse local test values.

### Worker

```text
STRAPI_URL=https://cms.your-domain.example
STRAPI_API_TOKEN=
```

Use a token with only the permissions needed for imports and review queue updates.

## Production Checks

After deployment:

1. Open the homepage on the final domain.
2. Confirm `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/manifest.webmanifest`, `/icon`, and `/apple-icon` return HTTP 200.
3. Open one category, one tool page, one best list, one comparison, and one alternatives page.
4. Confirm canonical URLs use the production domain.
5. Confirm CMS admin is not indexed and uses strong credentials.
6. Run one worker dry-run before allowing any write import.
7. Submit the production sitemap in Google Search Console.

## Single-Server Docker Option

For a VPS-based launch, Docker Compose can run all services on one server, but production hardening is required:

- Put a reverse proxy such as Caddy, Nginx, or Traefik in front of `web` and `cms`.
- Serve the website on the root domain and CMS on a protected subdomain.
- Enable HTTPS.
- Replace all default database passwords and Strapi secrets.
- Back up PostgreSQL before running imports.
- Do not expose PostgreSQL publicly.
- Keep `.env` outside Git and limit server access.

The current `docker-compose.yml` is optimized for local testing. Create a separate production compose file before using this route.

## Launch Preference

For the first public version, prefer:

- managed frontend hosting for Next.js,
- managed PostgreSQL,
- hosted Strapi or a small VPS for the CMS,
- manual worker runs until the content workflow is trusted.

Add scheduled automation only after the review queue process has been used successfully several times.
