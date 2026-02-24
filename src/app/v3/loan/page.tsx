'use client';

import { useState, useId, useRef, useEffect } from 'react';
import { formatSEK } from '@/lib/formatters';

/**
 * ✅ V3 LOAN PAGE - FULLY ACCESSIBLE
 *
 * This page demonstrates accessibility best practices:
 *
 * 1. Progress indicator uses aria-current="step"
 * 2. Sliders use native input[type=range] with labels
 * 3. Error messages use aria-describedby and aria-live
 * 4. Help tooltips are keyboard accessible
 * 5. Focus managed when moving between steps
 * 6. Terms checkbox is a real checkbox
 * 7. Clear, descriptive error messages
 */
export default function V3LoanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    amount: 150000,
    duration: 5,
    purpose: '',
    personnummer: '',
    income: '',
    employment: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [announcement, setAnnouncement] = useState('');

  const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const steps = ['Lånebelopp', 'Personuppgifter', 'Bekräfta'];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.purpose) {
        newErrors.purpose = 'Välj vad du ska använda lånet till';
      }
    } else if (step === 1) {
      if (!formData.personnummer) {
        newErrors.personnummer = 'Ange ditt personnummer (12 siffror: ÅÅÅÅMMDD-XXXX)';
      } else if (formData.personnummer.replace(/\D/g, '').length !== 12) {
        newErrors.personnummer = 'Personnummer ska vara 12 siffror (ÅÅÅÅMMDD-XXXX)';
      }
      if (!formData.income) {
        newErrors.income = 'Ange din årsinkomst före skatt';
      }
      if (!formData.employment) {
        newErrors.employment = 'Välj din anställningsform';
      }
    } else if (step === 2) {
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Du måste godkänna villkoren för att fortsätta';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      // ✅ GOOD: Move focus to first error field on validation failure
      requestAnimationFrame(() => {
        const firstError = document.querySelector('[aria-invalid="true"]') as HTMLElement;
        firstError?.focus();
      });
      return;
    }
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setAnnouncement(`Steg ${nextStep + 1} av ${steps.length}: ${steps[nextStep]}`);

      // ✅ GOOD: Focus management - move focus to next step
      setTimeout(() => {
        stepRefs[nextStep].current?.focus();
      }, 100);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setAnnouncement(`Steg ${prevStep + 1} av ${steps.length}: ${steps[prevStep]}`);

      setTimeout(() => {
        stepRefs[prevStep].current?.focus();
      }, 100);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!validateStep(currentStep)) {
      // ✅ GOOD: Move focus to first error field on validation failure
      requestAnimationFrame(() => {
        const firstError = document.querySelector('[aria-invalid="true"]') as HTMLElement;
        firstError?.focus();
      });
      return;
    }
    setSubmitted(true);
    setAnnouncement('Din låneansökan har skickats!');
  };

  const monthlyPayment = calculateMonthlyPayment(formData.amount, formData.duration);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ✅ GOOD: Live region for announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      <h1 className="text-2xl font-semibold text-navy-900 mb-2">
        Ansök om lån
      </h1>
      <p className="text-gray-500 mb-8">
        Fyll i formuläret nedan för att ansöka om ett privatlån
      </p>

      {/* ✅ GOOD: Accessible progress indicator */}
      <V3StepIndicator steps={steps} currentStep={currentStep} />

      {submitted ? (
        <div className="card p-6 mt-6 text-center" role="status">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-navy-900 mb-2">Ansökan skickad!</h2>
          <p className="text-gray-600">Din låneansökan har tagits emot och behandlas inom 1–2 bankdagar.</p>
        </div>
      ) : (
      <div className="card p-6 mt-6">
        {/* ✅ GOOD: Step containers wrapped in <form> for native submit and focusable for focus management */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleNext(); }}
          hidden={currentStep !== 0}
          noValidate
        >
          <div
            ref={stepRefs[0]}
            tabIndex={currentStep === 0 ? -1 : undefined}
          >
            {currentStep === 0 && (
              <V3Step1
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                monthlyPayment={monthlyPayment}
              />
            )}
          </div>
        </form>
        <form
          onSubmit={(e) => { e.preventDefault(); handleNext(); }}
          hidden={currentStep !== 1}
          noValidate
        >
          <div
            ref={stepRefs[1]}
            tabIndex={currentStep === 1 ? -1 : undefined}
          >
            {currentStep === 1 && (
              <V3Step2
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            )}
          </div>
        </form>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          hidden={currentStep !== 2}
          noValidate
        >
          <div
            ref={stepRefs[2]}
            tabIndex={currentStep === 2 ? -1 : undefined}
          >
            {currentStep === 2 && (
              <V3Step3
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                monthlyPayment={monthlyPayment}
              />
            )}
          </div>
        </form>

        {/* ✅ GOOD: Navigation with real buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentStep > 0 ? (
            <button type="button" onClick={handleBack} className="btn-secondary focus-ring">
              ← Tillbaka
            </button>
          ) : (
            <div />
          )}

          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={handleNext} className="btn-primary focus-ring">
              Nästa →
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} className="btn-primary focus-ring">
              Skicka ansökan
            </button>
          )}
        </div>
      </div>
      )}
    </div>
  );
}

/**
 * ✅ V3 STEP INDICATOR - FULLY ACCESSIBLE
 */
function V3StepIndicator({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <nav aria-label="Steg i låneansökan">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex items-center"
            aria-current={index === currentStep ? 'step' : undefined}
          >
            {/* Step circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep
                  ? 'bg-navy-700 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              aria-hidden="true"
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {/* Step label */}
            <span
              className={`ml-2 text-sm ${
                index === currentStep ? 'text-navy-900 font-medium' : 'text-gray-500'
              }`}
            >
              <span className="sr-only">
                Steg {index + 1} av {steps.length}:
                {index < currentStep && ' (slutfört)'}
                {index === currentStep && ' (nuvarande)'}
              </span>
              <span className="hidden sm:inline">{step}</span>
            </span>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-1 mx-2 ${
                  index < currentStep ? 'bg-navy-700' : 'bg-gray-200'
                }`}
                aria-hidden="true"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function V3Step1({
  formData,
  setFormData,
  errors,
  monthlyPayment,
}: {
  formData: any;
  setFormData: any;
  errors: Record<string, string>;
  monthlyPayment: number;
}) {
  const amountId = useId();
  const durationId = useId();
  const purposeId = useId();
  const purposeErrorId = useId();
  const purposeHelpId = useId();
  const [showPurposeHelp, setShowPurposeHelp] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-navy-900">Välj lånebelopp</h2>

      {/* ✅ GOOD: Accessible slider with label and value announcement */}
      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor={amountId} className="text-sm text-gray-600">
            Belopp
          </label>
          <output htmlFor={amountId} className="font-medium text-navy-900">
            {formatSEK(formData.amount)}
          </output>
        </div>
        <input
          type="range"
          id={amountId}
          min={50000}
          max={500000}
          step={10000}
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navy-700 focus-ring"
          aria-valuetext={formatSEK(formData.amount)}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1" aria-hidden="true">
          <span>50 000 kr</span>
          <span>500 000 kr</span>
        </div>
      </div>

      {/* Duration slider */}
      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor={durationId} className="text-sm text-gray-600">
            Återbetalningstid
          </label>
          <output htmlFor={durationId} className="font-medium text-navy-900">
            {formData.duration} år
          </output>
        </div>
        <input
          type="range"
          id={durationId}
          min={1}
          max={10}
          step={1}
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navy-700 focus-ring"
          aria-valuetext={`${formData.duration} år`}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1" aria-hidden="true">
          <span>1 år</span>
          <span>10 år</span>
        </div>
      </div>

      {/* ✅ GOOD: Select with proper label, error association, and disclosure help text */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <label htmlFor={purposeId} className="text-sm text-gray-600">
            Lånesyfte
          </label>
          {/* ✅ GOOD: Disclosure button instead of alert() */}
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 focus-ring rounded-full"
            aria-expanded={showPurposeHelp}
            aria-controls={purposeHelpId}
            onClick={() => setShowPurposeHelp(!showPurposeHelp)}
          >
            <span className="sr-only">Mer information om lånesyfte</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        {showPurposeHelp && (
          <p id={purposeHelpId} className="text-sm text-gray-500 mb-2">
            Vi frågar om lånesyfte för att kunna ge dig bästa möjliga erbjudande.
          </p>
        )}
        <select
          id={purposeId}
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          className={`input-focus ${errors.purpose ? 'border-error-500' : ''}`}
          aria-describedby={[errors.purpose ? purposeErrorId : null, showPurposeHelp ? purposeHelpId : null].filter(Boolean).join(' ') || undefined}
          aria-invalid={errors.purpose ? 'true' : undefined}
          required
          aria-required="true"
        >
          <option value="">Välj syfte...</option>
          <option value="renovation">Renovering</option>
          <option value="car">Bil</option>
          <option value="consolidate">Samla lån</option>
          <option value="other">Övrigt</option>
        </select>
        {errors.purpose && (
          <p id={purposeErrorId} className="text-error-500 text-sm mt-1" role="alert">
            {errors.purpose}
          </p>
        )}
      </div>

      {/* Loan calculator - announced via aria-live */}
      <div
        className="bg-navy-50 rounded-lg p-4"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm text-gray-600">Uppskattad månadskostnad</p>
        <p className="text-2xl font-semibold text-navy-900">
          {formatSEK(monthlyPayment)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Ränta från 4,5% (individuellt baserad på kreditprövning)
        </p>
      </div>
    </div>
  );
}

function V3Step2({
  formData,
  setFormData,
  errors,
}: {
  formData: any;
  setFormData: any;
  errors: Record<string, string>;
}) {
  const personnummerId = useId();
  const personnummerErrorId = useId();
  const incomeId = useId();
  const incomeErrorId = useId();
  const employmentErrorId = useId();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-navy-900">Dina uppgifter</h2>

      {/* ✅ GOOD: Input with visible label and error association */}
      <div>
        <label htmlFor={personnummerId} className="block text-sm font-medium text-gray-700 mb-1">
          Personnummer
        </label>
        <input
          type="text"
          id={personnummerId}
          placeholder="ÅÅÅÅMMDD-XXXX"
          value={formData.personnummer}
          onChange={(e) => setFormData({ ...formData, personnummer: e.target.value })}
          className={`input-focus ${errors.personnummer ? 'border-error-500' : ''}`}
          aria-describedby={errors.personnummer ? personnummerErrorId : undefined}
          aria-invalid={errors.personnummer ? 'true' : undefined}
          autoComplete="off"
          required
          aria-required="true"
        />
        {errors.personnummer && (
          <p id={personnummerErrorId} className="text-error-500 text-sm mt-1" role="alert">
            {errors.personnummer}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={incomeId} className="block text-sm font-medium text-gray-700 mb-1">
          Årsinkomst före skatt
        </label>
        <input
          type="text"
          id={incomeId}
          placeholder="t.ex. 450000"
          value={formData.income}
          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
          className={`input-focus ${errors.income ? 'border-error-500' : ''}`}
          aria-describedby={errors.income ? incomeErrorId : undefined}
          aria-invalid={errors.income ? 'true' : undefined}
          required
          aria-required="true"
        />
        {errors.income && (
          <p id={incomeErrorId} className="text-error-500 text-sm mt-1" role="alert">
            {errors.income}
          </p>
        )}
      </div>

      {/* ✅ GOOD: Real radio buttons with fieldset, legend, and error association */}
      <fieldset
        aria-describedby={errors.employment ? employmentErrorId : undefined}
        aria-invalid={errors.employment ? 'true' : undefined}
        aria-required="true"
      >
        <legend className="text-sm font-medium text-gray-700 mb-2">Anställningsform</legend>
        <div className="space-y-2">
          {[
            { value: 'permanent', label: 'Tillsvidareanställning' },
            { value: 'temporary', label: 'Vikariat/tidsbegränsad' },
            { value: 'self', label: 'Egen företagare' },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                formData.employment === option.value
                  ? 'border-navy-700 bg-navy-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="employment"
                value={option.value}
                checked={formData.employment === option.value}
                onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                className="w-4 h-4 text-navy-700 focus:ring-navy-500"
              />
              <span className="text-sm text-navy-900">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.employment && (
          <p id={employmentErrorId} className="text-error-500 text-sm mt-2" role="alert">
            {errors.employment}
          </p>
        )}
      </fieldset>
    </div>
  );
}

function V3Step3({
  formData,
  setFormData,
  errors,
  monthlyPayment,
}: {
  formData: any;
  setFormData: any;
  errors: Record<string, string>;
  monthlyPayment: number;
}) {
  const termsId = useId();
  const termsErrorId = useId();

  const purposes: Record<string, string> = {
    renovation: 'Renovering',
    car: 'Bil',
    consolidate: 'Samla lån',
    other: 'Övrigt',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-navy-900">Bekräfta din ansökan</h2>

      {/* Summary with proper description list */}
      <div className="bg-gray-50 rounded-lg p-4">
        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="text-gray-600">Lånebelopp</dt>
            <dd className="font-medium text-navy-900">{formatSEK(formData.amount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Återbetalningstid</dt>
            <dd className="font-medium text-navy-900">{formData.duration} år</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Lånesyfte</dt>
            <dd className="font-medium text-navy-900">{purposes[formData.purpose] || '-'}</dd>
          </div>
          <div className="flex justify-between border-t pt-3">
            <dt className="text-gray-600">Uppskattad månadskostnad</dt>
            <dd className="font-semibold text-navy-900">{formatSEK(monthlyPayment)}</dd>
          </div>
        </dl>
      </div>

      {/* ✅ GOOD: Real checkbox with proper label */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            id={termsId}
            checked={formData.acceptTerms}
            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
            className="w-4 h-4 mt-0.5 text-navy-700 border-gray-300 rounded focus:ring-navy-500"
            aria-describedby={errors.acceptTerms ? termsErrorId : undefined}
            aria-invalid={errors.acceptTerms ? 'true' : undefined}
          />
          <span className="text-sm text-gray-600">
            Jag har läst och godkänner{' '}
            <a href="/v3/terms" className="text-accent-500 hover:text-accent-600 underline focus-ring rounded">
              lånevillkoren
            </a>{' '}
            och{' '}
            <a href="/v3/privacy" className="text-accent-500 hover:text-accent-600 underline focus-ring rounded">
              personuppgiftspolicyn
            </a>
          </span>
        </label>
        {errors.acceptTerms && (
          <p id={termsErrorId} className="text-error-500 text-sm mt-2" role="alert">
            {errors.acceptTerms}
          </p>
        )}
      </div>
    </div>
  );
}

function calculateMonthlyPayment(amount: number, years: number): number {
  const rate = 0.045 / 12;
  const payments = years * 12;
  return (amount * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
}
