import { describe, expect, it } from 'vitest';

import { emptyDraft } from '@/features/configurator/types';
import { validateStep } from '@/features/configurator/schema';

describe('validateStep', () => {
  it('requires the essential event details on the first step', () => {
    expect(validateStep(0, emptyDraft)).toEqual({
      eventType: 'Choose an event type.',
      date: 'Choose an event date.',
      location: 'Add the event location or area.',
      eventScale: 'Choose an approximate event scale.',
    });
  });

  it('allows inspiration links and notes to remain optional', () => {
    const draft = {
      ...emptyDraft,
      name: 'Amina',
      phone: '0123456789',
    };
    expect(validateStep(3, draft)).toEqual({});
  });
});
