import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('standalone website export', () => {
  it('creates one offline HTML file with the brand and hero media embedded', () => {
    const directory = mkdtempSync(join(tmpdir(), 'bellas-standalone-'));
    temporaryDirectories.push(directory);
    const outputPath = join(directory, 'index.html');

    execFileSync(
      process.execPath,
      ['tools/export-standalone.mjs', '--output', outputPath],
      { cwd: process.cwd(), stdio: 'pipe' },
    );

    const html = readFileSync(outputPath, 'utf8');

    expect(html).toContain('<title>Bella&#x27;s Baskett');
    expect(html).toContain('data:image/png;base64,');
    expect(html).toContain('data:image/jpeg;base64,');
    expect(html).toContain('data:video/mp4;base64,');
    expect(html).toContain('<style id="compiled-site-styles">');
    expect(html).toContain('id="mobile-menu"');
    expect(html).toContain('alt="Bella&#39;s Baskett menu logo"');
    expect(html).not.toMatch(/<small>0[1-5]<\/small>/);
    expect(html.match(/class="viewport-panel/g)).toHaveLength(8);
    expect(html).not.toMatch(/(?:src|href)="\/(?!\/)/);
    expect(html).not.toContain('<link rel="stylesheet"');

    const portableScript = html.match(
      /<script>([\s\S]*?)<\/script><\/body>/,
    )?.[1];
    expect(portableScript).toBeDefined();
    document.body.innerHTML = `
      <button aria-controls="mobile-menu" aria-expanded="false"></button>
      <dialog id="mobile-menu">
        <button class="portable-mobile-menu__close"></button>
        <a href="#introduction">About</a>
      </dialog>
    `;
    // oxlint-disable-next-line typescript/no-implied-eval -- Execute the generated offline script against a controlled DOM fixture.
    new Function(portableScript ?? '')();

    const trigger = document.querySelector<HTMLButtonElement>(
      '[aria-controls="mobile-menu"]',
    );
    const menu = document.getElementById('mobile-menu');

    trigger?.click();
    expect(menu).toHaveAttribute('open');

    window.dispatchEvent(new Event('scroll'));
    expect(menu).not.toHaveAttribute('open');

    trigger?.click();
    expect(menu).toHaveAttribute('open');
    menu?.dispatchEvent(
      new MouseEvent('pointerdown', { bubbles: true, clientY: 120 }),
    );
    menu?.dispatchEvent(
      new MouseEvent('pointerup', { bubbles: true, clientY: 190 }),
    );
    expect(menu).not.toHaveAttribute('open');
  });

  it('creates a missing parent directory for deployment output', () => {
    const directory = mkdtempSync(join(tmpdir(), 'bellas-vercel-'));
    temporaryDirectories.push(directory);
    const outputPath = join(directory, 'vercel-output', 'index.html');

    execFileSync(
      process.execPath,
      ['tools/export-standalone.mjs', '--output', outputPath],
      { cwd: process.cwd(), stdio: 'pipe' },
    );

    expect(readFileSync(outputPath, 'utf8')).toContain(
      '<title>Bella&#x27;s Baskett',
    );
  });
});
