export type EventDraft = {
  eventType: string;
  date: string;
  location: string;
  eventScale: string;
  style: string;
  colourDirection: string;
  services: string[];
  budgetPreference: string;
  referenceLinks: string;
  notes: string;
  name: string;
  phone: string;
};

export const emptyDraft: EventDraft = {
  eventType: '',
  date: '',
  location: '',
  eventScale: '',
  style: '',
  colourDirection: '',
  services: [],
  budgetPreference: '',
  referenceLinks: '',
  notes: '',
  name: '',
  phone: '',
};
