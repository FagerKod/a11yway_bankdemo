'use client';

import Link from 'next/link';

/**
 * V3 HELP PAGE - FULLY ACCESSIBLE
 *
 * This page demonstrates accessibility best practices:
 *
 * 1. Proper semantic structure (<main>, <article>, <section>)
 * 2. Correct heading hierarchy (h1 > h2)
 * 3. Proper link with focus indicator
 * 4. Lists use appropriate elements
 * 5. ARIA landmarks for screen readers
 * 6. Focus-visible styling on interactive elements
 */
export default function V3HelpPage() {
  return (
    <main id="main-content" className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <article className="bg-white rounded-xl shadow-sm p-8">
          {/* GOOD: Proper heading hierarchy */}
          <h1 className="text-2xl font-bold text-navy-900 mb-6">
            Hjälp med inloggning
          </h1>

          <div className="space-y-6 text-gray-600">
            <section aria-labelledby="bankid-heading">
              <h2 id="bankid-heading" className="font-semibold text-navy-900 mb-2">
                Logga in med BankID
              </h2>
              <p>
                För att logga in på Demobanken behöver du BankID. Följ dessa steg:
              </p>
              {/* GOOD: Ordered list for sequential steps */}
              <ol className="mt-2 ml-4 list-decimal list-inside space-y-1">
                <li>Ange ditt personnummer i inloggningsformuläret</li>
                <li>Klicka på &quot;Logga in med BankID&quot;</li>
                <li>Öppna BankID-appen på din telefon</li>
                <li>Bekräfta inloggningen i appen</li>
              </ol>
            </section>

            <section aria-labelledby="problems-heading">
              <h2 id="problems-heading" className="font-semibold text-navy-900 mb-2">
                Har du problem?
              </h2>
              <p>
                Om du har problem med inloggningen kan det bero på:
              </p>
              {/* GOOD: Unordered list for non-sequential items */}
              <ul className="mt-2 ml-4 list-disc list-inside space-y-1">
                <li>Felaktigt personnummer</li>
                <li>BankID-appen är inte installerad</li>
                <li>Ditt BankID har gått ut</li>
                <li>Tekniska problem med BankID-tjänsten</li>
              </ul>
            </section>

            <section aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="font-semibold text-navy-900 mb-2">
                Kontakta kundtjänst
              </h2>
              <p>
                Ring oss på{' '}
                <a
                  href="tel:0771123456"
                  className="text-accent-500 hover:text-accent-600 focus-ring rounded"
                >
                  0771-123 456
                </a>{' '}
                (vardagar 8-18) eller besök ett av våra kontor.
              </p>
            </section>
          </div>

          {/* GOOD: Proper link with focus indicator */}
          <nav aria-label="Tillbaka" className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/v3/login"
              className="text-accent-500 hover:text-accent-600 focus-ring rounded inline-flex items-center gap-1"
            >
              <span aria-hidden="true">&larr;</span>
              Tillbaka till inloggning
            </Link>
          </nav>
        </article>

        {/* Demo note */}
        <aside className="mt-4 p-4 bg-amber-50 rounded-lg text-sm text-amber-800" role="note">
          <strong>Demo:</strong> Detta är en simulerad hjälpsida. I en riktig bank skulle det finnas mer detaljerad information och kontaktmöjligheter.
        </aside>
      </div>
    </main>
  );
}
