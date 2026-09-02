# Bella's Baskett Marketing Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a premium multi-page Bella's Baskett marketing site that guides qualified visitors into a structured WhatsApp enquiry.

**Architecture:** Use the Sites/Vinext TypeScript scaffold with App Router pages, typed local content modules, reusable brand/content components, and narrowly scoped client features for navigation, portfolio filtering, and the session-only enquiry flow. The public surface remains statically generated and ready for a later CMS without introducing persistence, authentication, payments, or unverified business claims.

**Tech Stack:** Vinext, React, TypeScript, Tailwind CSS, shadcn primitives, Lucide icons, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-02-bellas-baskett-marketing-site-design.md`

## Global Constraints

- Use British English and the approved palette, editorial serif/sans hierarchy, restrained motion, and WCAG 2.2 AA-oriented interaction patterns.
- Submit enquiries only through `https://wa.me/60179223552`; retain drafts in session storage only and never send personal/event fields to analytics.
- Do not publish invented testimonials, clients, statistics, prices, awards, media coverage, project stories, or availability claims.
- Do not install a database, CMS, authentication, payment, storage, or server-side personal-data dependency.
- Every visible control and navigation destination must work at 360, 390, 768, 1024, and 1440 pixel layouts.

---

### Task 1: Scaffold, content model, and brand foundation

**Files:**

- Create: Sites scaffold in the workspace root
- Create: `content/site.ts`, `content/services.ts`, `content/faq.ts`, `content/journal.ts`, `content/portfolio.ts`
- Modify: `app/globals.css`, `app/layout.tsx`
- Test: `tests/content.test.ts`

**Interfaces:**

- Produces: typed `siteConfig`, `services`, `faqs`, `journalEntries`, and `portfolioItems` exports consumed by all routes.

- [ ] **Step 1: Scaffold the pinned Sites project**

Run `npm create --yes @openai/sites@0.3.0 . -- --yes --add-ons shadcn --install` and preserve its package manager, scripts, lockfile, and `.openai/hosting.json`.

- [ ] **Step 2: Write the failing content integrity test**

```ts
import { describe, expect, it } from 'vitest';
import { services } from '@/content/services';

describe('services', () => {
  it('has unique route slugs and no numeric price claims', () => {
    expect(new Set(services.map((service) => service.slug)).size).toBe(
      services.length,
    );
    expect(
      services.map((service) => service.description).join(' '),
    ).not.toMatch(/RM\s?\d/i);
  });
});
```

- [ ] **Step 3: Add typed approved content**

Create focused content modules with explicit `Service`, `Faq`, `JournalEntry`, and `PortfolioItem` types. Use content-pending states for portfolio and journal detail routes where approved facts or media are absent.

- [ ] **Step 4: Establish site-wide metadata and visual tokens**

Set the title template, description, canonical base, robots, font variables, approved colour tokens, focus styles, spacing rhythm, surface treatment, reduced-motion rules, and body defaults.

- [ ] **Step 5: Run tests and commit**

Run `npm test -- --run tests/content.test.ts`, then commit with `feat: establish Bella's Baskett foundation`.

### Task 2: Shared shell and first meaningful homepage

**Files:**

- Create: `components/brand/site-header.tsx`, `components/brand/site-footer.tsx`, `components/brand/section-heading.tsx`, `components/brand/whatsapp-cta.tsx`, `components/brand/floral-mark.tsx`
- Create: `components/content/home-sections.tsx`
- Modify: `app/page.tsx`
- Test: `tests/navigation.test.tsx`

**Interfaces:**

- Consumes: `siteConfig`, `services`, and `faqs`.
- Produces: reusable header, footer, heading, and CTA contracts used by route pages.

- [ ] **Step 1: Write failing navigation tests**

```tsx
render(<SiteHeader />);
expect(screen.getByRole('link', { name: /plan your event/i })).toHaveAttribute(
  'href',
  '/plan-your-event',
);
expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
  'aria-expanded',
  'false',
);
```

- [ ] **Step 2: Build the responsive shared shell**

Implement transparent-to-solid navigation, full-screen mobile menu, always-visible conversion path, semantic footer navigation, focus management, Escape close, and 44-pixel minimum targets.

- [ ] **Step 3: Build the homepage editorial story**

Compose the immersive hero with “Celebrations, beautifully imagined.”, paired CTAs, studio introduction, four distinct service worlds, honest portfolio placeholder, three-step process, corporate capability, service-area note, FAQ preview, final conversion panel, and complete footer.

- [ ] **Step 4: Hand off the first meaningful preview**

Start `npm run dev`, request the exact local URL once, verify a non-error response, then open that URL in the Codex browser tab.

- [ ] **Step 5: Run focused tests and commit**

Run `npm test -- --run tests/navigation.test.tsx`, then commit with `feat: build editorial homepage and navigation`.

### Task 3: Public marketing routes

**Files:**

- Create: `components/content/service-world.tsx`, `components/content/editorial-page.tsx`, `components/content/faq-list.tsx`, `components/content/content-pending.tsx`
- Create: `app/about/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/packages/page.tsx`, `app/corporate-events/page.tsx`, `app/gifts-surprises/page.tsx`, `app/process/page.tsx`, `app/faq/page.tsx`, `app/contact/page.tsx`, `app/journal/page.tsx`, `app/journal/[slug]/page.tsx`
- Test: `tests/routes.test.tsx`

**Interfaces:**

- Consumes: content module exports and shared brand components.
- Produces: static route params and route-specific metadata for every public destination.

- [ ] **Step 1: Write failing route and link integrity tests**

```ts
it('maps every service to an internal detail route', () => {
  for (const service of services)
    expect(service.href).toBe(`/services/${service.slug}`);
});
```

- [ ] **Step 2: Implement editorial overview routes**

Give each destination a distinct composition while preserving shared typography, spacing, conversion cues, truthful service-area caveats, and enquiry links.

- [ ] **Step 3: Implement reusable detail routes**

Generate service pages from verified local descriptions. Render journal content-pending detail pages only when explicitly linked from an approved entry.

- [ ] **Step 4: Run route tests and commit**

Run `npm test -- --run tests/routes.test.tsx`, then commit with `feat: add public marketing routes`.

### Task 4: Portfolio filtering and project presentation

**Files:**

- Create: `features/portfolio/portfolio-filter.tsx`, `features/portfolio/portfolio-grid.tsx`, `features/portfolio/filter-items.ts`
- Create: `app/portfolio/page.tsx`, `app/portfolio/[slug]/page.tsx`
- Test: `features/portfolio/filter-items.test.ts`, `tests/portfolio.test.tsx`

**Interfaces:**

- Produces: `filterPortfolio(items: PortfolioItem[], category: PortfolioCategory | "all"): PortfolioItem[]`.

- [ ] **Step 1: Write the failing filter unit test**

```ts
expect(
  filterPortfolio(items, 'corporate').every(
    (item) => item.category === 'corporate',
  ),
).toBe(true);
expect(filterPortfolio(items, 'all')).toEqual(items);
```

- [ ] **Step 2: Implement the pure filter and accessible controls**

Use buttons with selected state, a live result-count announcement, keyboard support, and a touch-friendly editorial sequence without claiming placeholder imagery as Bella's Baskett work.

- [ ] **Step 3: Implement honest empty and pending states**

Explain that selected stories are being prepared, offer relevant services and the enquiry path, and omit unsupported project detail routes.

- [ ] **Step 4: Run portfolio tests and commit**

Run `npm test -- --run features/portfolio/filter-items.test.ts tests/portfolio.test.tsx`, then commit with `feat: add editorial portfolio filtering`.

### Task 5: Session-only WhatsApp configurator

**Files:**

- Create: `features/configurator/types.ts`, `features/configurator/schema.ts`, `features/configurator/build-whatsapp-url.ts`, `features/configurator/use-session-draft.ts`, `features/configurator/event-configurator.tsx`
- Create: `app/plan-your-event/page.tsx`
- Test: `features/configurator/schema.test.ts`, `features/configurator/build-whatsapp-url.test.ts`, `tests/configurator.test.tsx`

**Interfaces:**

- Produces: `validateStep(step: number, draft: EventDraft): Record<string, string>`, `buildWhatsAppUrl(draft: EventDraft): string`, and a session-only `EventDraft` state boundary.

- [ ] **Step 1: Write failing validation and URL tests**

```ts
expect(validateStep(0, emptyDraft)).toHaveProperty('eventType');
expect(buildWhatsAppUrl(completeDraft)).toMatch(
  /^https:\/\/wa\.me\/60179223552\?text=/,
);
expect(decodeURIComponent(buildWhatsAppUrl(completeDraft))).toContain(
  'Event type: Wedding',
);
```

- [ ] **Step 2: Implement validation and encoded message generation**

Validate required fields per step, keep optional links/notes explicit, normalise line breaks, and include the privacy explanation without generating an enquiry number.

- [ ] **Step 3: Implement the guided form**

Build accessible progress, event details, creative direction, services/budget, inspiration/contact, and review steps. Persist only to `sessionStorage`, include reset, prevent advancement on invalid data, and open WhatsApp only from the final confirmation.

- [ ] **Step 4: Run configurator tests and commit**

Run `npm test -- --run features/configurator/schema.test.ts features/configurator/build-whatsapp-url.test.ts tests/configurator.test.tsx`, then commit with `feat: add WhatsApp event planner`.

### Task 6: SEO, accessibility, end-to-end validation, and publishing

**Files:**

- Create: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, `components/brand/json-ld.tsx`
- Create: `tests/e2e/service-discovery.spec.ts`, `tests/e2e/portfolio.spec.ts`, `tests/e2e/configurator.spec.ts`
- Modify: route metadata files and `package.json`

**Interfaces:**

- Consumes: all public route paths and content exports.
- Produces: valid sitemap, robots rules, Organisation/WebSite structured data, and executable acceptance coverage.

- [ ] **Step 1: Add SEO and error surfaces**

Generate route-aware metadata, canonicals, social title/description, sitemap, robots, semantic heading order, JSON-LD, and a branded 404 with useful navigation.

- [ ] **Step 2: Add acceptance tests**

```ts
test('visitor can discover a service and begin planning', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /explore services/i }).click();
  await expect(page).toHaveURL(/\/services/);
  await page
    .getByRole('link', { name: /plan your event/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/plan-your-event/);
});
```

- [ ] **Step 3: Validate quality gates**

Run unit/component tests, production build, and end-to-end checks. Inspect responsive behaviour at 360, 390, 768, 1024, and 1440 pixels; keyboard focus; menu/dialog/form labelling; reduced motion; image loading; heading order; sitemap; robots; and metadata.

- [ ] **Step 4: Publish and commit**

Publish through Sites, verify the deployed root and representative routes, then commit with `feat: complete Bella's Baskett marketing website`.
