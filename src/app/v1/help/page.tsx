'use client';

/**
 * V1 HELP PAGE - ACCESSIBILITY ISSUES
 *
 * This page demonstrates common accessibility anti-patterns:
 *
 * 1. No semantic structure (no <main>, <article>, <section>)
 * 2. Heading hierarchy is broken
 * 3. Link back to login uses div with onclick
 * 4. No proper focus management
 */
export default function V1HelpPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* BAD: Using div for heading */}
          <div className="text-2xl font-bold text-navy-900 mb-6">
            Hjälp med inloggning
          </div>

          {/* BAD: No semantic structure */}
          <div className="space-y-6 text-gray-600">
            <div>
              <div className="font-semibold text-navy-900 mb-2">Logga in med BankID</div>
              <div>
                För att logga in på Demobanken behöver du BankID. Följ dessa steg:
              </div>
              <div className="mt-2 ml-4">
                1. Ange ditt personnummer i inloggningsformuläret
                <br />
                2. Klicka på &quot;Logga in med BankID&quot;
                <br />
                3. Öppna BankID-appen på din telefon
                <br />
                4. Bekräfta inloggningen i appen
              </div>
            </div>

            <div>
              <div className="font-semibold text-navy-900 mb-2">Har du problem?</div>
              <div>
                Om du har problem med inloggningen kan det bero på:
              </div>
              <div className="mt-2 ml-4">
                - Felaktigt personnummer
                <br />
                - BankID-appen är inte installerad
                <br />
                - Ditt BankID har gått ut
                <br />
                - Tekniska problem med BankID-tjänsten
              </div>
            </div>

            <div>
              <div className="font-semibold text-navy-900 mb-2">Kontakta kundtjänst</div>
              <div>
                Ring oss på 0771-123 456 (vardagar 8-18) eller besök ett av våra kontor.
              </div>
            </div>
          </div>

          {/* BAD: Using div with onclick instead of <a> */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div
              className="text-accent-500 hover:text-accent-600 cursor-pointer"
              onClick={() => (window.location.href = '/v1/login')}
            >
              &larr; Tillbaka till inloggning
            </div>
          </div>
        </div>

        {/* Demo note */}
        <div className="mt-4 p-4 bg-amber-50 rounded-lg text-sm text-amber-800">
          <strong>Demo:</strong> Detta är en simulerad hjälpsida. I en riktig bank skulle det finnas mer detaljerad information och kontaktmöjligheter.
        </div>
      </div>
    </div>
  );
}
