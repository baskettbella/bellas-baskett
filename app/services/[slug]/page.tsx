import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { notFound } from 'next/navigation';

import { EditorialCta } from '@/components/content/editorial-page';
import { getServiceBySlug, services } from '@/content/services';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found' };
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: service.href },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main id="main-content">
      <section className="page-hero">
        <div className="container-shell relative z-10">
          <Link href="/services" className="text-link text-[var(--mauve)]">
            <ArrowLeft size={14} /> All services
          </Link>
          <p className="eyebrow mt-14 text-[var(--mauve)]">{service.eyebrow}</p>
          <h1 className="font-display mt-5 max-w-5xl text-[clamp(4rem,10vw,9rem)] leading-[0.78] tracking-[-0.05em] text-[var(--wine)]">
            {service.title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--mauve)] sm:text-lg">
            {service.description}
          </p>
        </div>
      </section>
      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7 text-base leading-8 text-[var(--mauve)]">
            {service.details.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="border-l border-[var(--champagne)] pl-6 text-sm leading-7">
              Exact inclusions, feasibility and timing are confirmed after your
              event brief is reviewed.
            </div>
          </div>
          <aside className="bg-[var(--mist)] p-8 sm:p-10">
            <p className="eyebrow text-[var(--mauve)]">
              A typical conversation covers
            </p>
            <ul className="mt-7 space-y-4">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-[color:var(--border)] pb-4 text-sm"
                >
                  <Check size={16} className="text-[var(--rose)]" /> {item}
                </li>
              ))}
            </ul>
            <Link
              href="/plan-your-event"
              className="button-primary mt-8 w-full"
            >
              Start your brief <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </section>
      <EditorialCta
        title={`Let’s shape your ${service.title.toLowerCase()}.`}
      />
    </main>
  );
}
