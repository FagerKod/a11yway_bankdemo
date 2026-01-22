'use client';

import { useState, useId, useRef } from 'react';

/**
 * ✅ V3 SETTINGS PAGE - FULLY ACCESSIBLE
 *
 * This page demonstrates accessibility best practices:
 *
 * 1. Accordion uses button with aria-expanded
 * 2. Toggle switches use role="switch" with aria-checked
 * 3. "Sparat!" message uses aria-live for announcement
 * 4. Full keyboard navigation support
 * 5. Visible focus indicators
 */
export default function V3SettingsPage() {
  const [openSection, setOpenSection] = useState<string | null>('notifications');
  const [showSaved, setShowSaved] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    twoFactorAuth: true,
    loginAlerts: true,
    darkMode: false,
    language: 'sv',
  });

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-navy-900 mb-2">
        Inställningar
      </h1>
      <p className="text-gray-500 mb-8">
        Hantera dina konto- och säkerhetsinställningar
      </p>

      <div className="space-y-4">
        {/* ✅ GOOD: Accessible accordion sections */}
        <V3AccordionSection
          id="notifications"
          title="Notifieringar"
          isOpen={openSection === 'notifications'}
          onToggle={() => toggleSection('notifications')}
        >
          <div className="space-y-4">
            <V3ToggleSwitch
              id="email-notifications"
              label="E-postnotifieringar"
              description="Få uppdateringar via e-post"
              checked={settings.emailNotifications}
              onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
            <V3ToggleSwitch
              id="sms-notifications"
              label="SMS-notifieringar"
              description="Få uppdateringar via SMS"
              checked={settings.smsNotifications}
              onChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
            />
            <V3ToggleSwitch
              id="push-notifications"
              label="Push-notifieringar"
              description="Få notifieringar i appen"
              checked={settings.pushNotifications}
              onChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
            />
          </div>
        </V3AccordionSection>

        <V3AccordionSection
          id="security"
          title="Säkerhet"
          isOpen={openSection === 'security'}
          onToggle={() => toggleSection('security')}
        >
          <div className="space-y-4">
            <V3ToggleSwitch
              id="two-factor"
              label="Tvåfaktorsautentisering"
              description="Kräv BankID vid inloggning"
              checked={settings.twoFactorAuth}
              onChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
            />
            <V3ToggleSwitch
              id="login-alerts"
              label="Inloggningsvarningar"
              description="Få meddelande vid ny inloggning"
              checked={settings.loginAlerts}
              onChange={(checked) => setSettings({ ...settings, loginAlerts: checked })}
            />
          </div>
        </V3AccordionSection>

        <V3AccordionSection
          id="appearance"
          title="Utseende"
          isOpen={openSection === 'appearance'}
          onToggle={() => toggleSection('appearance')}
        >
          <div className="space-y-4">
            <V3ToggleSwitch
              id="dark-mode"
              label="Mörkt läge"
              description="Använd mörkt färgtema"
              checked={settings.darkMode}
              onChange={(checked) => setSettings({ ...settings, darkMode: checked })}
            />
            <div>
              <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-1">
                Språk
              </label>
              <select
                id="language-select"
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="input-focus"
              >
                <option value="sv">Svenska</option>
                <option value="en">English</option>
                <option value="fi">Suomi</option>
              </select>
            </div>
          </div>
        </V3AccordionSection>
      </div>

      {/* Save button and status */}
      <div className="mt-8 flex items-center gap-4">
        <button onClick={handleSave} className="btn-primary focus-ring">
          Spara ändringar
        </button>
        {/* ✅ GOOD: Live region announces save status */}
        <div aria-live="polite" aria-atomic="true">
          {showSaved && (
            <span className="text-green-600 font-medium" role="status">
              ✓ Inställningarna har sparats
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ✅ V3 ACCORDION SECTION - FULLY ACCESSIBLE
 *
 * Features:
 * 1. Header is a button element
 * 2. aria-expanded indicates open/closed state
 * 3. aria-controls links header to content panel
 * 4. Panel has role="region" with aria-labelledby
 * 5. Keyboard accessible (Enter/Space to toggle)
 */
function V3AccordionSection({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const headerId = `accordion-header-${id}`;
  const panelId = `accordion-panel-${id}`;

  return (
    <div className="card">
      {/* ✅ GOOD: Button with proper ARIA attributes */}
      <h2>
        <button
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex items-center justify-between w-full p-4 text-left rounded-xl hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-500"
        >
          <span className="font-medium text-navy-900">{title}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>
      {/* ✅ GOOD: Panel with region role and labelledby */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!isOpen}
        className="p-4 pt-0 border-t border-gray-100"
      >
        {children}
      </div>
    </div>
  );
}

/**
 * ✅ V3 TOGGLE SWITCH - FULLY ACCESSIBLE
 *
 * Features:
 * 1. Uses role="switch" for proper semantics
 * 2. aria-checked indicates state
 * 3. Keyboard accessible (Space to toggle)
 * 4. Proper label association
 * 5. Visible focus indicator
 */
function V3ToggleSwitch({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const labelId = `${id}-label`;
  const descId = `${id}-desc`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div id={labelId} className="text-sm font-medium text-navy-900">
          {label}
        </div>
        <div id={descId} className="text-sm text-gray-500">
          {description}
        </div>
      </div>
      {/* ✅ GOOD: Switch role with proper ARIA */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descId}
        onClick={() => onChange(!checked)}
        onKeyDown={handleKeyDown}
        className={`relative w-11 h-6 rounded-full transition-colors focus-ring ${
          checked ? 'bg-navy-700' : 'bg-gray-300'
        }`}
      >
        <span className="sr-only">{checked ? 'På' : 'Av'}</span>
        <span
          aria-hidden="true"
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-5 left-0.5' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  );
}
