import type { PortfolioCategory, PortfolioItem } from '@/content/portfolio';

export function filterPortfolio(
  items: PortfolioItem[],
  category: PortfolioCategory | 'all',
) {
  return category === 'all'
    ? items
    : items.filter((item) => item.category === category);
}
