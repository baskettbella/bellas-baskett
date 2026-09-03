# Homepage Viewport Panels Design

**Date:** 2026-09-03

## Objective

Make every homepage section occupy exactly one visible device viewport while keeping its important copy and calls to action usable on iOS, Android, tablets, laptops, desktop monitors, and 4K televisions.

## Approved Direction

Use a cinematic panel layout inspired by the full-screen pacing of the Legenda Puteri Santubong website, translated into Bella's Baskett's existing wine, blush, champagne, and editorial floral identity. The benchmark informs the scale, rhythm, and full-screen framing only; its cultural imagery and content are not copied.

## Layout

- Every direct homepage section is a `100svh` panel, upgraded to `100dvh` where supported.
- The fixed 4.75rem site header remains visible above the first hero. The hero reserves that space with top padding.
- Homepage panels use proximity scroll snapping so ordinary trackpad and touch scrolling remains forgiving.
- Content is vertically centred within later panels and anchored toward the lower third in the hero.
- Wide screens use restrained maximum widths so text and controls do not stretch across television displays.

## Responsive Content Strategy

- Hero: keep the 4K floral video, overlay, title, paragraph, and both calls to action visible within the first viewport.
- Studio: retain the editorial statement and two supporting paragraphs in a compact two-column composition.
- Services: show a horizontal swipe row on narrow screens and a two- or four-column grid on wider screens.
- Portfolio: use one dominant preview with two compact supporting tiles.
- Process: show three numbered steps in a compact responsive grid.
- Corporate: keep the brand panel and CTA, reducing decorative height on short screens.
- FAQ: retain the introductory copy and four accessible disclosure rows, with tighter typography on short screens.
- Final CTA: centre the closing message within a single viewport.

## Accessibility and Motion

- Never hide required copy or calls to action behind clipping.
- Maintain usable tap targets and keyboard navigation.
- Keep reduced-motion behavior: the hero video and nonessential animation are removed when requested.
- Horizontal service browsing remains native, touch-scrollable, and keyboard reachable.
- Safe-area padding protects content around iPhone display cut-outs and the home indicator.

## Validation Matrix

Automated browser checks cover 375x667, 393x852, 412x915, 768x1024, 1366x768, 1920x1080, and 3840x2160. Each check verifies exact panel height, no horizontal page overflow, and visible interactive controls inside each panel.
