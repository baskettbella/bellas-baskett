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
    expect(html).toContain('data:image/jpeg;base64,');
    expect(html).toContain('data:video/mp4;base64,');
    expect(html).toContain('<style id="compiled-site-styles">');
    expect(html).toContain('id="mobile-menu"');
    expect(html.match(/class="viewport-panel/g)).toHaveLength(8);
    expect(html).not.toMatch(/(?:src|href)="\/(?!\/)/);
    expect(html).not.toContain('<link rel="stylesheet"');
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
