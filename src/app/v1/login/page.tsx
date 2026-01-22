'use client';

import { useState, useEffect } from 'react';
import { Logo } from '@/components/shared/Logo';

/**
 * ❌ V1 LOGIN PAGE - ACCESSIBILITY ISSUES
 *
 * This page demonstrates common accessibility anti-patterns:
 *
 * 1. Form fields use placeholder text only - no visible labels
 * 2. "Logga in" button is a styled <div> with onclick
 * 3. BankID modal doesn't trap focus, ESC doesn't close it
 * 4. Timeout warning appears silently with no announcement
 * 5. Focus indicators removed with outline:none
 * 6. Checkbox is a styled div, not a real checkbox
 * 7. Error messages not programmatically associated with fields
 */
export default function V1LoginPage() {
  const [personnummer, setPersonnummer] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showBankIDModal, setShowBankIDModal] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!personnummer) {
      setError('Fyll i personnummer');
      return;
    }
    if (personnummer.replace(/\D/g, '').length < 10) {
      setError('Ogiltigt format');
      return;
    }
    setError('');
    setShowBankIDModal(true);
  };

  // Simulate timeout warning after 30 seconds
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
          {/* ❌ BAD: Heading without proper hierarchy consideration */}
          <div className="text-2xl font-semibold text-navy-900 text-center mb-6">
            Logga in
          </div>

          {/* ❌ BAD: Form without proper form element */}
          <div className="space-y-4">
            {/* ❌ BAD: Input without label, only placeholder */}
            <div>
              <input
                type="text"
                placeholder="Personnummer (ÅÅÅÅMMDD-XXXX)"
                value={personnummer}
                onChange={(e) => setPersonnummer(e.target.value)}
                className="input-base no-focus-visible"
              />
              {/* ❌ BAD: Error not associated with input via aria-describedby */}
              {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
              )}
            </div>

            {/* ❌ BAD: Fake checkbox using div with click handler */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div
                className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  rememberMe
                    ? 'bg-navy-700 border-navy-700'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {rememberMe && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600">Kom ihåg mig</span>
            </div>

            {/* ❌ BAD: Button is a div with onclick, not a <button> */}
            <div
              className="btn-primary w-full text-center cursor-pointer no-focus-visible"
              onClick={handleLogin}
            >
              Logga in med BankID
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">eller</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ❌ BAD: Link is a div with onclick instead of <a> */}
          <div
            className="text-center text-accent-500 cursor-pointer hover:text-accent-600 no-focus-visible"
            onClick={() => (window.location.href = '/v1/help')}
          >
            Behöver du hjälp att logga in?
          </div>
        </div>

        {/* Demo controls - for instructor use */}
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

      {/* ❌ BAD: BankID Modal - No focus management */}
      {showBankIDModal && (
        <V1BankIDModal onClose={() => setShowBankIDModal(false)} />
      )}

      {/* ❌ BAD: Timeout warning - appears silently */}
      {showTimeoutWarning && (
        <V1TimeoutWarning onClose={() => setShowTimeoutWarning(false)} />
      )}
    </div>
  );
}

/**
 * ❌ V1 BANKID MODAL - ACCESSIBILITY ISSUES
 *
 * Problems:
 * 1. Focus doesn't move into modal when opened
 * 2. No focus trap - user can tab behind the modal
 * 3. ESC key doesn't close the modal
 * 4. No aria-modal or role="dialog"
 * 5. Close button is a span, not a button
 * 6. No accessible name for the modal
 */
function V1BankIDModal({ onClose }: { onClose: () => void }) {
  // ❌ BAD: Using window.location.href instead of proper router navigation
  // Also: No announcement for screen reader users about the redirect
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/v1/account';
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ❌ BAD: Backdrop click closes but no keyboard equivalent */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* ❌ BAD: No role="dialog", no aria-modal, no aria-labelledby */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
          {/* ❌ BAD: Close button is a span with onclick */}
          <div className="flex justify-end mb-2">
            <span
              className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl"
              onClick={onClose}
            >
              ×
            </span>
          </div>

          <div className="text-center">
            {/* BankID logo placeholder */}
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

            <div className="text-lg font-semibold text-navy-900 mb-2">
              Logga in med BankID
            </div>

            <div className="text-gray-600 mb-6">
              Starta BankID-appen på din enhet och följ instruktionerna.
            </div>

            {/* Simulated QR code */}
            <div className="w-32 h-32 bg-gray-100 mx-auto mb-6 rounded-lg flex items-center justify-center">
              {/* ❌ BAD: No alt text for this visual element */}
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 ${
                      Math.random() > 0.5 ? 'bg-navy-900' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ❌ BAD: Cancel button is a div */}
            <div
              className="btn-secondary cursor-pointer"
              onClick={onClose}
            >
              Avbryt
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * ❌ V1 TIMEOUT WARNING - ACCESSIBILITY ISSUES
 *
 * Problems:
 * 1. Appears silently - no aria-live announcement
 * 2. No role="alert" or role="dialog"
 * 3. Time cannot be extended (WCAG 2.2.1 violation)
 * 4. Focus doesn't move to the warning
 * 5. No keyboard way to dismiss
 */
function V1TimeoutWarning({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* ❌ BAD: No role="alertdialog", no aria-live, no focus management */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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

            <div className="text-lg font-semibold text-navy-900 mb-2">
              Sessionen håller på att gå ut
            </div>

            {/* ❌ BAD: Countdown not announced to screen readers */}
            <div className="text-gray-600 mb-6">
              Du kommer att loggas ut om 30 sekunder.
            </div>

            {/* ❌ BAD: Buttons are divs */}
            <div className="flex gap-3">
              <div
                className="btn-secondary flex-1 cursor-pointer text-center"
                onClick={onClose}
              >
                Logga ut
              </div>
              <div
                className="btn-primary flex-1 cursor-pointer text-center"
                onClick={onClose}
              >
                Fortsätt
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
