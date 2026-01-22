'use client';

import Link from 'next/link';

/**
 * V2 HELP PAGE - SEMANTIC HTML BUT INCOMPLETE
 *
 * This page shows improvement with semantic HTML:
 *
 * GOOD: Uses <main>, <article>, <h1>, <h2>
 * GOOD: Proper link element
 * GOOD: Lists use <ul>/<ol>
 *
 * Still missing (compared to v3):
 * - No skip link target
 * - Basic focus indicators
 */
export default function V2HelpPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <article className="bg-white rounded-xl shadow-sm p-8">
          {/* GOOD: Proper heading hierarchy */}
          <h1 className="text-2xl font-bold text-navy-900 mb-6">
            Hjälp med inloggning
          </h1>

          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="font-semibold text-navy-900 mb-2">Logga in med BankID</h2>
              <p>
                För att logga in på Demobanken behöver du BankID. Följ dessa steg:
              </p>
              {/* GOOD: Using ordered list */}
              <ol className="mt-2 ml-4 list-decimal list-inside space-y-1">
                <li>Ange ditt personnummer i inloggningsformuläret</li>
                <li>Klicka på &quot;Logga in med BankID&quot;</li>
                <li>Öppna BankID-appen på din telefon</li>
                <li>Bekräfta inloggningen i appen</li>
              </ol>
            </section>

            <section>
              <h2 className="font-semibold text-navy-900 mb-2">Har du problem?</h2>
              <p>
                Om du har problem med inloggningen kan det bero på:
              </p>
              {/* GOOD: Using unordered list */}
              <ul className="mt-2 ml-4 list-disc list-inside space-y-1">
                <li>Felaktigt personnummer</li>
                <li>BankID-appen är inte installerad</li>
                <li>Ditt BankID har gått ut</li>
                <li>Tekniska problem med BankID-tjänsten</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-navy-900 mb-2">Kontakta kundtjänst</h2>
              <p>
                Ring oss på 0771-123 456 (vardagar 8-18) eller besök ett av våra kontor.
              </p>
            </section>
          </div>

          {/* GOOD: Proper link element */}
          <nav className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/v2/login"
              className="text-accent-500 hover:text-accent-600"
            >
              &larr; Tillbaka till inloggning
            </Link>
          </nav>
        </article>

        {/* Demo note */}
        <aside className="mt-4 p-4 bg-amber-50 rounded-lg text-sm text-amber-800">
          <strong>Demo:</strong> Detta är en simulerad hjälpsida. I en riktig bank skulle det finnas mer detaljerad information och kontaktmöjligheter.
        </aside>
      </div>
    </main>
  );
}
