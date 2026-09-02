import type { EventDraft } from '@/features/configurator/types';

export function buildWhatsAppUrl(_draft: EventDraft) {
  const draft = _draft;
  const lines = [
    "Hello Bella's Baskett, I would like to enquire about event styling.",
    '',
    `Event type: ${draft.eventType}`,
    `Event date: ${draft.date}`,
    `Location: ${draft.location}`,
    `Event scale: ${draft.eventScale}`,
    `Style direction: ${draft.style}`,
    `Colour direction: ${draft.colourDirection}`,
    `Services: ${draft.services.join(', ')}`,
    `Budget preference: ${draft.budgetPreference}`,
    ...(draft.referenceLinks.trim()
      ? [`Reference links: ${draft.referenceLinks.trim()}`]
      : []),
    ...(draft.notes.trim() ? [`Notes: ${draft.notes.trim()}`] : []),
    '',
    `Name: ${draft.name}`,
    `Phone: ${draft.phone}`,
  ];

  return `https://wa.me/60179223552?text=${encodeURIComponent(lines.join('\n'))}`;
}
