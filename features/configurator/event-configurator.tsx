'use client';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { buildWhatsAppUrl } from '@/features/configurator/build-whatsapp-url';
import { validateStep } from '@/features/configurator/schema';
import type { EventDraft } from '@/features/configurator/types';
import {
  storageKey,
  useSessionDraft,
} from '@/features/configurator/use-session-draft';
import { useHydrated } from '@/hooks/use-hydrated';

const stepNames = ['Event', 'Atmosphere', 'Services', 'Contact', 'Review'];
const serviceOptions = [
  'Creative direction',
  'Decor and focal styling',
  'Tablescape',
  'Corporate or brand styling',
  'Gift basket',
  'Surprise set-up',
  'Not sure — please guide me',
];

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-2 text-xs font-semibold text-[#9a342e]">
      {message}
    </p>
  ) : null;
}

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-bold uppercase tracking-[0.13em] text-[var(--wine)]"
    >
      {children}
    </label>
  );
}

export function EventConfigurator() {
  const { draft, setDraft, reset } = useSessionDraft();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isHydrated = useHydrated();

  const update = <Key extends keyof EventDraft>(
    key: Key,
    value: EventDraft[Key],
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };

  const next = () => {
    const nextErrors = validateStep(step, draft);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, stepNames.length - 1));
  };

  const resetAll = () => {
    reset();
    setErrors({});
    setStep(0);
  };

  return (
    <section
      className="bg-[var(--mist)] p-5 sm:p-9 lg:p-12"
      aria-labelledby="configurator-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--border)] pb-6">
        <div>
          <p className="eyebrow text-[var(--mauve)]">
            Step {step + 1} of {stepNames.length}
          </p>
          <p className="mt-2 text-sm text-[var(--mauve)]">
            Your draft stays in this browser session only.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={resetAll}
          disabled={!isHydrated}
          className="min-h-11 gap-2 text-xs uppercase tracking-wider"
        >
          <RotateCcw size={14} /> Reset draft
        </Button>
      </div>

      <fieldset disabled={!isHydrated} className="contents">
        <ol
          className="mt-6 grid grid-cols-5 gap-2"
          aria-label="Event planning progress"
        >
          {stepNames.map((name, index) => (
            <li key={name} className="min-w-0">
              <div
                className={`h-1 ${index <= step ? 'bg-[var(--wine)]' : 'bg-[var(--blush)]'}`}
              />
              <span
                className={`mt-2 hidden text-[0.62rem] uppercase tracking-wider sm:block ${index === step ? 'font-bold text-[var(--wine)]' : 'text-[var(--mauve)]'}`}
              >
                {name}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 min-h-[32rem]">
          {step === 0 ? (
            <div>
              <p className="eyebrow text-[var(--rose)]">
                The practical beginning
              </p>
              <h2
                id="configurator-title"
                className="font-display mt-3 text-4xl text-[var(--wine)] sm:text-5xl"
              >
                Tell us about your event
              </h2>
              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="eventType">Event type</Label>
                  <NativeSelect
                    id="eventType"
                    value={draft.eventType}
                    onChange={(event) =>
                      update('eventType', event.target.value)
                    }
                    aria-invalid={Boolean(errors.eventType)}
                    aria-describedby={
                      errors.eventType ? 'eventType-error' : undefined
                    }
                    className="w-full"
                  >
                    <NativeSelectOption value="">Choose one</NativeSelectOption>
                    {[
                      'Birthday',
                      'Wedding',
                      'Social event',
                      'Corporate event',
                      'Gift',
                      'Surprise set-up',
                      'Other',
                    ].map((option) => (
                      <NativeSelectOption key={option} value={option}>
                        {option}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <ErrorMessage
                    id="eventType-error"
                    message={errors.eventType}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Event date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={draft.date}
                    onChange={(event) => update('date', event.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? 'date-error' : undefined}
                    className="h-11"
                  />
                  <ErrorMessage id="date-error" message={errors.date} />
                </div>
                <div>
                  <Label htmlFor="location">Location or area</Label>
                  <Input
                    id="location"
                    value={draft.location}
                    onChange={(event) => update('location', event.target.value)}
                    placeholder="Venue or neighbourhood"
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={
                      errors.location ? 'location-error' : undefined
                    }
                    className="h-11"
                  />
                  <ErrorMessage id="location-error" message={errors.location} />
                </div>
                <div>
                  <Label htmlFor="eventScale">Event scale</Label>
                  <NativeSelect
                    id="eventScale"
                    value={draft.eventScale}
                    onChange={(event) =>
                      update('eventScale', event.target.value)
                    }
                    aria-invalid={Boolean(errors.eventScale)}
                    aria-describedby={
                      errors.eventScale ? 'eventScale-error' : undefined
                    }
                    className="w-full"
                  >
                    <NativeSelectOption value="">
                      Choose an estimate
                    </NativeSelectOption>
                    {[
                      'Private set-up / no guests',
                      'Up to 20 guests',
                      '21–50 guests',
                      '51–100 guests',
                      'More than 100 guests',
                      'Not sure yet',
                    ].map((option) => (
                      <NativeSelectOption key={option} value={option}>
                        {option}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <ErrorMessage
                    id="eventScale-error"
                    message={errors.eventScale}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <p className="eyebrow text-[var(--rose)]">Creative direction</p>
              <h2
                id="configurator-title"
                className="font-display mt-3 text-4xl text-[var(--wine)] sm:text-5xl"
              >
                Shape the atmosphere
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--mauve)]">
                Use your own words. A feeling is often more useful than a trend
                name.
              </p>
              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="style">Style or feeling</Label>
                  <Textarea
                    id="style"
                    value={draft.style}
                    onChange={(event) => update('style', event.target.value)}
                    placeholder="For example: romantic, intimate and softly modern"
                    aria-invalid={Boolean(errors.style)}
                    aria-describedby={errors.style ? 'style-error' : undefined}
                    className="min-h-36"
                  />
                  <ErrorMessage id="style-error" message={errors.style} />
                </div>
                <div>
                  <Label htmlFor="colourDirection">Colour direction</Label>
                  <Textarea
                    id="colourDirection"
                    value={draft.colourDirection}
                    onChange={(event) =>
                      update('colourDirection', event.target.value)
                    }
                    placeholder="Colours you love, dislike or are open to"
                    aria-invalid={Boolean(errors.colourDirection)}
                    aria-describedby={
                      errors.colourDirection
                        ? 'colourDirection-error'
                        : undefined
                    }
                    className="min-h-36"
                  />
                  <ErrorMessage
                    id="colourDirection-error"
                    message={errors.colourDirection}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <p className="eyebrow text-[var(--rose)]">Scope & priorities</p>
              <h2
                id="configurator-title"
                className="font-display mt-3 text-4xl text-[var(--wine)] sm:text-5xl"
              >
                What would you like help with?
              </h2>
              <fieldset className="mt-9">
                <legend className="text-xs font-bold uppercase tracking-[0.13em] text-[var(--wine)]">
                  Required services
                </legend>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {serviceOptions.map((option) => {
                    const checked = draft.services.includes(option);
                    return (
                      <label
                        key={option}
                        className={`flex min-h-14 cursor-pointer items-center gap-3 border p-4 text-sm transition-colors ${checked ? 'border-[var(--wine)] bg-[var(--blush)]/45' : 'border-[color:var(--border)]'}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            update(
                              'services',
                              checked
                                ? draft.services.filter(
                                    (item) => item !== option,
                                  )
                                : [...draft.services, option],
                            )
                          }
                          className="size-4 accent-[var(--wine)]"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
                <ErrorMessage id="services-error" message={errors.services} />
              </fieldset>
              <div className="mt-7 max-w-md">
                <Label htmlFor="budgetPreference">Budget preference</Label>
                <NativeSelect
                  id="budgetPreference"
                  value={draft.budgetPreference}
                  onChange={(event) =>
                    update('budgetPreference', event.target.value)
                  }
                  aria-invalid={Boolean(errors.budgetPreference)}
                  aria-describedby={
                    errors.budgetPreference
                      ? 'budgetPreference-error'
                      : undefined
                  }
                  className="w-full"
                >
                  <NativeSelectOption value="">Choose one</NativeSelectOption>
                  {[
                    'Please guide me',
                    'I have a working range',
                    'I am still exploring priorities',
                  ].map((option) => (
                    <NativeSelectOption key={option} value={option}>
                      {option}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                <ErrorMessage
                  id="budgetPreference-error"
                  message={errors.budgetPreference}
                />
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <p className="eyebrow text-[var(--rose)]">
                Inspiration & contact
              </p>
              <h2
                id="configurator-title"
                className="font-display mt-3 text-4xl text-[var(--wine)] sm:text-5xl"
              >
                Add anything that helps us see it
              </h2>
              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="referenceLinks">
                    Reference links{' '}
                    <span className="normal-case tracking-normal text-[var(--mauve)]">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="referenceLinks"
                    value={draft.referenceLinks}
                    onChange={(event) =>
                      update('referenceLinks', event.target.value)
                    }
                    placeholder="Paste Pinterest, Instagram or other public links"
                    className="min-h-24"
                  />
                  <p className="mt-2 text-xs leading-5 text-[var(--mauve)]">
                    No files are uploaded. You can send images after the
                    WhatsApp conversation begins.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="notes">
                    Anything else{' '}
                    <span className="normal-case tracking-normal text-[var(--mauve)]">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="notes"
                    value={draft.notes}
                    onChange={(event) => update('notes', event.target.value)}
                    placeholder="Venue access, priorities, timing or ideas worth knowing"
                    className="min-h-28"
                  />
                </div>
                <div>
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={draft.name}
                    onChange={(event) => update('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className="h-11"
                  />
                  <ErrorMessage id="name-error" message={errors.name} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={draft.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className="h-11"
                  />
                  <ErrorMessage id="phone-error" message={errors.phone} />
                </div>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <p className="eyebrow text-[var(--rose)]">Review your brief</p>
              <h2
                id="configurator-title"
                className="font-display mt-3 text-4xl text-[var(--wine)] sm:text-5xl"
              >
                Everything looks ready
              </h2>
              <dl className="mt-9 grid gap-x-10 gap-y-5 border-y border-[color:var(--border)] py-7 sm:grid-cols-2">
                {[
                  ['Event', draft.eventType],
                  ['Date', draft.date],
                  ['Location', draft.location],
                  ['Scale', draft.eventScale],
                  ['Style', draft.style],
                  ['Colours', draft.colourDirection],
                  ['Services', draft.services.join(', ')],
                  ['Budget', draft.budgetPreference],
                  ['Name', draft.name],
                  ['Phone', draft.phone],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="eyebrow text-[var(--mauve)]">{label}</dt>
                    <dd className="mt-1 text-sm leading-6 text-[var(--wine)]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex gap-3 bg-[var(--blush)]/40 p-5 text-sm leading-7 text-[var(--wine)]">
                <ShieldCheck className="mt-1 shrink-0" size={19} />
                <p>
                  This website has not submitted or stored your enquiry.
                  Continue to WhatsApp, review the prepared message there, and
                  choose Send to complete your enquiry.
                </p>
              </div>
              <a
                href={buildWhatsAppUrl(draft)}
                target="_blank"
                rel="noreferrer"
                className="button-primary mt-8"
                onClick={() => window.sessionStorage.removeItem(storageKey)}
              >
                Continue to WhatsApp <ExternalLink size={15} />
              </a>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[color:var(--border)] pt-6">
          {step > 0 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((current) => current - 1)}
              className="min-h-11 gap-2 px-3 text-xs uppercase tracking-wider"
            >
              <ArrowLeft size={14} /> Back
            </Button>
          ) : (
            <span />
          )}
          {step < stepNames.length - 1 ? (
            <Button
              type="button"
              onClick={next}
              className="min-h-11 gap-2 bg-[var(--wine)] px-5 text-xs uppercase tracking-wider text-[var(--mist)] hover:bg-[var(--cocoa)]"
            >
              Next step <ArrowRight size={14} />
            </Button>
          ) : (
            <span className="flex items-center gap-2 text-xs font-semibold text-[var(--mauve)]">
              <Check size={14} /> Brief reviewed
            </span>
          )}
        </div>
      </fieldset>
    </section>
  );
}
