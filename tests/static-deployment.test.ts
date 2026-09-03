import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('static deployment export', () => {
  it('keeps real routes and browser code so navigation and controls remain interactive', () => {
    const outputPath = mkdtempSync(join(tmpdir(), 'bellas-deployment-'));
    temporaryDirectories.push(outputPath);

    execFileSync(
      process.execPath,
      ['tools/export-static-site.mjs', '--output', outputPath],
      { cwd: process.cwd(), stdio: 'pipe' },
    );

    const homepage = readFileSync(join(outputPath, 'index.html'), 'utf8');
    const aboutPage = readFileSync(
      join(outputPath, 'about', 'index.html'),
      'utf8',
    );
    const plannerPage = readFileSync(
      join(outputPath, 'plan-your-event', 'index.html'),
      'utf8',
    );

    expect(homepage).toContain('href="/about"');
    expect(homepage).toContain('/_next/static/');
    expect(homepage).toContain('/bellas-baskett-logo-transparent.png');
    expect(aboutPage).toContain('A studio for meaningful moments.');
    expect(aboutPage).toContain('src="/og.png"');
    expect(aboutPage).not.toContain('/_next/image?');
    expect(plannerPage).toContain('Tell us about your event');
    expect(
      readdirSync(join(outputPath, '_next', 'static', 'chunks')).some((name) =>
        name.endsWith('.js'),
      ),
    ).toBe(true);
    expect(
      existsSync(join(outputPath, 'bellas-baskett-logo-transparent.png')),
    ).toBe(true);
    expect(existsSync(join(outputPath, 'flowers-hero-4k.mp4'))).toBe(true);
  });
});
