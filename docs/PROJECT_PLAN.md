# Website Project Plan

## Status
This repository now has a runnable local MVP with Docker Compose, Strapi, PostgreSQL, a Next.js frontend, and worker scripts. The project is still pre-launch: content, production hosting, analytics, and monetization setup need manual review before going public.

## Planning Documents

Read these in order:

1. `docs/SITE_DIRECTION.md`: chosen site direction, audience, monetization, and content strategy.
2. `docs/MVP_SPEC.md`: first version scope, recommended stack, content model, SEO rules, and build order.
3. `docs/WEBSITE_STRATEGY.md`: broader strategy options and long-term considerations.
4. `docs/LAUNCH_CHECKLIST.md`: production launch, SEO, trust, monetization, and operations checklist.
5. `docs/DEPLOYMENT.md`: production hosting options, environment variables, and deployment checks.

## Recommended Next Decisions
Before public launch, decide:

- Production domain and hosting target.
- Analytics provider.
- First affiliate programs to apply for.
- Final contact email and legal policy details.
- First content cluster to manually review and publish.

## Suggested Phases

### Phase 1: Product And Content Definition
- Define the website goal.
- List required pages and key user flows.
- Draft core copy and navigation.
- Identify SEO keywords and page titles if organic search matters.

### Phase 2: Design Direction
- Define visual tone, colors, typography, spacing, and component style.
- Plan responsive layouts for mobile, tablet, and desktop.
- Decide image and icon needs.

### Phase 3: Technical Setup
- Choose the framework and package manager.
- Create the app structure.
- Add scripts for development, build, lint, and preview.
- Add basic README startup instructions.
Status: mostly complete for local MVP.

### Phase 4: Implementation
- Build reusable layout and UI components.
- Implement pages with semantic HTML.
- Add accessibility, responsive behavior, and metadata.
- Optimize images and loading behavior.
Status: first public page set is implemented.

### Phase 5: Verification And Launch Prep
- Run build/lint/tests where available.
- Preview locally across desktop and mobile sizes.
- Check basic SEO metadata and accessibility.
- Prepare deployment instructions.
Status: in progress. See `docs/LAUNCH_CHECKLIST.md`.

## Initial Recommendation
For most small-to-medium websites, start with Vite + React if the site needs interactivity, or plain HTML/CSS/JS if the site is mostly static. Use the simplest stack that satisfies the content and maintenance needs.

## Current Recommendation For This Project

Based on the monetization, SEO, automation, and maintainability goals, the current recommendation is:

- Site type: niche directory and comparison site.
- Niche: AI and software tools for cross-border e-commerce sellers and independent online merchants.
- Frontend: Next.js.
- Backend/admin: Strapi.
- Database: PostgreSQL.
- Local environment: Docker Compose.
- Content workflow: automated import into draft/review status, then manual approval before publishing.
