import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputFlagIndex = process.argv.indexOf('--output');
const outputPath = resolve(
  projectRoot,
  outputFlagIndex === -1 ? 'index.html' : process.argv[outputFlagIndex + 1],
);

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
};

async function toDataUri(path) {
  const extension = extname(path).toLowerCase();
  const mimeType = mimeTypes[extension];

  if (!mimeType) throw new Error(`Unsupported standalone asset: ${path}`);

  const contents = await readFile(path);
  return `data:${mimeType};base64,${contents.toString('base64')}`;
}

async function readCompiledCss() {
  const cssDirectory = join(
    projectRoot,
    'dist',
    'client',
    '_next',
    'static',
    'css',
  );
  const cssFiles = (await readdir(cssDirectory))
    .filter((name) => name.endsWith('.css'))
    .sort();

  if (cssFiles.length === 0) {
    throw new Error('No compiled stylesheet found. Run the site build first.');
  }

  return (
    await Promise.all(
      cssFiles.map((name) => readFile(join(cssDirectory, name), 'utf8')),
    )
  ).join('\n');
}

function rewriteInternalLinks(html) {
  const routeTargets = {
    '/': '#top',
    '/about': '#introduction',
    '/services': '#services',
    '/portfolio': '#portfolio',
    '/packages': '#process',
    '/journal': '#faq',
    '/process': '#process',
    '/corporate-events': '#corporate',
    '/gifts-surprises': '#services',
    '/faq': '#faq',
    '/contact': '#contact',
    '/plan-your-event': '#contact',
  };

  return html.replace(/href="(\/[^"]*)"/g, (_match, route) => {
    const target =
      routeTargets[route] ??
      (route.startsWith('/services/')
        ? '#services'
        : route.startsWith('/portfolio/')
          ? '#portfolio'
          : route.startsWith('/journal/')
            ? '#faq'
            : '#top');

    return `href="${target}"`;
  });
}

function addPanelAnchors(html) {
  const panelIds = [
    'top',
    'introduction',
    'services',
    'portfolio',
    'process',
    'corporate',
    'faq',
    'contact',
  ];
  let panelIndex = 0;

  return html.replace(/<section\b([^>]*)>/gi, (_match, attributes) => {
    const id = panelIds[panelIndex++];
    if (!id) return `<section${attributes}>`;

    const attributesWithoutId = attributes.replace(/\s+id="[^"]*"/i, '');
    return `<section id="${id}"${attributesWithoutId}>`;
  });
}

const portableMenu = String.raw`
<dialog id="mobile-menu" class="portable-mobile-menu" aria-label="Site menu">
  <div class="portable-mobile-menu__bar">
    <button type="button" class="portable-mobile-menu__close" aria-label="Close menu">×</button>
  </div>
  <div class="portable-mobile-menu__content">
    <div class="portable-mobile-menu__logo-frame">
      <img class="portable-mobile-menu__logo" src="__BELLA_MENU_LOGO__" alt="Bella&#39;s Baskett menu logo" width="554" height="554">
    </div>
    <nav aria-label="Mobile navigation">
      <a href="#introduction">About<span aria-hidden="true">↗</span></a>
      <a href="#services">Services<span aria-hidden="true">↗</span></a>
      <a href="#portfolio">Portfolio<span aria-hidden="true">↗</span></a>
      <a href="#process">Packages<span aria-hidden="true">↗</span></a>
      <a href="#faq">Journal<span aria-hidden="true">↗</span></a>
    </nav>
    <a class="portable-mobile-menu__cta" href="#contact">Plan your event</a>
    <small class="portable-mobile-menu__hint">Swipe to close</small>
  </div>
</dialog>`;

const portableStyles = String.raw`<style id="portable-site-styles">
  .portable-mobile-menu {
    inset: 0;
    z-index: 60;
    width: 100vw;
    height: 100dvh;
    max-width: none;
    max-height: none;
    margin: 0;
    border: 0;
    padding: max(1rem, env(safe-area-inset-top)) 1.25rem max(1.25rem, env(safe-area-inset-bottom));
    background: var(--wine);
    color: var(--mist);
    overflow: hidden;
    touch-action: none;
    animation: portable-menu-reveal 420ms cubic-bezier(.22, 1, .36, 1) both;
  }
  .portable-mobile-menu[open] { display: flex; flex-direction: column; }
  .portable-mobile-menu::backdrop { background: transparent; }
  .portable-mobile-menu__bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .portable-mobile-menu__close {
    width: 3rem;
    height: 3rem;
    border: 1px solid rgb(255 255 255 / 25%);
    border-radius: 999px;
    color: var(--mist);
    font-size: 2rem;
    line-height: 1;
  }
  .portable-mobile-menu__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: min(100%, 22rem);
    margin-inline: auto;
    padding-block: 1.25rem;
  }
  .portable-mobile-menu__logo-frame {
    width: clamp(8.5rem, 38vw, 11rem);
    aspect-ratio: 3.15 / 1;
    margin-bottom: 1.5rem;
    overflow: hidden;
  }
  .portable-mobile-menu__logo {
    display: block;
    width: 100%;
    height: auto;
    filter: brightness(0) invert(1);
    opacity: .7;
    transform: translateY(-33.5%);
  }
  .portable-mobile-menu nav {
    width: 100%;
  }
  .portable-mobile-menu nav a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid rgb(255 255 255 / 15%);
    padding: clamp(.58rem, 1.4vh, .78rem) 1.75rem;
    color: inherit;
    font-family: var(--font-cormorant), Georgia, serif;
    font-size: clamp(1.65rem, 7.5vw, 2.35rem);
    letter-spacing: -.015em;
    line-height: 1;
    text-align: center;
    transition: color 300ms ease, background-color 300ms ease, padding 300ms ease, transform 150ms ease;
  }
  .portable-mobile-menu nav a:hover,
  .portable-mobile-menu nav a:focus-visible {
    padding-inline: 2.25rem;
    color: var(--champagne);
    background: rgb(255 255 255 / 6%);
  }
  .portable-mobile-menu nav a:active {
    background: rgb(255 255 255 / 10%);
    transform: scale(.98);
  }
  .portable-mobile-menu nav a span {
    position: absolute;
    right: 1rem;
    color: var(--champagne);
    font-family: var(--font-manrope), Arial, sans-serif;
    font-size: .875rem;
    opacity: 0;
    transition: opacity 300ms ease, transform 300ms ease;
  }
  .portable-mobile-menu nav a:hover span,
  .portable-mobile-menu nav a:focus-visible span {
    opacity: 1;
    transform: translateX(.25rem);
  }
  .portable-mobile-menu__cta {
    display: inline-flex;
    min-height: 2.75rem;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(255 255 255 / 35%);
    padding: .85rem 1.35rem;
    color: var(--mist);
    font-size: .72rem;
    font-weight: 750;
    letter-spacing: .13em;
    text-transform: uppercase;
    width: 100%;
    margin-top: 1.75rem;
  }
  .portable-mobile-menu__hint {
    margin-top: 1rem;
    color: rgb(255 255 255 / 35%);
    font-size: .58rem;
    letter-spacing: .2em;
    text-transform: uppercase;
  }
  @keyframes portable-menu-reveal {
    from { opacity: 0; transform: translateY(-1rem); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (min-width: 1024px) { .portable-mobile-menu { display: none !important; } }
</style>`;

const portableScript = String.raw`<script>
  (() => {
    const trigger = document.querySelector('[aria-controls="mobile-menu"]');
    const menu = document.getElementById('mobile-menu');
    const closeButton = menu && menu.querySelector('.portable-mobile-menu__close');
    let swipeStart = null;

    const closeMenu = () => {
      if (!menu) return;
      if (typeof menu.close === 'function' && menu.open) menu.close();
      else menu.removeAttribute('open');
      trigger?.setAttribute('aria-expanded', 'false');
      trigger?.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
      swipeStart = null;
    };

    trigger?.addEventListener('click', () => {
      if (!menu) return;
      if (menu.open) return closeMenu();
      if (typeof menu.showModal === 'function') menu.showModal();
      else menu.setAttribute('open', '');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
      menu.querySelector('a')?.focus();
    });

    closeButton?.addEventListener('click', closeMenu);
    menu?.addEventListener('close', closeMenu);
    menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    menu?.addEventListener('pointerdown', (event) => {
      swipeStart = { x: event.clientX, y: event.clientY };
    });
    menu?.addEventListener('pointerup', (event) => {
      if (!swipeStart) return;
      const horizontalDistance = Math.abs(event.clientX - swipeStart.x);
      const verticalDistance = Math.abs(event.clientY - swipeStart.y);
      swipeStart = null;
      if (Math.max(horizontalDistance, verticalDistance) >= 56) closeMenu();
    });
    menu?.addEventListener('pointercancel', () => { swipeStart = null; });
    window.addEventListener('scroll', closeMenu, { passive: true });
  })();
</script>`;

async function buildStandaloneHtml() {
  const serverEntry = join(projectRoot, 'dist', 'server', 'index.js');
  const workerModule = await import(
    `${pathToFileURL(serverEntry).href}?standalone`
  );
  const response = await workerModule.default.fetch(
    new Request('http://standalone.local/'),
    {},
    { passThroughOnException() {}, waitUntil() {} },
  );

  if (!response.ok) {
    throw new Error(`The built homepage returned HTTP ${response.status}.`);
  }

  const [compiledCss, logo, video, poster, favicon] = await Promise.all([
    readCompiledCss(),
    toDataUri(
      join(projectRoot, 'public', 'bellas-baskett-logo-transparent.png'),
    ),
    toDataUri(join(projectRoot, 'public', 'flowers-hero-4k.mp4')),
    toDataUri(join(projectRoot, 'public', 'flowers-hero-poster.jpg')),
    toDataUri(join(projectRoot, 'public', 'favicon.svg')),
  ]);

  let html = await response.text();
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(
    /<link\b[^>]*rel="stylesheet"[^>]*>/gi,
    `<style id="compiled-site-styles">${compiledCss}</style>`,
  );
  html = html.replace(/<link\b(?=[^>]*href="\/_next\/)[^>]*>/gi, '');
  html = html.replaceAll('/bellas-baskett-logo-transparent.png', logo);
  html = html.replaceAll('/flowers-hero-4k.mp4', video);
  html = html.replaceAll('/flowers-hero-poster.jpg', poster);
  html = html.replaceAll('/favicon.svg', favicon);
  html = html.replace(/\sdisabled(?:="")?/g, '');
  html = addPanelAnchors(html);
  html = rewriteInternalLinks(html);
  html = html.replace('</head>', `${portableStyles}</head>`);
  html = html.replace(
    '</header>',
    `</header>${portableMenu.replace('__BELLA_MENU_LOGO__', logo)}`,
  );
  html = html.replace('</body>', `${portableScript}</body>`);

  return html;
}

const vercelOutputPath = resolve(projectRoot, 'vercel-output', 'index.html');

// The connected Vercel project invokes this legacy command. Preserve the
// downloadable single-file default while emitting the route-capable build there.
if (outputPath === vercelOutputPath) {
  const { exportStaticSite } = await import('./export-static-site.mjs');
  await exportStaticSite(dirname(outputPath));
} else {
  const standaloneHtml = await buildStandaloneHtml();
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, standaloneHtml, 'utf8');
  console.log(`Standalone website created: ${outputPath}`);
}
