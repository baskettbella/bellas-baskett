import { describe, expect, it } from 'vitest';

import { portfolioItems } from '@/content/portfolio';
import { filterPortfolio } from '@/features/portfolio/filter-items';

describe('filterPortfolio', () => {
  it('returns the full collection for the all category', () => {
    expect(filterPortfolio(portfolioItems, 'all')).toEqual(portfolioItems);
  });

  it('returns only items in the selected category', () => {
    const result = filterPortfolio(portfolioItems, 'corporate');
    expect(result).toHaveLength(1);
    expect(result.every((item) => item.category === 'corporate')).toBe(true);
  });
});
