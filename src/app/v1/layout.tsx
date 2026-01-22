'use client';

import { usePathname } from 'next/navigation';
import { VersionProvider } from '@/contexts/VersionContext';
import { VersionDropdown } from '@/components/shared/VersionDropdown';
import { Logo } from '@/components/shared/Logo';
import { V1LoginHeader } from '@/components/layout/v1/LoginHeader';

/**
 * ❌ V1 LAYOUT - ACCESSIBILITY ISSUES
 *
 * This layout demonstrates common accessibility anti-patterns:
 *
 * 1. No skip link - keyboard users must tab through all navigation
 * 2. Uses <div> for navigation instead of <nav> - no landmark
 * 3. Logo link uses <div> with onclick instead of <a>
 * 4. No semantic structure (<header>, <main>, <footer>)
 * 5. Navigation items are divs with onclick, not proper links
 */
export default function V1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname.endsWith('/login');

  return (
    <VersionProvider>
      {/* ❌ BAD: No skip link for keyboard users */}

      {isLoginPage ? (
        // Login page: minimal header with just logo
        <V1LoginHeader />
      ) : (
        // Authenticated pages: full navigation
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* ❌ BAD: Logo should be an <a> link, not a div with onclick */}
              <div className="flex items-center gap-4">
                <div
                  className="cursor-pointer"
                  onClick={() => (window.location.href = '/v1/account')}
                >
                  <Logo />
                </div>
                <VersionDropdown />
              </div>

              {/* ❌ BAD: Navigation using divs instead of <nav> with <a> links */}
              <div className="flex items-center gap-6">
                <div
                  className={`cursor-pointer no-focus-visible ${
                    pathname === '/v1/account'
                      ? 'text-navy-900 underline underline-offset-4 decoration-2 decoration-navy-700'
                      : 'text-gray-600 hover:text-navy-900'
                  }`}
                  onClick={() => (window.location.href = '/v1/account')}
                >
                  Översikt
                </div>
                <div
                  className={`cursor-pointer no-focus-visible ${
                    pathname === '/v1/loan'
                      ? 'text-navy-900 underline underline-offset-4 decoration-2 decoration-navy-700'
                      : 'text-gray-600 hover:text-navy-900'
                  }`}
                  onClick={() => (window.location.href = '/v1/loan')}
                >
                  Lån
                </div>
                <div
                  className={`cursor-pointer no-focus-visible ${
                    pathname === '/v1/settings'
                      ? 'text-navy-900 underline underline-offset-4 decoration-2 decoration-navy-700'
                      : 'text-gray-600 hover:text-navy-900'
                  }`}
                  onClick={() => (window.location.href = '/v1/settings')}
                >
                  Inställningar
                </div>
                <div
                  className="text-gray-600 hover:text-navy-900 cursor-pointer no-focus-visible ml-4 pl-4 border-l border-gray-300"
                  onClick={() => (window.location.href = '/v1/login')}
                >
                  Logga ut
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ❌ BAD: No <main> landmark */}
      <div className="min-h-[calc(100vh-4rem-4rem)]">{children}</div>

      {/* ❌ BAD: Footer uses div instead of <footer> */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © 2024 Demobanken. Alla rättigheter förbehållna.
            </div>
            <div className="flex gap-6">
              <div
                className="text-sm text-gray-500 hover:text-navy-700 cursor-pointer"
                onClick={() => {}}
              >
                Kontakt
              </div>
              <div
                className="text-sm text-gray-500 hover:text-navy-700 cursor-pointer"
                onClick={() => {}}
              >
                Villkor
              </div>
              <div
                className="text-sm text-gray-500 hover:text-navy-700 cursor-pointer"
                onClick={() => {}}
              >
                Tillgänglighet
              </div>
            </div>
          </div>
        </div>
      </div>

    </VersionProvider>
  );
}
