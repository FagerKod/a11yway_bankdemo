'use client';

import { useState, useId, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/shared/Logo';
import { useFocusTrap, useEscapeKey } from '@/hooks/useFocusTrap';

/**
 * ✅ V3 LOGIN PAGE - FULLY ACCESSIBLE
 *
 * This page demonstrates accessibility best practices:
 *
 * 1. Form fields have visible labels with proper association
 * 2. Login button is a native <button> element
 * 3. BankID modal traps focus and closes on ESC
 * 4. Timeout warning uses aria-live for announcements
 * 5. Visible focus indicators on all interactive elements
 * 6. Checkbox is a real <input type="checkbox">
 * 7. Error messages are associated with fields via aria-describedby
 * 8. Clear, descriptive error messages
 */
export default function V3LoginPage() {
  const [personnummer, setPersonnummer] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showBankIDModal, setShowBankIDModal] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [error, setError] = useState('');

  // ✅ GOOD: Generate unique IDs for accessibility associations
  const personnummerId = useId();
  const errorId = useId();
  const rememberMeId = useId();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!personnummer) {
      setError('Ange ditt personnummer för att logga in');
      return;
    }

    const cleanPnr = personnummer.replace(/\D/g, '');
    if (cleanPnr.length !== 12 && cleanPnr.length !== 10) {
      setError('Ange personnummer med 10 eller 12 siffror (ÅÅÅÅMMDD-XXXX eller ÅÅMMDD-XXXX)');
      return;
    }

    setError('');
    setShowBankIDModal(true);
  };

  // Demo control to trigger timeout warning
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
          {/* ✅ GOOD: Proper heading hierarchy */}
          <h1 className="text-2xl font-semibold text-navy-900 text-center mb-6">
            Logga in
          </h1>

          {/* ✅ GOOD: Proper <form> element with onSubmit */}
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {/* ✅ GOOD: Input with visible label and aria-describedby for errors */}
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
                className={`input-focus ${error ? 'border-error-500' : ''}`}
                aria-describedby={error ? errorId : undefined}
                aria-invalid={error ? 'true' : undefined}
                autoComplete="off"
              />
              {/* ✅ GOOD: Error associated with input and uses aria-live */}
              {error && (
                <p
                  id={errorId}
                  className="text-error-500 text-sm mt-1"
                  role="alert"
                >
                  {error}
                </p>
              )}
            </div>

            {/* ✅ GOOD: Real checkbox with proper label association */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={rememberMeId}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                onKeyDown={(e) => {
                  // Prevent Enter from submitting the form when on checkbox
                  // Space will still toggle the checkbox (default behavior)
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                className="w-4 h-4 text-navy-700 border-gray-300 rounded focus:ring-accent-500 focus:ring-2"
              />
              <label
                htmlFor={rememberMeId}
                className="text-sm text-gray-600"
              >
                Kom ihåg mig på denna enhet
              </label>
            </div>

            {/* ✅ GOOD: Native <button> element with type="submit" */}
            <button
              type="submit"
              className="btn-primary w-full focus-ring"
            >
              Logga in med BankID
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6" role="presentation">
            <div className="flex-1 h-px bg-gray-200" aria-hidden="true" />
            <span className="text-sm text-gray-400">eller</span>
            <div className="flex-1 h-px bg-gray-200" aria-hidden="true" />
          </div>

          {/* ✅ GOOD: Proper link element */}
          <a
            href="/v3/help"
            className="block text-center text-accent-500 hover:text-accent-600 focus-ring rounded"
          >
            Behöver du hjälp att logga in?
          </a>
        </div>

        {/* Demo controls - for instructor use */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-500 mb-2">Demo-kontroller:</p>
          <button
            onClick={triggerTimeoutWarning}
            className="text-xs bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 focus-ring"
          >
            Visa timeout-varning
          </button>
        </div>
      </div>

      {/* ✅ GOOD: Accessible BankID Modal */}
      {showBankIDModal && (
        <V3BankIDModal onClose={() => setShowBankIDModal(false)} />
      )}

      {/* ✅ GOOD: Accessible Timeout Warning */}
      {showTimeoutWarning && (
        <V3TimeoutWarning onClose={() => setShowTimeoutWarning(false)} />
      )}
    </div>
  );
}

/**
 * ✅ V3 BANKID MODAL - FULLY ACCESSIBLE
 *
 * Features:
 * 1. Focus moves into modal when opened
 * 2. Focus is trapped within the modal
 * 3. ESC key closes the modal
 * 4. Has role="dialog" and aria-modal="true"
 * 5. Close button is a real <button>
 * 6. Modal has accessible name via aria-labelledby
 * 7. Focus returns to trigger button on close
 */
function V3BankIDModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const descId = useId();
  const router = useRouter();
  const [announcement, setAnnouncement] = useState('');

  // ✅ GOOD: Focus trap keeps focus inside modal
  const focusTrapRef = useFocusTrap(true);

  // ✅ GOOD: ESC key closes modal
  useEscapeKey(onClose, true);

  // ✅ GOOD: Announce success and redirect with proper screen reader support
  useEffect(() => {
    const announceTimer = setTimeout(() => {
      setAnnouncement('Inloggning lyckades. Du omdirigeras till kontoöversikten.');
    }, 1500);

    const redirectTimer = setTimeout(() => {
      router.push('/v3/account');
    }, 2500);

    return () => {
      clearTimeout(announceTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <>
      {/* Backdrop - clicking closes modal */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ✅ GOOD: Modal with proper ARIA attributes */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <div
          ref={focusTrapRef}
          className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6"
        >
          {/* ✅ GOOD: Close button is a real button with accessible name */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded focus-ring"
              aria-label="Stäng dialog"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
            <div
              className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center"
              aria-hidden="true"
            >
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

            {/* ✅ GOOD: Heading with id for aria-labelledby */}
            <h2
              id={titleId}
              className="text-lg font-semibold text-navy-900 mb-2"
            >
              Logga in med BankID
            </h2>

            {/* ✅ GOOD: Description with id for aria-describedby */}
            <p id={descId} className="text-gray-600 mb-6">
              Starta BankID-appen på din enhet och följ instruktionerna.
            </p>

            {/* QR code with proper description */}
            <div
              className="w-32 h-32 bg-gray-100 mx-auto mb-6 rounded-lg flex items-center justify-center"
              role="img"
              aria-label="QR-kod för BankID-inloggning. Skanna med BankID-appen."
            >
              {/* Simulated QR pattern */}
              <div className="grid grid-cols-4 gap-1" aria-hidden="true">
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

            {/* ✅ GOOD: Live region for screen reader announcements */}
            <div aria-live="assertive" aria-atomic="true" className="sr-only">
              {announcement}
            </div>

            {/* ✅ GOOD: Real button element */}
            <button onClick={onClose} className="btn-secondary w-full focus-ring">
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * ✅ V3 TIMEOUT WARNING - FULLY ACCESSIBLE
 *
 * Features:
 * 1. Uses role="alertdialog" for important, interruptive dialogs
 * 2. Countdown is announced via aria-live
 * 3. User can extend the session (WCAG 2.2.1 compliant)
 * 4. Focus moves to dialog and is trapped
 * 5. Clear instructions and actions
 */
function V3TimeoutWarning({ onClose }: { onClose: () => void }) {
  const [timeRemaining, setTimeRemaining] = useState(30);
  const titleId = useId();
  const descId = useId();

  // ✅ GOOD: Focus trap
  const focusTrapRef = useFocusTrap(true);

  // ✅ GOOD: ESC closes (logs out in this case)
  useEscapeKey(onClose, true);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) {
      onClose();
      return;
    }

    const timer = setTimeout(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining, onClose]);

  // ✅ GOOD: Extend session handler
  const handleExtend = () => {
    setTimeRemaining(120); // Reset to 2 minutes
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />

      {/* ✅ GOOD: alertdialog role for important interruptions */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <div
          ref={focusTrapRef}
          className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6"
        >
          <div className="text-center">
            {/* Warning icon */}
            <div
              className="w-16 h-16 bg-warning-50 rounded-full mx-auto mb-4 flex items-center justify-center"
              aria-hidden="true"
            >
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

            <h2
              id={titleId}
              className="text-lg font-semibold text-navy-900 mb-2"
            >
              Sessionen håller på att gå ut
            </h2>

            {/* ✅ GOOD: Live region announces countdown changes */}
            <p id={descId} className="text-gray-600 mb-2">
              Av säkerhetsskäl loggas du ut automatiskt efter en period av
              inaktivitet.
            </p>

            <p
              className="text-lg font-medium text-navy-900 mb-6"
              aria-live="polite"
              aria-atomic="true"
            >
              Tid kvar: {timeRemaining} sekunder
            </p>

            {/* ✅ GOOD: Real buttons with clear actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn-secondary flex-1 focus-ring"
              >
                Logga ut nu
              </button>
              <button
                onClick={handleExtend}
                className="btn-primary flex-1 focus-ring"
              >
                Förläng session
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
