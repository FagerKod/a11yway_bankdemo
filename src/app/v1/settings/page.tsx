'use client';

import { useState } from 'react';

/**
 * ❌ V1 SETTINGS PAGE - ACCESSIBILITY ISSUES
 *
 * This page demonstrates common accessibility anti-patterns:
 *
 * 1. Accordion uses CSS/JS toggle, no ARIA attributes
 * 2. Toggle switches are styled divs, not real inputs
 * 3. "Sparat!" message appears visually but not announced
 * 4. No keyboard support for accordion
 * 5. Focus indicators removed
 */
export default function V1SettingsPage() {
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
      <div className="text-2xl font-semibold text-navy-900 mb-2">
        Inställningar
      </div>
      <div className="text-gray-500 mb-8">
        Hantera dina konto- och säkerhetsinställningar
      </div>

      <div className="space-y-4">
        {/* ❌ BAD: Accordion without ARIA */}
        <V1AccordionSection
          title="Notifieringar"
          isOpen={openSection === 'notifications'}
          onToggle={() => toggleSection('notifications')}
        >
          <div className="space-y-4">
            <V1ToggleSwitch
              label="E-postnotifieringar"
              description="Få uppdateringar via e-post"
              checked={settings.emailNotifications}
              onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
            <V1ToggleSwitch
              label="SMS-notifieringar"
              description="Få uppdateringar via SMS"
              checked={settings.smsNotifications}
              onChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
            />
            <V1ToggleSwitch
              label="Push-notifieringar"
              description="Få notifieringar i appen"
              checked={settings.pushNotifications}
              onChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
            />
          </div>
        </V1AccordionSection>

        <V1AccordionSection
          title="Säkerhet"
          isOpen={openSection === 'security'}
          onToggle={() => toggleSection('security')}
        >
          <div className="space-y-4">
            <V1ToggleSwitch
              label="Tvåfaktorsautentisering"
              description="Kräv BankID vid inloggning"
              checked={settings.twoFactorAuth}
              onChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
            />
            <V1ToggleSwitch
              label="Inloggningsvarningar"
              description="Få meddelande vid ny inloggning"
              checked={settings.loginAlerts}
              onChange={(checked) => setSettings({ ...settings, loginAlerts: checked })}
            />
          </div>
        </V1AccordionSection>

        <V1AccordionSection
          title="Utseende"
          isOpen={openSection === 'appearance'}
          onToggle={() => toggleSection('appearance')}
        >
          <div className="space-y-4">
            <V1ToggleSwitch
              label="Mörkt läge"
              description="Använd mörkt färgtema"
              checked={settings.darkMode}
              onChange={(checked) => setSettings({ ...settings, darkMode: checked })}
            />
            <div>
              <div className="text-sm text-gray-600 mb-2">Språk</div>
              {/* ❌ BAD: Select without label association */}
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="input-base"
              >
                <option value="sv">Svenska</option>
                <option value="en">English</option>
                <option value="fi">Suomi</option>
              </select>
            </div>
          </div>
        </V1AccordionSection>
      </div>

      {/* Save button and status */}
      <div className="mt-8 flex items-center gap-4">
        <div
          className="btn-primary cursor-pointer"
          onClick={handleSave}
        >
          Spara ändringar
        </div>
        {/* ❌ BAD: Status message not announced to screen readers */}
        {showSaved && (
          <div className="text-green-600 font-medium">
            ✓ Sparat!
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ❌ V1 ACCORDION SECTION - ACCESSIBILITY ISSUES
 *
 * Problems:
 * 1. Header is a div with onClick, not a button
 * 2. No aria-expanded attribute
 * 3. No aria-controls linking header to content
 * 4. Not keyboard accessible
 * 5. Focus indicator removed
 */
function V1AccordionSection({
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
    <div className="card overflow-hidden">
      {/* ❌ BAD: Clickable div instead of button */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 no-focus-visible"
        onClick={onToggle}
      >
        <span className="font-medium text-navy-900">{title}</span>
        {/* ❌ BAD: Icon rotation is visual-only indicator */}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {/* ❌ BAD: Content appears/disappears without announcement */}
      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * ❌ V1 TOGGLE SWITCH - ACCESSIBILITY ISSUES
 *
 * Problems:
 * 1. Not a real checkbox/switch input
 * 2. Not keyboard accessible
 * 3. No proper label association
 * 4. State only indicated visually
 */
function V1ToggleSwitch({
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
  return (
    // ❌ BAD: Div with onClick instead of proper form control
    <div
      className="flex items-center justify-between cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <div>
        <div className="text-sm font-medium text-navy-900">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      {/* ❌ BAD: Visual-only toggle, no keyboard support */}
      <div
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-navy-700' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-5 left-0.5' : 'left-0.5'
          }`}
        />
      </div>
    </div>
  );
}
