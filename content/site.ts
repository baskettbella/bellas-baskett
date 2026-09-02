export const siteConfig = {
  name: "Bella's Baskett",
  title: "Bella's Baskett — Bespoke Event Styling in Kuala Lumpur",
  description:
    'Bespoke event styling for celebrations, weddings, corporate events, gifts and surprises across Kuala Lumpur and the Klang Valley.',
  whatsappNumber: '60179223552',
  whatsappDisplay: '+60 17 922 3552',
  serviceArea: 'Kuala Lumpur & the Klang Valley',
  socialLinks: [] as Array<{ label: string; href: string }>,
} as const;

export const primaryNavigation = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Packages', href: '/packages' },
  { label: 'Journal', href: '/journal' },
] as const;
