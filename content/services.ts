export type ServiceCategory =
  | 'celebrations'
  | 'weddings'
  | 'corporate'
  | 'gifts';

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  eyebrow: string;
  description: string;
  details: string[];
  includes: string[];
  href: string;
};

export const services: Service[] = [
  {
    slug: 'intimate-celebrations',
    title: 'Intimate Celebrations',
    category: 'celebrations',
    eyebrow: 'Birthdays · Anniversaries · Private moments',
    description:
      'Thoughtful styling for gatherings that feel personal, polished and entirely your own.',
    details: [
      'We shape the atmosphere around your guest list, setting and reason for gathering, with considered colour, texture and focal moments.',
      'Every proposal is tailored after we understand the space, timing and experience you want your guests to remember.',
    ],
    includes: [
      'Creative direction',
      'Tablescape and focal styling',
      'Set-up and styling coordination',
    ],
    href: '/services/intimate-celebrations',
  },
  {
    slug: 'birthday-styling',
    title: 'Birthday Styling',
    category: 'celebrations',
    eyebrow: 'Milestones · Children · Adults',
    description:
      'Expressive birthday settings with an elevated point of view, from joyful colour stories to quietly elegant dinners.',
    details: [
      'A birthday can be playful, refined or both. We translate your brief into a cohesive setting without losing the personality behind it.',
      'Scale and inclusions depend on the venue, lead time and selected styling elements.',
    ],
    includes: ['Concept and palette', 'Decor composition', 'On-site finishing'],
    href: '/services/birthday-styling',
  },
  {
    slug: 'wedding-celebrations',
    title: 'Wedding Celebrations',
    category: 'weddings',
    eyebrow: 'Nikah · Receptions · Social celebrations',
    description:
      'Romantic, composed environments that carry one visual story from first impression to final detail.',
    details: [
      'We begin with the feeling you want to create, then consider guest movement, visual anchors and the details that make the celebration feel whole.',
      'Venue requirements and production scope are confirmed during consultation before a proposal is prepared.',
    ],
    includes: [
      'Visual direction',
      'Ceremony or reception styling',
      'Styling-day coordination',
    ],
    href: '/services/wedding-celebrations',
  },
  {
    slug: 'bridal-showers',
    title: 'Bridal Showers',
    category: 'weddings',
    eyebrow: 'Bridal lunches · Showers · Hen celebrations',
    description:
      'Softly celebratory settings designed for conversation, beautiful photographs and an unhurried sense of occasion.',
    details: [
      'We tailor the tablescape and surrounding details to the host, venue and personality of the bride-to-be.',
      'Floral direction, stationery moments and personalised details can be discussed as part of the brief.',
    ],
    includes: ['Mood and palette', 'Guest-table styling', 'Feature moment'],
    href: '/services/bridal-showers',
  },
  {
    slug: 'brand-activations',
    title: 'Brand Activations',
    category: 'corporate',
    eyebrow: 'Launches · Pop-ups · Press moments',
    description:
      'Guest-facing spaces that express your brand clearly while still feeling warm, considered and memorable.',
    details: [
      'We interpret campaign direction for a physical setting, balancing brand consistency with practical guest flow and venue constraints.',
      'Timelines, access, supplier coordination and required approvals are scoped before production begins.',
    ],
    includes: [
      'Brand-led concept',
      'Spatial styling',
      'Production coordination',
    ],
    href: '/services/brand-activations',
  },
  {
    slug: 'corporate-gatherings',
    title: 'Corporate Gatherings',
    category: 'corporate',
    eyebrow: 'Dinners · Appreciation · Team occasions',
    description:
      'Refined event styling for organisations that want guests to feel genuinely welcomed and thoughtfully hosted.',
    details: [
      'From leadership dinners to festive gatherings, the visual approach is calibrated to your audience, brand and purpose.',
      'We can work with your appointed venue and production partners within an agreed styling scope.',
    ],
    includes: [
      'Event look and feel',
      'Decor and tablescape',
      'On-site styling',
    ],
    href: '/services/corporate-gatherings',
  },
  {
    slug: 'bespoke-gift-baskets',
    title: 'Bespoke Gift Baskets',
    category: 'gifts',
    eyebrow: 'Personal · Celebratory · Considered',
    description:
      'Beautifully composed gestures shaped around the recipient, occasion and sentiment you want to send.',
    details: [
      'Tell us who the gift is for and how you want it to feel. We will explore a suitable direction based on timing and available elements.',
      'Contents, presentation and delivery feasibility are confirmed individually before an order is accepted.',
    ],
    includes: ['Gift direction', 'Curated presentation', 'Message card'],
    href: '/services/bespoke-gift-baskets',
  },
  {
    slug: 'surprise-setups',
    title: 'Surprise Set-ups',
    category: 'gifts',
    eyebrow: 'Proposals · Welcome home · Just because',
    description:
      'Private surprise moments styled with warmth, discretion and a clear sense of reveal.',
    details: [
      'We plan around access, timing and the intended reveal so the experience feels effortless to the recipient.',
      'Location permission, delivery windows and any venue restrictions must be confirmed during planning.',
    ],
    includes: ['Surprise concept', 'Set-up styling', 'Reveal-ready finishing'],
    href: '/services/surprise-setups',
  },
];

export const serviceGroups: Array<{
  id: ServiceCategory;
  label: string;
  introduction: string;
}> = [
  {
    id: 'celebrations',
    label: 'Celebrations',
    introduction:
      'Gatherings made personal through colour, texture and thoughtful detail.',
  },
  {
    id: 'weddings',
    label: 'Weddings & social events',
    introduction:
      'Romantic settings composed around the people and moments that matter.',
  },
  {
    id: 'corporate',
    label: 'Corporate events',
    introduction:
      'Brand-aware experiences with warmth, clarity and polished delivery.',
  },
  {
    id: 'gifts',
    label: 'Gifts & surprises',
    introduction:
      'Meaningful gestures and intimate reveals, considered from first thought to final detail.',
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
