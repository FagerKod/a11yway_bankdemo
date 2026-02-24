'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VersionProvider } from '@/contexts/VersionContext';
import { VersionDropdown } from '@/components/shared/VersionDropdown';
import { Logo } from '@/components/shared/Logo';
import { V3LoginHeader } from '@/components/layout/v3/LoginHeader';

/**
 * ✅ V3 LAYOUT - FULLY ACCESSIBLE
 *
 * This layout demonstrates accessibility best practices:
 *
 * 1. Skip link for keyboard users to bypass navigation
 * 2. Semantic HTML: <header>, <nav>, <main>, <footer>
 * 3. Navigation uses proper <a> links with aria-current
 * 4. Logo is a proper link with accessible name
 * 5. Visible focus indicators on all interactive elements
 * 6. Proper landmark structure for screen readers
 */
export default function V3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.endsWith('/login');

  const navItems = [
    { href: '/v3/account', label: 'Översikt' },
    { href: '/v3/loan', label: 'Lån' },
    { href: '/v3/settings', label: 'Inställningar' },
    { href: '/v3/login', label: 'Logga ut', isLogout: true },
  ];

  return (
    <VersionProvider>
      {/* ✅ GOOD: Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-navy-700 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
      >
        Hoppa till huvudinnehåll
      </a>

      {isLoginPage ? (
        // Login page: minimal header with just logo
        <V3LoginHeader />
      ) : (
        // Authenticated pages: full navigation
        // ✅ GOOD: Semantic <header> element
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* ✅ GOOD: Logo as proper link with Next.js Link component */}
              <div className="flex items-center gap-4">
                <Link
                  href="/v3/account"
                  className="focus-ring rounded-lg"
                  aria-label="Demobanken - Till startsidan"
                >
                  <Logo />
                </Link>
                <VersionDropdown />
              </div>

              {/* ✅ GOOD: Semantic <nav> with proper links and aria-current */}
              <nav aria-label="Huvudnavigation">
                <ul className="flex items-center gap-6" role="list">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isLogout = 'isLogout' in item && item.isLogout;
                    return (
                      <li key={item.href} className={isLogout ? 'ml-4 pl-4 border-l border-gray-300' : ''}>
                        <Link
                          href={item.href}
                          className={`
                            text-sm font-medium transition-colors focus-ring rounded-lg px-2 py-1
                            ${isActive
                              ? 'text-navy-900 underline underline-offset-4 decoration-2 decoration-navy-700'
                              : 'text-gray-600 hover:text-navy-900'
                            }
                          `}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* ✅ GOOD: Semantic <main> element with id for skip link */}
      <main id="main-content" className="min-h-[calc(100vh-4rem-4rem)]">
        {children}
      </main>

      {/* ✅ GOOD: Semantic <footer> element */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Demobanken. Alla rättigheter förbehållna.
            </p>
            <nav aria-label="Sidfot">
              <ul className="flex gap-6" role="list">
                <li>
                  <Link
                    href="/v3/contact"
                    className="text-sm text-gray-600 hover:text-navy-700 focus-ring rounded"
                  >
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/v3/terms"
                    className="text-sm text-gray-600 hover:text-navy-700 focus-ring rounded"
                  >
                    Villkor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/v3/accessibility"
                    className="text-sm text-gray-600 hover:text-navy-700 focus-ring rounded"
                  >
                    Tillgänglighet
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>

    </VersionProvider>
  );
}
