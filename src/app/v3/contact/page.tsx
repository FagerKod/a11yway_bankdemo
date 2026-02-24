'use client';

import Link from 'next/link';

export default function V3ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <article className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">Kontakta oss</h1>

          <div className="space-y-6 text-gray-600">
            <section aria-labelledby="phone-heading">
              <h2 id="phone-heading" className="font-semibold text-navy-900 mb-2">Kundtjänst</h2>
              <p>
                Telefon:{' '}
                <a
                  href="tel:0771123456"
                  className="text-accent-500 hover:text-accent-600 focus-ring rounded"
                >
                  0771-123 456
                </a>
              </p>
              <p>Vardagar 8:00 - 18:00</p>
            </section>

            <section aria-labelledby="email-heading">
              <h2 id="email-heading" className="font-semibold text-navy-900 mb-2">E-post</h2>
              <p>
                <a
                  href="mailto:kundtjanst@demobanken.se"
                  className="text-accent-500 hover:text-accent-600 focus-ring rounded"
                >
                  kundtjanst@demobanken.se
                </a>
              </p>
            </section>

            <section aria-labelledby="address-heading">
              <h2 id="address-heading" className="font-semibold text-navy-900 mb-2">Besöksadress</h2>
              <address className="not-italic">
                <p>Demobanken AB</p>
                <p>Bankgatan 1</p>
                <p>111 22 Stockholm</p>
              </address>
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
          <strong>Demo:</strong> Detta är en simulerad kontaktsida.
        </aside>
      </div>
    </div>
  );
}
