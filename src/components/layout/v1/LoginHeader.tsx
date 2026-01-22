'use client';

import { Logo } from '@/components/shared/Logo';
import { VersionDropdown } from '@/components/shared/VersionDropdown';

/**
 * ❌ V1 LOGIN HEADER - ACCESSIBILITY ISSUES
 *
 * This header demonstrates common accessibility anti-patterns:
 *
 * 1. Uses <div> instead of semantic <header> element
 * 2. Logo is a <div> with onclick instead of a proper link
 * 3. No focus indicators (no-focus-visible class)
 */
export function V1LoginHeader() {
  return (
    // ❌ BAD: Using <div> instead of semantic <header>
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* ❌ BAD: Logo should be an <a> link, not a div with onclick */}
          <div className="flex items-center gap-4">
            <div
              className="cursor-pointer no-focus-visible"
              onClick={() => (window.location.href = '/v1/login')}
            >
              <Logo />
            </div>
            <VersionDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}
