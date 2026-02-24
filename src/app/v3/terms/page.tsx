'use client';

import Link from 'next/link';

export default function V3TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <article className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">Villkor</h1>

          <div className="space-y-6 text-gray-600">
            <section aria-labelledby="general-heading">
              <h2 id="general-heading" className="font-semibold text-navy-900 mb-2">Allmänna villkor</h2>
              <p>
                Dessa villkor gäller för användning av Demobankens tjänster.
                Genom att använda våra tjänster godkänner du dessa villkor.
              </p>
            </section>

            <section aria-labelledby="responsibility-heading">
              <h2 id="responsibility-heading" className="font-semibold text-navy-900 mb-2">Ansvar</h2>
              <p>
                Demobanken ansvarar för att tillhandahålla säkra och tillgängliga
                banktjänster. Användaren ansvarar för att skydda sina inloggningsuppgifter.
              </p>
            </section>

            <section aria-labelledby="privacy-heading">
              <h2 id="privacy-heading" className="font-semibold text-navy-900 mb-2">Personuppgifter</h2>
              <p>
                Vi behandlar personuppgifter i enlighet med GDPR.
                Läs vår integritetspolicy för mer information.
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
          <strong>Demo:</strong> Detta är simulerade villkor.
        </aside>
      </div>
    </div>
  );
}
