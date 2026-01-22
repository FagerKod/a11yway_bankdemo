'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type Version = 'v1' | 'v2' | 'v3';

interface VersionInfo {
  label: string;
  shortLabel: string;
  description: string;
  color: string;
}

export const versionMeta: Record<Version, VersionInfo> = {
  v1: {
    label: 'Version 1',
    shortLabel: 'V1',
    description: 'Otillgänglig - Visar vanliga tillgänglighetsproblem',
    color: 'bg-red-500',
  },
  v2: {
    label: 'Version 2',
    shortLabel: 'V2',
    description: 'Semantisk - Korrekt HTML men saknar ARIA',
    color: 'bg-yellow-500',
  },
  v3: {
    label: 'Version 3',
    shortLabel: 'V3',
    description: 'Tillgänglig - Fullt tillgänglig enligt WCAG 2.2 AA',
    color: 'bg-green-500',
  },
};

interface VersionContextType {
  version: Version;
  versionInfo: VersionInfo;
  switchVersion: (newVersion: Version) => void;
  getCurrentPath: () => string;
}

const VersionContext = createContext<VersionContextType | null>(null);

export function VersionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract version from pathname (e.g., /v1/login -> v1)
  const versionMatch = pathname.match(/^\/(v[123])\//);
  const version: Version = (versionMatch?.[1] as Version) || 'v1';

  // Get the current page path without version prefix
  const getCurrentPath = () => {
    return pathname.replace(/^\/v[123]/, '') || '/login';
  };

  // Switch to a different version while staying on the same page
  const switchVersion = (newVersion: Version) => {
    const currentPath = getCurrentPath();
    router.push(`/${newVersion}${currentPath}`);
  };

  const value: VersionContextType = {
    version,
    versionInfo: versionMeta[version],
    switchVersion,
    getCurrentPath,
  };

  return (
    <VersionContext.Provider value={value}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
}
