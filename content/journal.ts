export type JournalEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  isPublished: boolean;
};

export const journalEntries: JournalEntry[] = [
  {
    slug: 'choosing-an-event-style',
    title: 'Finding the feeling before choosing the details',
    excerpt:
      'A future note on turning references into a clear and personal styling direction.',
    category: 'Planning notes',
    isPublished: false,
  },
  {
    slug: 'thoughtful-guest-experience',
    title: 'Small details that shape a guest experience',
    excerpt:
      'A future note on arrival, atmosphere, pacing and the touches guests remember.',
    category: 'Studio notes',
    isPublished: false,
  },
  {
    slug: 'preparing-your-event-brief',
    title: 'What makes an event brief genuinely useful',
    excerpt:
      'A future guide to the information that helps a styling conversation begin well.',
    category: 'Planning notes',
    isPublished: false,
  },
];

export const publishedJournalEntries = journalEntries.filter(
  (entry) => entry.isPublished,
);
