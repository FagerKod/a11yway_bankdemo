'use client';

import { useState, useId } from 'react';

/**
 * ⚠️ V2 SETTINGS PAGE - SEMANTIC BUT INCOMPLETE
 *
 * Improvements over v1:
 * ✅ Accordion uses button element
 * ✅ Toggle switches are real checkboxes
 * ✅ Save button is a real button
 *
 * Still missing:
 * ❌ Accordion missing aria-expanded, aria-controls
 * ❌ Toggles don't use role="switch"
 * ❌ Save message not in aria-live region
 */
export default function V2SettingsPage() {
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
        <V2AccordionSection
          title="Notifieringar"
          isOpen={openSection === 'notifications'}
          onToggle={() => toggleSection('notifications')}
        >
          <div className="space-y-4">
            <V2ToggleSwitch
              label="E-postnotifieringar"
              description="Få uppdateringar via e-post"
              checked={settings.emailNotifications}
              onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
            <V2ToggleSwitch
              label="SMS-notifieringar"
              description="Få uppdateringar via SMS"
              checked={settings.smsNotifications}
              onChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
            />
            <V2ToggleSwitch
              label="Push-notifieringar"
              description="Få notifieringar i appen"
              checked={settings.pushNotifications}
              onChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
            />
          </div>
        </V2AccordionSection>

        <V2AccordionSection
          title="Säkerhet"
          isOpen={openSection === 'security'}
          onToggle={() => toggleSection('security')}
        >
          <div className="space-y-4">
            <V2ToggleSwitch
              label="Tvåfaktorsautentisering"
              description="Kräv BankID vid inloggning"
              checked={settings.twoFactorAuth}
              onChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
            />
            <V2ToggleSwitch
              label="Inloggningsvarningar"
              description="Få meddelande vid ny inloggning"
              checked={settings.loginAlerts}
              onChange={(checked) => setSettings({ ...settings, loginAlerts: checked })}
            />
          </div>
        </V2AccordionSection>

        <V2AccordionSection
          title="Utseende"
          isOpen={openSection === 'appearance'}
          onToggle={() => toggleSection('appearance')}
        >
          <div className="space-y-4">
            <V2ToggleSwitch
              label="Mörkt läge"
              description="Använd mörkt färgtema"
              checked={settings.darkMode}
              onChange={(checked) => setSettings({ ...settings, darkMode: checked })}
            />
            <div>
              <label htmlFor="language-select" className="block text-sm text-gray-600 mb-2">
                Språk
              </label>
              <select
                id="language-select"
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="input-base focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
              >
                <option value="sv">Svenska</option>
                <option value="en">English</option>
                <option value="fi">Suomi</option>
              </select>
            </div>
          </div>
        </V2AccordionSection>
      </div>

      {/* Save button and status */}
      <div className="mt-8 flex items-center gap-4">
        {/* ✅ GOOD: Real button */}
        <button onClick={handleSave} className="btn-primary">
          Spara ändringar
        </button>
        {/* ❌ ISSUE: Not in aria-live region */}
        {showSaved && (
          <span className="text-green-600 font-medium">
            ✓ Sparat!
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * ⚠️ V2 ACCORDION SECTION - PARTIALLY ACCESSIBLE
 *
 * ✅ Uses button element
 * ❌ Missing aria-expanded
 * ❌ Missing aria-controls
 * ❌ Panel doesn't have region role
 */
function V2AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      {/* ✅ GOOD: Using button instead of div */}
      {/* ❌ MISSING: aria-expanded, aria-controls */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 text-left rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-500"
      >
        <span className="font-medium text-navy-900">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * ⚠️ V2 TOGGLE SWITCH - CHECKBOX BUT NOT SWITCH
 *
 * ✅ Uses real checkbox input
 * ✅ Has label association
 * ❌ Doesn't use role="switch" semantics
 * ❌ Visual toggle doesn't match checkbox behavior
 */
function V2ToggleSwitch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const id = useId();

  return (
    <div className="flex items-center justify-between">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-navy-900 cursor-pointer">
          {label}
        </label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {/* ✅ GOOD: Real checkbox */}
      {/* ❌ ISSUE: Visual toggle style doesn't match native checkbox */}
      <label className="relative cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            checked ? 'bg-navy-700' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              checked ? 'translate-x-5 left-0.5' : 'left-0.5'
            }`}
          />
        </div>
      </label>
    </div>
  );
}
