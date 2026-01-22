'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useVersion, Version, versionMeta } from '@/contexts/VersionContext';

const versions: Version[] = ['v1', 'v2', 'v3'];

/**
 * Version Dropdown Component
 *
 * This component is ALWAYS accessible regardless of which version is being viewed.
 * It's a teaching tool UI element, not part of the bank demo itself.
 *
 * Features:
 * - Dropdown button showing current version
 * - Shows all three versions with their descriptions
 * - Fully keyboard accessible (Enter/Space to toggle, Escape to close, arrow keys)
 * - Click outside to close
 * - Responsive on all screen sizes
 */
export function VersionDropdown() {
  const { version, switchVersion, versionInfo } = useVersion();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % versions.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + versions.length) % versions.length);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0) {
          switchVersion(versions[focusedIndex]);
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  }, [isOpen, focusedIndex, switchVersion]);

  // Focus the appropriate item when focusedIndex changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const buttons = dropdownRef.current?.querySelectorAll('[role="menuitem"]');
      if (buttons && buttons[focusedIndex]) {
        (buttons[focusedIndex] as HTMLElement).focus();
      }
    }
  }, [focusedIndex, isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown trigger button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="
          flex items-center gap-2 px-3 py-1.5
          bg-gray-100 hover:bg-gray-200
          border border-gray-200 rounded-lg
          transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2
        "
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="version-menu"
        aria-label={`Välj version, nuvarande: ${versionInfo.label}`}
      >
        {/* Version label */}
        <span className="text-sm font-semibold text-navy-900">
          {versionInfo.shortLabel}
        </span>
        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          id="version-menu"
          role="menu"
          aria-label="Versioner"
          className="
            absolute left-0 top-full mt-2 z-50
            w-72 bg-white rounded-xl shadow-lg border border-gray-200
            py-2
            animate-in fade-in slide-in-from-top-2 duration-150
          "
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Välj version
            </p>
          </div>

          {/* Version options */}
          <div className="py-1">
            {versions.map((v, index) => {
              const isActive = version === v;
              const meta = versionMeta[v];
              const isFocused = focusedIndex === index;

              return (
                <button
                  key={v}
                  role="menuitem"
                  tabIndex={isFocused ? 0 : -1}
                  onClick={() => {
                    switchVersion(v);
                    setIsOpen(false);
                    setFocusedIndex(-1);
                  }}
                  className={`
                    w-full px-4 py-3 text-left
                    transition-colors
                    focus-visible:outline-none
                    ${isActive
                      ? 'bg-gray-50'
                      : 'hover:bg-gray-50'
                    }
                    ${isFocused ? 'bg-gray-100' : ''}
                  `}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-navy-900">
                        {meta.label}
                      </span>
                      {isActive && (
                        <span className="text-xs bg-navy-100 text-navy-700 px-2 py-0.5 rounded-full">
                          Aktiv
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {meta.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer help text */}
          <div className="px-4 py-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Byt version för att se skillnader i tillgänglighet
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
