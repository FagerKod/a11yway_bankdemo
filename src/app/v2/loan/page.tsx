'use client';

import { useState, useId } from 'react';
import { formatSEK } from '@/lib/formatters';

/**
 * ⚠️ V2 LOAN PAGE - SEMANTIC BUT INCOMPLETE
 *
 * Improvements over v1:
 * ✅ Uses native range inputs for sliders
 * ✅ Buttons are real <button> elements
 * ✅ Radio buttons are real <input type="radio">
 * ✅ Labels visible on form fields
 *
 * Still missing:
 * ❌ Progress indicator not fully accessible
 * ❌ Errors not announced (no aria-live)
 * ❌ Focus not managed between steps
 * ❌ Error messages not specific enough
 */
export default function V2LoanPage() {
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

  const steps = ['Lånebelopp', 'Personuppgifter', 'Bekräfta'];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.purpose) {
        // ❌ STILL VAGUE: Not specific enough
        newErrors.purpose = 'Fältet är obligatoriskt';
      }
    } else if (step === 1) {
      if (!formData.personnummer) {
        newErrors.personnummer = 'Fältet är obligatoriskt';
      }
      if (!formData.income) {
        newErrors.income = 'Fältet är obligatoriskt';
      }
      if (!formData.employment) {
        newErrors.employment = 'Välj ett alternativ';
      }
    } else if (step === 2) {
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Du måste godkänna villkoren';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // ❌ MISSING: No focus management
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      alert('Ansökan skickad!');
    }
  };

  const monthlyPayment = calculateMonthlyPayment(formData.amount, formData.duration);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-navy-900 mb-2">
        Ansök om lån
      </h1>
      <p className="text-gray-500 mb-8">
        Fyll i formuläret nedan för att ansöka om ett privatlån
      </p>

      {/* ⚠️ Progress indicator - better but not fully accessible */}
      <V2StepIndicator steps={steps} currentStep={currentStep} />

      <div className="card p-6 mt-6">
        {currentStep === 0 && (
          <V2Step1
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            monthlyPayment={monthlyPayment}
          />
        )}
        {currentStep === 1 && (
          <V2Step2
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <V2Step3
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            monthlyPayment={monthlyPayment}
          />
        )}

        {/* ✅ GOOD: Real buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentStep > 0 ? (
            <button onClick={handleBack} className="btn-secondary">
              ← Tillbaka
            </button>
          ) : (
            <div />
          )}

          {currentStep < steps.length - 1 ? (
            <button onClick={handleNext} className="btn-primary">
              Nästa →
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              Skicka ansökan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ⚠️ V2 STEP INDICATOR - PARTIALLY ACCESSIBLE
 */
function V2StepIndicator({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    // ✅ GOOD: Using nav and ol
    // ❌ MISSING: No aria-current, no screen reader context
    <nav aria-label="Steg i låneansökan">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep
                  ? 'bg-navy-700 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`ml-2 text-sm hidden sm:inline ${
                index === currentStep ? 'text-navy-900 font-medium' : 'text-gray-500'
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-1 mx-2 ${
                  index < currentStep ? 'bg-navy-700' : 'bg-gray-200'
                }`}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function V2Step1({
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

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-navy-900">Välj lånebelopp</h2>

      {/* ✅ GOOD: Native range input with label */}
      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor={amountId} className="text-sm text-gray-600">
            Belopp
          </label>
          <span className="font-medium text-navy-900">{formatSEK(formData.amount)}</span>
        </div>
        <input
          type="range"
          id={amountId}
          min={50000}
          max={500000}
          step={10000}
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navy-700"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
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
          <span className="font-medium text-navy-900">{formData.duration} år</span>
        </div>
        <input
          type="range"
          id={durationId}
          min={1}
          max={10}
          step={1}
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navy-700"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 år</span>
          <span>10 år</span>
        </div>
      </div>

      {/* Purpose select */}
      <div>
        <label htmlFor={purposeId} className="block text-sm text-gray-600 mb-2">
          Lånesyfte
        </label>
        <select
          id={purposeId}
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          className="input-base focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        >
          <option value="">Välj syfte...</option>
          <option value="renovation">Renovering</option>
          <option value="car">Bil</option>
          <option value="consolidate">Samla lån</option>
          <option value="other">Övrigt</option>
        </select>
        {/* ❌ ISSUE: Error not associated with field via aria-describedby */}
        {errors.purpose && (
          <p className="text-error-500 text-sm mt-1">{errors.purpose}</p>
        )}
      </div>

      {/* Loan calculator */}
      <div className="bg-navy-50 rounded-lg p-4">
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

function V2Step2({
  formData,
  setFormData,
  errors,
}: {
  formData: any;
  setFormData: any;
  errors: Record<string, string>;
}) {
  const personnummerId = useId();
  const incomeId = useId();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-navy-900">Dina uppgifter</h2>

      {/* ✅ GOOD: Visible labels */}
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
          className="input-base focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        />
        {errors.personnummer && (
          <p className="text-error-500 text-sm mt-1">{errors.personnummer}</p>
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
          className="input-base focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
        />
        {errors.income && (
          <p className="text-error-500 text-sm mt-1">{errors.income}</p>
        )}
      </div>

      {/* ✅ GOOD: Real radio buttons */}
      {/* ❌ MISSING: Should use fieldset/legend */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Anställningsform</p>
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
                className="w-4 h-4 text-navy-700"
              />
              <span className="text-sm text-navy-900">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.employment && (
          <p className="text-error-500 text-sm mt-2">{errors.employment}</p>
        )}
      </div>
    </div>
  );
}

function V2Step3({
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

  const purposes: Record<string, string> = {
    renovation: 'Renovering',
    car: 'Bil',
    consolidate: 'Samla lån',
    other: 'Övrigt',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-navy-900">Bekräfta din ansökan</h2>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Lånebelopp</span>
          <span className="font-medium text-navy-900">{formatSEK(formData.amount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Återbetalningstid</span>
          <span className="font-medium text-navy-900">{formData.duration} år</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Lånesyfte</span>
          <span className="font-medium text-navy-900">{purposes[formData.purpose] || '-'}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="text-gray-600">Uppskattad månadskostnad</span>
          <span className="font-semibold text-navy-900">{formatSEK(monthlyPayment)}</span>
        </div>
      </div>

      {/* ✅ GOOD: Real checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            id={termsId}
            checked={formData.acceptTerms}
            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
            className="w-4 h-4 mt-0.5 text-navy-700 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-600">
            Jag har läst och godkänner{' '}
            <a href="/v2/terms" className="text-accent-500 hover:text-accent-600 underline">
              lånevillkoren
            </a>{' '}
            och{' '}
            <a href="/v2/privacy" className="text-accent-500 hover:text-accent-600 underline">
              personuppgiftspolicyn
            </a>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-error-500 text-sm mt-2">{errors.acceptTerms}</p>
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
