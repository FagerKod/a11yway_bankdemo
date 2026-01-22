'use client';

import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { VersionDropdown } from '@/components/shared/VersionDropdown';

/**
 * ✅ V3 LOGIN HEADER - FULLY ACCESSIBLE
 *
 * This header demonstrates accessibility best practices:
 *
 * 1. Uses semantic <header> element
 * 2. Logo is a proper <Link> with aria-label
 * 3. Visible focus indicator on logo link
 */
export function V3LoginHeader() {
  return (
    // ✅ GOOD: Semantic <header> element
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* ✅ GOOD: Logo as proper link with aria-label */}
          <div className="flex items-center gap-4">
            <Link
              href="/v3/login"
              className="focus-ring rounded-lg"
              aria-label="Demobanken"
            >
              <Logo />
            </Link>
            <VersionDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
