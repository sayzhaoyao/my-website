# Website Project Plan

## Status
This repository is currently prepared for planning and agent guidance only. No website framework or runnable app has been created yet.

## Planning Documents

Read these in order:

1. `docs/SITE_DIRECTION.md`: chosen site direction, audience, monetization, and content strategy.
2. `docs/MVP_SPEC.md`: first version scope, recommended stack, content model, SEO rules, and build order.
3. `docs/WEBSITE_STRATEGY.md`: broader strategy options and long-term considerations.

## Recommended Next Decisions
Before creating the website, decide:

- Site type: personal site, company landing page, portfolio, blog, product site, documentation site, dashboard, or e-commerce.
- Primary audience: who will visit and what they need to do first.
- Content scope: pages, sections, copy, images, forms, and calls to action.
- Stack: static HTML/CSS/JS, Vite + React, Next.js, Vue, or another framework.
- Styling approach: plain CSS, CSS modules, Tailwind CSS, or a component library.
- Deployment target: Vercel, Netlify, GitHub Pages, Cloudflare Pages, or a custom server.

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

### Phase 4: Implementation
- Build reusable layout and UI components.
- Implement pages with semantic HTML.
- Add accessibility, responsive behavior, and metadata.
- Optimize images and loading behavior.

### Phase 5: Verification And Launch Prep
- Run build/lint/tests where available.
- Preview locally across desktop and mobile sizes.
- Check basic SEO metadata and accessibility.
- Prepare deployment instructions.

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
