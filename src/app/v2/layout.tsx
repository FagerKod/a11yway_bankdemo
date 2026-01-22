'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VersionProvider } from '@/contexts/VersionContext';
import { VersionDropdown } from '@/components/shared/VersionDropdown';
import { Logo } from '@/components/shared/Logo';
import { V2LoginHeader } from '@/components/layout/v2/LoginHeader';

/**
 * ⚠️ V2 LAYOUT - SEMANTIC HTML BUT INCOMPLETE
 *
 * This layout shows improvement over v1 with semantic HTML:
 *
 * ✅ Uses <header>, <nav>, <main>, <footer> landmarks
 * ✅ Navigation uses proper <a> links
 * ✅ Logo is a proper link
 *
 * Still missing (compared to v3):
 * ❌ No skip link for keyboard navigation
 * ❌ No aria-current on active navigation link
 * ❌ Focus indicators are basic (not as visible)
 */
export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.endsWith('/login');

  const navItems = [
    { href: '/v2/account', label: 'Översikt' },
    { href: '/v2/loan', label: 'Lån' },
    { href: '/v2/settings', label: 'Inställningar' },
    { href: '/v2/login', label: 'Logga ut', isLogout: true },
  ];

  return (
    <VersionProvider>
      {/* ❌ MISSING: No skip link - keyboard users must tab through all nav */}

      {isLoginPage ? (
        // Login page: minimal header with just logo
        <V2LoginHeader />
      ) : (
        // Authenticated pages: full navigation
        // ✅ GOOD: Semantic <header> element
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* ✅ GOOD: Logo is a proper link */}
              <div className="flex items-center gap-4">
                <Link href="/v2/account">
                  <Logo />
                </Link>
                <VersionDropdown />
              </div>

              {/* ✅ GOOD: Semantic <nav> with proper links */}
              {/* ❌ MISSING: No aria-label on nav */}
              <nav>
                <ul className="flex items-center gap-6">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isLogout = 'isLogout' in item && item.isLogout;
                    return (
                      <li key={item.href} className={isLogout ? 'ml-4 pl-4 border-l border-gray-300' : ''}>
                        {/* ✅ GOOD: Using <a> links */}
                        {/* ❌ MISSING: No aria-current for active state */}
                        <Link
                          href={item.href}
                          className={`
                            text-sm font-medium transition-colors
                            ${isActive
                              ? 'text-navy-900 underline underline-offset-4 decoration-2 decoration-navy-700'
                              : 'text-gray-600 hover:text-navy-900'
                            }
                          `}
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

      {/* ✅ GOOD: Semantic <main> element */}
      {/* ❌ MISSING: No id for skip link target */}
      <main className="min-h-[calc(100vh-4rem-4rem)]">{children}</main>

      {/* ✅ GOOD: Semantic <footer> element */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Demobanken. Alla rättigheter förbehållna.
            </p>
            {/* ❌ MISSING: No aria-label on footer nav */}
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link
                    href="/v2/contact"
                    className="text-sm text-gray-500 hover:text-navy-700"
                  >
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link
                    href="/v2/terms"
                    className="text-sm text-gray-500 hover:text-navy-700"
                  >
                    Villkor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/v2/accessibility"
                    className="text-sm text-gray-500 hover:text-navy-700"
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
