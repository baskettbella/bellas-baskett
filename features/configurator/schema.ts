import type { EventDraft } from '@/features/configurator/types';

export function validateStep(step: number, draft: EventDraft) {
  const errors: Record<string, string> = {};

  if (step === 0) {
    if (!draft.eventType) errors.eventType = 'Choose an event type.';
    if (!draft.date) errors.date = 'Choose an event date.';
    if (!draft.location.trim())
      errors.location = 'Add the event location or area.';
    if (!draft.eventScale)
      errors.eventScale = 'Choose an approximate event scale.';
  }

  if (step === 1) {
    if (!draft.style.trim())
      errors.style = 'Describe the atmosphere you have in mind.';
    if (!draft.colourDirection.trim())
      errors.colourDirection = 'Add a colour direction, even if it is open.';
  }

  if (step === 2) {
    if (draft.services.length === 0)
      errors.services = 'Choose at least one service area.';
    if (!draft.budgetPreference)
      errors.budgetPreference = 'Choose a budget preference.';
  }

  if (step === 3) {
    if (!draft.name.trim()) errors.name = 'Add your name.';
    if (!/^[+\d][\d\s-]{7,}$/.test(draft.phone.trim())) {
      errors.phone = 'Add a valid phone number.';
    }
  }

  return errors;
}
