export type PortfolioCategory =
  | 'celebrations'
  | 'weddings'
  | 'corporate'
  | 'gifts';

export type PortfolioItem = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  summary: string;
  tone: string;
  isPlaceholder: boolean;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'celebrations-selection',
    title: 'Celebrations, selected with care',
    category: 'celebrations',
    summary:
      'Approved celebration stories and imagery are being prepared for this journal.',
    tone: 'blush',
    isPlaceholder: true,
  },
  {
    slug: 'weddings-selection',
    title: 'Wedding stories, coming gently into view',
    category: 'weddings',
    summary:
      'A considered edit will appear when project details and media are confirmed.',
    tone: 'ivory',
    isPlaceholder: true,
  },
  {
    slug: 'corporate-selection',
    title: 'Brand moments in preparation',
    category: 'corporate',
    summary:
      'Corporate case studies will be published only with approved facts and visuals.',
    tone: 'sage',
    isPlaceholder: true,
  },
  {
    slug: 'gifts-selection',
    title: 'Gestures worth remembering',
    category: 'gifts',
    summary: 'Gift and surprise stories are being curated with care.',
    tone: 'wine',
    isPlaceholder: true,
  },
];
