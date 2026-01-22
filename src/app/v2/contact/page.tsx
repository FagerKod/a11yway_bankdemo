'use client';

import Link from 'next/link';

export default function V2ContactPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <article className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">Kontakta oss</h1>

          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="font-semibold text-navy-900 mb-2">Kundtjänst</h2>
              <p>Telefon: 0771-123 456</p>
              <p>Vardagar 8:00 - 18:00</p>
            </section>

            <section>
              <h2 className="font-semibold text-navy-900 mb-2">E-post</h2>
              <p>kundtjanst@demobanken.se</p>
            </section>

            <section>
              <h2 className="font-semibold text-navy-900 mb-2">Besöksadress</h2>
              <p>Demobanken AB</p>
              <p>Bankgatan 1</p>
              <p>111 22 Stockholm</p>
            </section>
          </div>

          <nav className="mt-8 pt-6 border-t border-gray-200">
            <Link href="/v2/account" className="text-accent-500 hover:text-accent-600">
              &larr; Tillbaka till kontoöversikt
            </Link>
          </nav>
        </article>

        <aside className="mt-4 p-4 bg-amber-50 rounded-lg text-sm text-amber-800">
          <strong>Demo:</strong> Detta är en simulerad kontaktsida.
        </aside>
      </div>
    </main>
  );
}
