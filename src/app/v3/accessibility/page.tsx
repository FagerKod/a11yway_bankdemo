'use client';

import Link from 'next/link';

export default function V3AccessibilityPage() {
  return (
    <main id="main-content" className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <article className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">Tillgänglighet</h1>

          <div className="space-y-6 text-gray-600">
            <section aria-labelledby="work-heading">
              <h2 id="work-heading" className="font-semibold text-navy-900 mb-2">Vårt tillgänglighetsarbete</h2>
              <p>
                Demobanken arbetar kontinuerligt för att göra våra digitala tjänster
                tillgängliga för alla användare, oavsett funktionsförmåga.
              </p>
            </section>

            <section aria-labelledby="standards-heading">
              <h2 id="standards-heading" className="font-semibold text-navy-900 mb-2">Standarder vi följer</h2>
              <p>
                Vi strävar efter att uppfylla WCAG 2.2 nivå AA. Detta inkluderar
                stöd för tangentbordsnavigering, skärmläsare och andra hjälpmedel.
              </p>
            </section>

            <section aria-labelledby="report-heading">
              <h2 id="report-heading" className="font-semibold text-navy-900 mb-2">Rapportera problem</h2>
              <p>
                Upplever du tillgänglighetsproblem? Kontakta oss på{' '}
                <a
                  href="mailto:tillganglighet@demobanken.se"
                  className="text-accent-500 hover:text-accent-600 focus-ring rounded"
                >
                  tillganglighet@demobanken.se
                </a>
                {' '}så åtgärdar vi det så snart som möjligt.
              </p>
            </section>
          </div>

          <nav aria-label="Tillbaka" className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/v3/account"
              className="text-accent-500 hover:text-accent-600 focus-ring rounded inline-flex items-center gap-1"
            >
              <span aria-hidden="true">&larr;</span>
              Tillbaka till kontoöversikt
            </Link>
          </nav>
        </article>

        <aside className="mt-4 p-4 bg-amber-50 rounded-lg text-sm text-amber-800" role="note">
          <strong>Demo:</strong> Detta är en simulerad tillgänglighetsredogörelse.
        </aside>
      </div>
    </main>
  );
}
