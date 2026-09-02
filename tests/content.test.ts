import { describe, expect, it } from 'vitest';

import { faqs } from '@/content/faq';
import { portfolioItems } from '@/content/portfolio';
import { services } from '@/content/services';
import { siteConfig } from '@/content/site';

describe('approved local content', () => {
  it('keeps service routes unique and free from unverified prices', () => {
    expect(services.length).toBeGreaterThanOrEqual(8);
    expect(new Set(services.map((service) => service.slug)).size).toBe(
      services.length,
    );
    expect(
      services.map((service) => service.description).join(' '),
    ).not.toMatch(/RM\s?\d/i);
  });

  it('gives every FAQ a useful answer', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(6);
    expect(faqs.every((faq) => faq.answer.length > 40)).toBe(true);
  });

  it('marks editorial portfolio entries as placeholders', () => {
    expect(portfolioItems.length).toBeGreaterThan(0);
    expect(portfolioItems.every((item) => item.isPlaceholder)).toBe(true);
  });

  it('does not expose unverified social or email contact links', () => {
    expect(siteConfig.socialLinks).toEqual([]);
  });
});
