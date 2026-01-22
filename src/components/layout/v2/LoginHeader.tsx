'use client';

import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { VersionDropdown } from '@/components/shared/VersionDropdown';

/**
 * ⚠️ V2 LOGIN HEADER - SEMANTIC HTML BUT INCOMPLETE
 *
 * This header shows improvement over v1 with semantic HTML:
 *
 * ✅ Uses <header> element
 * ✅ Logo is a proper <Link>
 *
 * Still missing (compared to v3):
 * ❌ No aria-label on logo link
 * ❌ Focus indicators are basic (not as visible)
 */
export function V2LoginHeader() {
  return (
    // ✅ GOOD: Semantic <header> element
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* ✅ GOOD: Logo is a proper link */}
          <div className="flex items-center gap-4">
            <Link href="/v2/login">
              <Logo />
            </Link>
            <VersionDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
