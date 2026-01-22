'use client';

import { useState, useId, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';

/**
 * ⚠️ V2 LOGIN PAGE - SEMANTIC HTML BUT INCOMPLETE
 *
 * This page shows improvement over v1:
 *
 * ✅ Form fields have visible labels
 * ✅ Login button is a native <button>
 * ✅ Checkbox is a real <input type="checkbox">
 * ✅ Uses proper <form> element
 * ✅ Modal uses native <dialog> element
 *
 * Still missing (compared to v3):
 * ❌ Modal doesn't trap focus
 * ❌ No aria-describedby for error messages
 * ❌ Timeout warning doesn't use aria-live
 * ❌ Error messages are generic, not specific
 * ❌ Focus indicators could be more visible
 */
export default function V2LoginPage() {
  const [personnummer, setPersonnummer] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showBankIDModal, setShowBankIDModal] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [error, setError] = useState('');

  const personnummerId = useId();
  const rememberMeId = useId();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!personnummer) {
      // ❌ ISSUE: Error message is vague
      setError('Fyll i fältet');
      return;
    }

    const cleanPnr = personnummer.replace(/\D/g, '');
    if (cleanPnr.length < 10) {
      // ❌ ISSUE: Error message doesn't explain expected format
      setError('Ogiltigt format');
      return;
    }

    setError('');
    setShowBankIDModal(true);
  };

  const triggerTimeoutWarning = () => {
    setShowTimeoutWarning(true);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Login card */}
        <div className="card p-8">
          {/* ✅ GOOD: Proper heading */}
          <h1 className="text-2xl font-semibold text-navy-900 text-center mb-6">
            Logga in
          </h1>

          {/* ✅ GOOD: Proper <form> element */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* ✅ GOOD: Input with visible label */}
            {/* ❌ MISSING: No aria-describedby linking error to input */}
            <div>
              <label
                htmlFor={personnummerId}
                className="block text-sm font-medium text-navy-800 mb-1"
              >
                Personnummer
              </label>
              <input
                type="text"
                id={personnummerId}
                value={personnummer}
                onChange={(e) => setPersonnummer(e.target.value)}
                placeholder="ÅÅÅÅMMDD-XXXX"
                className={`input-base focus:border-accent-500 focus:ring-1 focus:ring-accent-500 ${
                  error ? 'border-error-500' : ''
                }`}
              />
              {/* ❌ ISSUE: Error not associated with input, no role="alert" */}
              {error && (
                <p className="text-error-500 text-sm mt-1">{error}</p>
              )}
            </div>

            {/* ✅ GOOD: Real checkbox with label */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={rememberMeId}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-navy-700 border-gray-300 rounded"
              />
              <label htmlFor={rememberMeId} className="text-sm text-gray-600">
                Kom ihåg mig
              </label>
            </div>

            {/* ✅ GOOD: Native <button> element */}
            <button type="submit" className="btn-primary w-full">
              Logga in med BankID
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">eller</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ✅ GOOD: Proper link element */}
          <a
            href="/v2/help"
            className="block text-center text-accent-500 hover:text-accent-600"
          >
            Behöver du hjälp att logga in?
          </a>
        </div>

        {/* Demo controls */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500 mb-2">Demo-kontroller:</p>
          <button
            onClick={triggerTimeoutWarning}
            className="text-xs bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            Visa timeout-varning
          </button>
        </div>
      </div>

      {/* ⚠️ V2 Modal - semantic but missing focus management */}
      {showBankIDModal && (
        <V2BankIDModal onClose={() => setShowBankIDModal(false)} />
      )}

      {/* ⚠️ V2 Timeout - visible but no live region */}
      {showTimeoutWarning && (
        <V2TimeoutWarning onClose={() => setShowTimeoutWarning(false)} />
      )}
    </div>
  );
}

/**
 * ⚠️ V2 BANKID MODAL - SEMANTIC BUT INCOMPLETE
 *
 * Improvements over v1:
 * ✅ Uses native <dialog> element
 * ✅ Close button is a real <button>
 * ✅ ESC key works (native dialog behavior)
 *
 * Still missing:
 * ❌ Focus doesn't move into modal automatically
 * ❌ Focus is not trapped within modal
 * ❌ No aria-labelledby/describedby
 */
function V2BankIDModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  // ✅ GOOD: Using Next.js router for navigation
  // ❌ MISSING: No announcement for screen reader users
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/v2/account');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* ✅ GOOD: Using role="dialog" */}
      {/* ❌ MISSING: No aria-labelledby, no focus trap */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
      >
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
          {/* ✅ GOOD: Close button is a real button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="text-center">
            {/* BankID logo */}
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-navy-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>

            {/* ❌ MISSING: Heading should have id for aria-labelledby */}
            <h2 className="text-lg font-semibold text-navy-900 mb-2">
              Logga in med BankID
            </h2>

            <p className="text-gray-600 mb-6">
              Starta BankID-appen på din enhet och följ instruktionerna.
            </p>

            {/* QR code placeholder */}
            {/* ❌ MISSING: No accessible description of QR code */}
            <div className="w-32 h-32 bg-gray-100 mx-auto mb-6 rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 ${
                      [0, 3, 5, 6, 9, 10, 12, 15].includes(i)
                        ? 'bg-navy-900'
                        : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ✅ GOOD: Real button */}
            <button onClick={onClose} className="btn-secondary w-full">
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * ⚠️ V2 TIMEOUT WARNING - VISIBLE BUT NO ANNOUNCEMENTS
 *
 * Improvements over v1:
 * ✅ Warning is visible to users
 * ✅ Uses real buttons
 * ✅ Has proper heading
 *
 * Still missing:
 * ❌ No role="alertdialog" - screen readers won't interrupt
 * ❌ Countdown not announced (no aria-live)
 * ❌ Session cannot be extended (WCAG violation)
 * ❌ Focus doesn't move to dialog
 */
function V2TimeoutWarning({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* ❌ MISSING: Should be role="alertdialog" */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
      >
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
          <div className="text-center">
            {/* Warning icon */}
            <div className="w-16 h-16 bg-warning-50 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-warning-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-navy-900 mb-2">
              Sessionen håller på att gå ut
            </h2>

            {/* ❌ MISSING: No aria-live for countdown */}
            <p className="text-gray-600 mb-6">
              Du kommer att loggas ut om 30 sekunder.
            </p>

            {/* ✅ GOOD: Real buttons */}
            {/* ❌ ISSUE: No option to extend time (WCAG 2.2.1) */}
            <div className="flex gap-3">
              <button onClick={onClose} className="btn-secondary flex-1">
                Logga ut
              </button>
              <button onClick={onClose} className="btn-primary flex-1">
                Fortsätt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
