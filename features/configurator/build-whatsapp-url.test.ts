import { describe, expect, it } from 'vitest';

import { buildWhatsAppUrl } from '@/features/configurator/build-whatsapp-url';
import type { EventDraft } from '@/features/configurator/types';

const completeDraft: EventDraft = {
  eventType: 'Wedding',
  date: '2026-12-12',
  location: 'Kuala Lumpur',
  eventScale: '51–100 guests',
  style: 'Romantic and refined',
  colourDirection: 'Blush, ivory and sage',
  services: ['Creative direction', 'Tablescape'],
  budgetPreference: 'Please guide me',
  referenceLinks: 'https://example.com/mood',
  notes: 'An intimate evening reception.',
  name: 'Amina',
  phone: '0123456789',
};

describe('buildWhatsAppUrl', () => {
  it('creates an encoded enquiry for the confirmed WhatsApp number', () => {
    const url = buildWhatsAppUrl(completeDraft);
    expect(url).toMatch(/^https:\/\/wa\.me\/60179223552\?text=/);
    const message = decodeURIComponent(url.split('?text=')[1]);
    expect(message).toContain('Event type: Wedding');
    expect(message).toContain('Services: Creative direction, Tablescape');
    expect(message).toContain('Name: Amina');
    expect(message).not.toMatch(/reference number/i);
  });

  it('does not print empty optional fields', () => {
    const url = buildWhatsAppUrl({
      ...completeDraft,
      referenceLinks: '',
      notes: '',
    });
    const message = decodeURIComponent(url.split('?text=')[1]);
    expect(message).not.toContain('Reference links:');
    expect(message).not.toContain('Notes:');
  });
});
