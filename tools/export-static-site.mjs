import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const navigationFallback = String.raw`<script id="static-navigation-fallback">
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download') || link.target === '_blank') return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(destination.href);
  }, true);
</script>`;

function workerContext() {
  return { passThroughOnException() {}, waitUntil() {} };
}

async function fetchBuiltPage(worker, pathname) {
  const response = await worker.fetch(
    new Request(`http://static.local${pathname}`, {
      headers: { accept: 'text/html,application/xhtml+xml' },
    }),
    {},
    workerContext(),
  );

  if (!response.ok) {
    throw new Error(
      `The built route ${pathname} returned HTTP ${response.status}.`,
    );
  }

  return response.text();
}

async function discoverRoutes(worker) {
  const response = await worker.fetch(
    new Request('http://static.local/sitemap.xml'),
    {},
    workerContext(),
  );

  if (!response.ok) {
    throw new Error(`The built sitemap returned HTTP ${response.status}.`);
  }

  const sitemap = await response.text();
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, location]) => new URL(location).pathname,
  );

  return [...new Set(['/', ...routes])];
}

async function writeBuiltAsset(worker, pathname, outputPath) {
  const response = await worker.fetch(
    new Request(`http://static.local${pathname}`),
    {},
    workerContext(),
  );

  if (!response.ok) {
    throw new Error(
      `The built asset ${pathname} returned HTTP ${response.status}.`,
    );
  }

  await writeFile(outputPath, await response.text(), 'utf8');
}

async function copyDirectoryContents(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source)) {
    await cp(join(source, entry), join(destination, entry), {
      force: true,
      recursive: true,
    });
  }
}

function routeOutputPath(outputDirectory, route) {
  if (route === '/') return join(outputDirectory, 'index.html');
  return join(
    outputDirectory,
    ...route.split('/').filter(Boolean),
    'index.html',
  );
}

function rewriteOptimizedImages(html) {
  return html
    .replace(/\s+srcSet="\/_next\/image\?[^"]*"/gi, '')
    .replace(/src="(\/_next\/image\?[^"]*)"/gi, (_match, source) => {
      const optimizerUrl = new URL(
        source.replaceAll('&amp;', '&'),
        'http://static.local',
      );
      const originalSource = optimizerUrl.searchParams.get('url');
      return originalSource ? `src="${originalSource}"` : `src="${source}"`;
    });
}

function makeStaticNavigationReliable(html) {
  return rewriteOptimizedImages(html).replace(
    '</body>',
    `${navigationFallback}</body>`,
  );
}

export async function exportStaticSite(outputDirectory) {
  const outputPath = resolve(projectRoot, outputDirectory);
  const serverEntry = join(projectRoot, 'dist', 'server', 'index.js');
  const workerModule = await import(
    `${pathToFileURL(serverEntry).href}?static-site`
  );
  const worker = workerModule.default;
  const routes = await discoverRoutes(worker);

  await mkdir(outputPath, { recursive: true });
  await copyDirectoryContents(join(projectRoot, 'public'), outputPath);
  await cp(
    join(projectRoot, 'dist', 'client', '_next'),
    join(outputPath, '_next'),
    { force: true, recursive: true },
  );

  for (const route of routes) {
    const filePath = routeOutputPath(outputPath, route);
    const html = makeStaticNavigationReliable(
      await fetchBuiltPage(worker, route),
    );
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, html, 'utf8');
  }

  await Promise.all([
    writeBuiltAsset(worker, '/sitemap.xml', join(outputPath, 'sitemap.xml')),
    writeBuiltAsset(worker, '/robots.txt', join(outputPath, 'robots.txt')),
  ]);

  console.log(
    `Static deployment created with ${routes.length} routes: ${outputPath}`,
  );
}

const outputFlagIndex = process.argv.indexOf('--output');
const requestedOutput =
  outputFlagIndex === -1 ? 'vercel-output' : process.argv[outputFlagIndex + 1];
const invokedDirectly =
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (invokedDirectly) {
  if (!requestedOutput)
    throw new Error('The --output flag requires a directory.');
  await exportStaticSite(requestedOutput);
}
