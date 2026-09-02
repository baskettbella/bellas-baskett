# Bella's Baskett Marketing Website — Design Specification

Date: 2 September 2026  
Status: Approved direction, pending written-spec review

## 1. Product scope

Build a premium, multi-page marketing website for Bella's Baskett that helps visitors understand the company's event-styling services, explore its work, and prepare a structured enquiry that continues through WhatsApp.

The website will not contain a database, authentication, CMS, admin dashboard, online booking, quotation system, online payment, client portal, or persistent file uploads.

Content will be maintained as typed local data files inside the project. The structure must remain clean enough for a database or headless CMS to be introduced later without redesigning the public interface.

## 2. Intended audience and primary outcome

The website serves customers planning private celebrations, weddings and social events, corporate events, and gifts or surprise setups in Kuala Lumpur and the Klang Valley.

The primary conversion is a high-quality WhatsApp enquiry. Visitors should be able to:

1. Recognise Bella's Baskett as a mature bespoke event-styling studio.
2. Find a relevant service or project quickly.
3. Understand the broad planning process and pricing caveats.
4. Prepare an event brief through a short guided configurator.
5. Continue the conversation using the confirmed WhatsApp number.

## 3. Sitemap

Primary public routes:

- `/` — Home
- `/about` — About
- `/services` — Services overview
- `/services/[slug]` — Reusable service-detail pages
- `/portfolio` — Editorial portfolio
- `/portfolio/[slug]` — Static project stories when verified content exists
- `/packages` — Package structures without unverified prices
- `/corporate-events` — Corporate capabilities
- `/gifts-surprises` — Gifts and surprises
- `/process` — Working process
- `/journal` — Editorial article index
- `/journal/[slug]` — Static articles when approved copy exists
- `/faq` — Frequently asked questions
- `/contact` — Contact details and social links
- `/plan-your-event` — WhatsApp event configurator

Legal routes will be added only when approved policy copy is supplied. Testimonials, client logos, prices, media mentions, awards, and unsupported projects must remain unpublished until verified.

## 4. Core experience

### Home

The homepage is a continuous editorial story rather than a stack of cards. It includes:

- Transparent navigation over an immersive hero.
- The headline “Celebrations, beautifully imagined.”
- Clear paths to Plan Your Event and Explore Our Work.
- Brand introduction and four service worlds.
- Selected project presentation using approved media.
- A concise process sequence.
- Corporate capability section.
- Service area, FAQ preview, final CTA, and complete footer.

### Services

Services are grouped into Celebrations, Weddings & Social Events, Corporate Events, and Gifts & Surprises. Each group uses a distinct editorial composition rather than identical icon cards. Service-detail pages share a reusable template and use only verified descriptions, imagery, prices, and availability statements.

### Portfolio

The portfolio uses an asymmetrical editorial layout with functional category filtering. Project stories are created only from approved Bella's Baskett media and facts. If verified project content is unavailable, the site will use an intentional content-pending presentation rather than invented work.

### WhatsApp configurator

The configurator collects event type, date, location, event scale, style, colour direction, required services, budget preference, reference links, contact details, and a final review.

Because there is no database:

- The draft remains only in the visitor's browser during the session.
- No personal information or files are uploaded to the website.
- Inspiration is provided through optional links or written notes.
- Submission creates an encoded WhatsApp message and opens `https://wa.me/60179223552`.
- The interface clearly states that sending the WhatsApp message is required to complete the enquiry.
- No enquiry reference number is generated because nothing is persisted.

## 5. Visual direction

The experience is dreamy, romantic, cinematic, sophisticated, and quietly celebratory. The supplied animated reference informs atmosphere, layered depth, negative space, pacing, and editorial typography, but its literal artwork is not copied.

### Palette

- Porcelain Ivory: `#F7F3ED`
- Mist White: `#FCFAF7`
- Powder Blush: `#E5D1D2`
- Dusty Rose: `#BD9095`
- Mauve Taupe: `#8B7475`
- Deep Wine: `#4A2931`
- Cocoa Brown: `#302421`
- Muted Sage: `#A5AA9B`
- Antique Champagne: `#B79D78`

### Typography

- Editorial display serif: Cormorant Garamond or an equivalent approved typeface.
- Interface and body sans-serif: Manrope or an equivalent approved typeface.
- Italic serif accents are used selectively; scripts are excluded from navigation and long copy.

### Motifs and movement

Two recurring motifs provide cohesion: translucent fabric or ribbon movement, and soft floral shadows. Fine antique-champagne rules act as a supporting detail.

Motion is slow and restrained: gentle image reveals, subtle focus or scale changes, calm navigation transitions, and small typography movement. Reduced-motion preferences remove non-essential animation. There is no scroll hijacking or aggressive parallax.

## 6. Responsive and accessible behaviour

- Mobile layouts are deliberately recomposed rather than compressed desktop views.
- Navigation becomes a full-screen editorial menu with an always-visible Plan Your Event path.
- Portfolio layouts become swipe-friendly sequences on touch devices.
- Heavy hero media receives a still-image or lightweight mobile fallback.
- Semantic HTML, keyboard navigation, visible focus, labelled controls, useful errors, adequate contrast, touch targets, and reduced-motion support target WCAG 2.2 AA.

## 7. Technical architecture

Use the supported Sites/Vinext TypeScript scaffold with React, Tailwind CSS, shadcn primitives, and Lucide icons. Public content is generated from typed local modules. Interactive code is limited to navigation, portfolio filtering, galleries, and the configurator.

Suggested source boundaries:

- `app/` — routes, metadata, and route-level composition
- `components/ui/` — accessible primitives
- `components/brand/` — navigation, headings, buttons, motifs, and footer
- `components/content/` — service, portfolio, package, FAQ, and journal presentation
- `features/configurator/` — steps, validation, review, session state, and WhatsApp message generation
- `features/portfolio/` — filtering and project presentation
- `content/` — typed business content and media references
- `lib/` — metadata, analytics helpers, utilities, and shared types

No database client, authentication package, payment SDK, storage SDK, or server-side personal-data persistence will be installed.

## 8. Content and media rules

- British English is the initial language.
- Copy remains warm, assured, clear, refined, and commercially useful.
- No invented testimonials, statistics, clients, awards, prices, press coverage, or project details.
- Portfolio and hero media must use approved Bella's Baskett assets when available.
- Temporary editorial imagery, if required during development, must be visibly identified as replaceable and cannot be presented as Bella's Baskett work.
- Instagram content is curated into local site content rather than loaded through a heavy live social feed.

## 9. Analytics and privacy

Only non-sensitive interaction events are eligible for analytics: CTA clicks, service views, portfolio filters, configurator progress, WhatsApp continuation, and contact actions. Event details, names, phone numbers, notes, budgets, and reference links must never be sent to analytics.

Without a database, the site retains no enquiry data. Any optional browser draft must use session-only storage and provide a clear reset action.

## 10. Testing and acceptance criteria

The completed site must pass:

- Type checking and production build.
- Unit tests for filter behaviour, configurator validation, and WhatsApp message generation.
- Component tests for navigation, dialogs, forms, and empty states.
- End-to-end tests for service discovery, portfolio filtering, and the complete WhatsApp enquiry journey.
- Accessibility checks for keyboard use, focus, labels, reduced motion, and contrast.
- Responsive checks at 360, 390, 768, 1024, and 1440 pixels.
- SEO checks for metadata, canonicals, sitemap, robots rules, structured data, and semantic headings.
- Performance checks for responsive images, lazy loading, stable layouts, font loading, and mobile hero fallback.

No visible button, filter, form step, or navigation destination may be inert.

## 11. Delivery sequence

1. Scaffold the supported site and establish the visual tokens.
2. Build the first meaningful homepage slice and preview it.
3. Add shared navigation, footer, content models, and public routes.
4. Build services, portfolio, packages, corporate, gifts, process, FAQ, journal, and contact experiences.
5. Build and test the session-only WhatsApp configurator.
6. Add metadata, structured data, social preview, analytics hooks, and error states.
7. Complete responsive, accessibility, performance, and production-build validation.
8. Publish the validated site for review.

## 12. Deferred capabilities

The following are explicitly outside the approved scope:

- Persistent enquiries and lead reference numbers
- Database and CMS
- Admin and operations dashboards
- Availability and booking management
- Quotations, invoices, payments, and refunds
- Authentication and customer portal
- Private file uploads and moodboards
- Staff roles, inventory, suppliers, and reporting

These capabilities may be introduced later through separate designs. They are not prerequisites for the marketing website.
