import { readdir, readFile, writeFile } from 'node:fs/promises';
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
    await Promise.all(cssFiles.map((name) => readFile(join(cssDirectory, name), 'utf8')))
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
    <span>Explore the studio</span>
    <button type="button" class="portable-mobile-menu__close" aria-label="Close menu">×</button>
  </div>
  <nav aria-label="Mobile navigation">
    <a href="#introduction"><small>01</small>About</a>
    <a href="#services"><small>02</small>Services</a>
    <a href="#portfolio"><small>03</small>Portfolio</a>
    <a href="#process"><small>04</small>Packages</a>
    <a href="#faq"><small>05</small>Journal</a>
  </nav>
  <a class="portable-mobile-menu__cta" href="#contact">Plan your event</a>
</dialog>`;

const portableStyles = String.raw`<style id="portable-site-styles">
  .portable-mobile-menu {
    inset: 4.75rem 0 0;
    width: 100%;
    height: calc(100dvh - 4.75rem);
    max-width: none;
    max-height: none;
    margin: 0;
    border: 0;
    padding: 1.5rem;
    background: var(--wine);
    color: var(--mist);
  }
  .portable-mobile-menu[open] { display: flex; flex-direction: column; }
  .portable-mobile-menu::backdrop { background: transparent; }
  .portable-mobile-menu__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--champagne);
    font-size: .69rem;
    font-weight: 700;
    letter-spacing: .22em;
    text-transform: uppercase;
  }
  .portable-mobile-menu__close {
    width: 2.75rem;
    height: 2.75rem;
    color: var(--mist);
    font-size: 2rem;
    line-height: 1;
  }
  .portable-mobile-menu nav { display: flex; flex: 1; flex-direction: column; margin-top: 1.75rem; }
  .portable-mobile-menu nav a {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(255 255 255 / 15%);
    padding: .72rem 0;
    color: inherit;
    font-family: var(--font-cormorant), Georgia, serif;
    font-size: clamp(2.2rem, 11vw, 4rem);
    line-height: 1;
  }
  .portable-mobile-menu nav small {
    margin-right: 1rem;
    color: var(--champagne);
    font-family: var(--font-manrope), Arial, sans-serif;
    font-size: .65rem;
    letter-spacing: .18em;
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
  }
  @media (min-width: 1024px) { .portable-mobile-menu { display: none !important; } }
</style>`;

const portableScript = String.raw`<script>
  (() => {
    const trigger = document.querySelector('[aria-controls="mobile-menu"]');
    const menu = document.getElementById('mobile-menu');
    const closeButton = menu && menu.querySelector('.portable-mobile-menu__close');

    const closeMenu = () => {
      if (!menu) return;
      if (typeof menu.close === 'function' && menu.open) menu.close();
      else menu.removeAttribute('open');
      trigger?.setAttribute('aria-expanded', 'false');
      trigger?.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
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
  })();
</script>`;

async function buildStandaloneHtml() {
  const serverEntry = join(projectRoot, 'dist', 'server', 'index.js');
  const workerModule = await import(`${pathToFileURL(serverEntry).href}?standalone`);
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
    toDataUri(join(projectRoot, 'public', 'bellas-baskett-logo.jpg')),
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
  html = html.replaceAll('/bellas-baskett-logo.jpg', logo);
  html = html.replaceAll('/flowers-hero-4k.mp4', video);
  html = html.replaceAll('/flowers-hero-poster.jpg', poster);
  html = html.replaceAll('/favicon.svg', favicon);
  html = html.replace(/\sdisabled(?:="")?/g, '');
  html = addPanelAnchors(html);
  html = rewriteInternalLinks(html);
  html = html.replace('</head>', `${portableStyles}</head>`);
  html = html.replace('</header>', `</header>${portableMenu}`);
  html = html.replace('</body>', `${portableScript}</body>`);

  return html;
}

const standaloneHtml = await buildStandaloneHtml();
await writeFile(outputPath, standaloneHtml, 'utf8');
console.log(`Standalone website created: ${outputPath}`);
