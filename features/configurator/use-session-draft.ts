'use client';

import { useEffect, useState } from 'react';

import { emptyDraft, type EventDraft } from '@/features/configurator/types';

export const storageKey = 'bellas-baskett-event-draft:v1';

export function useSessionDraft() {
  const [draft, setDraft] = useState<EventDraft>(emptyDraft);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;
    const saved = window.sessionStorage.getItem(storageKey);
    let nextDraft = emptyDraft;
    if (saved) {
      try {
        nextDraft = {
          ...emptyDraft,
          ...(JSON.parse(saved) as Partial<EventDraft>),
        };
      } catch {
        window.sessionStorage.removeItem(storageKey);
      }
    }
    queueMicrotask(() => {
      if (active) {
        setDraft(nextDraft);
        setIsReady(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isReady)
      window.sessionStorage.setItem(storageKey, JSON.stringify(draft));
  }, [draft, isReady]);

  const reset = () => {
    window.sessionStorage.removeItem(storageKey);
    setDraft(emptyDraft);
  };

  return { draft, setDraft, reset };
}
