# Homepage Viewport Panels Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn every Bella's Baskett homepage section into a complete, responsive one-viewport panel without clipping its important content or calls to action.

**Architecture:** Keep the existing Next.js homepage and introduce shared viewport-panel CSS primitives. Reshape only dense homepage compositions, using a touch-scrollable service row on narrow screens and compact grid layouts elsewhere. Validate the public behavior with Playwright at representative phone, tablet, laptop, desktop, and 4K viewport sizes.

**Tech Stack:** React 19, Next-compatible Vinext, Tailwind CSS 4 utilities, custom CSS, Vitest, Playwright

**Spec:** `docs/superpowers/specs/2026-09-03-homepage-viewport-panels-design.md`

## Global Constraints

- Every direct homepage section must be exactly one `100svh`/`100dvh` viewport tall.
- The 4K hero video stays autoplaying, muted, looping, and inline when reduced motion is not requested.
- Important copy and calls to action must remain visible and usable from 375x667 through 3840x2160.
- Preserve the existing Bella's Baskett visual identity and content claims.
- Do not add dependencies.

---

### Task 1: Viewport behavior contract

**Files:**

- Modify: `tests/e2e/portfolio.spec.ts`
- Modify: `tests/e2e/service-discovery.spec.ts`

**Interfaces:**

- Consumes: homepage sections rendered under `main#main-content`
- Produces: browser-level assertions for exact viewport height, horizontal overflow, and in-panel control visibility

- [x] **Step 1: Write the failing responsive-panel test**

Add a table-driven Playwright test for 375x667, 393x852, 412x915, 768x1024, 1366x768, 1920x1080, and 3840x2160. For every direct homepage section, assert its bounding height equals `window.innerHeight` within one pixel and every visible link/button/summary fits inside its section.

- [x] **Step 2: Run the focused test and verify RED**

Run `npm.cmd run test:e2e -- tests/e2e/portfolio.spec.ts --project=chromium` and expect failures because existing sections have natural heights rather than exact viewport heights.

- [x] **Step 3: Keep the existing hero video contract**

Retain the existing Playwright assertion that the loaded video is 3840x2160 and muted.

### Task 2: Responsive homepage panels

**Files:**

- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: existing `serviceGroups`, `services`, `faqs`, and Bella's Baskett design tokens
- Produces: `.home-viewport-flow`, `.viewport-panel`, `.viewport-panel-shell`, and responsive section-specific layouts

- [x] **Step 1: Add the shared panel contract**

Give every direct homepage section the `viewport-panel` class and define exact `100svh`/`100dvh` height, clipping, scroll-snap alignment, and safe-area-aware spacing in `app/globals.css`.

- [x] **Step 2: Make the hero fit short and wide screens**

Clamp heading, copy, gaps, and buttons by viewport width and height while preserving the video overlay and both calls to action.

- [x] **Step 3: Compact editorial and service panels**

Centre the studio panel vertically. Replace the tall service card layout with a native horizontal swipe row on narrow screens and responsive grids at medium and extra-large widths.

- [x] **Step 4: Compact portfolio, process, corporate, and FAQ panels**

Remove fixed oversized card heights, use height-aware clamps, and ensure all panel controls remain inside their boundaries at 375x667.

- [x] **Step 5: Fit the final CTA panel**

Centre the final CTA with safe-area padding and height-aware typography.

- [x] **Step 6: Run focused tests and verify GREEN**

Run `npm.cmd run test:e2e -- tests/e2e/portfolio.spec.ts tests/e2e/service-discovery.spec.ts --project=chromium` and expect all viewport and hero video tests to pass.

### Task 3: Full verification and delivery

**Files:**

- Modify only if verification reveals a regression in a file changed above.

**Interfaces:**

- Consumes: completed homepage panel implementation
- Produces: verified build and deployed private Sites version

- [x] **Step 1: Run unit and static checks**

Run `npm.cmd run test:run`, `npm.cmd run lint`, and `npm.cmd run build`; expect zero failures.

- [x] **Step 2: Run the complete browser suite**

Run `npm.cmd run test:e2e`; expect all public-route, accessibility, configurator, portfolio, responsive, and hero video checks to pass.

- [x] **Step 3: Inspect the result at phone, laptop, and 4K sizes**

Open the local homepage and confirm the hero crop, text hierarchy, service swipe row, and section boundaries visually at 393x852, 1366x768, and 3840x2160.

- [ ] **Step 4: Commit and deploy**

Commit the verified change, publish a new private Sites version, wait for deployment success, and open the exact live URL in the existing Bella's Baskett browser tab.
