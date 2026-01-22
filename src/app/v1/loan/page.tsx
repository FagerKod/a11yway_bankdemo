'use client';

import { useState } from 'react';
import { formatSEK } from '@/lib/formatters';

/**
 * ❌ V1 LOAN PAGE - ACCESSIBILITY ISSUES
 *
 * This page demonstrates common accessibility anti-patterns:
 *
 * 1. Progress indicator is visual-only
 * 2. Slider is a custom div, not keyboard accessible
 * 3. Error messages not announced or associated with fields
 * 4. Help tooltips are hover-only
 * 5. Focus gets lost when moving between steps
 * 6. Terms checkbox is a styled div
 * 7. Error messages are vague
 */
export default function V1LoanPage() {
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
        newErrors.purpose = 'Välj ett alternativ';
      }
    } else if (step === 1) {
      if (!formData.personnummer) {
        newErrors.personnummer = 'Obligatoriskt fält';
      }
      if (!formData.income) {
        newErrors.income = 'Obligatoriskt fält';
      }
      if (!formData.employment) {
        newErrors.employment = 'Välj ett alternativ';
      }
    } else if (step === 2) {
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Du måste godkänna';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // ❌ BAD: Focus is not managed when changing steps
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
      <div className="text-2xl font-semibold text-navy-900 mb-2">
        Ansök om lån
      </div>
      <div className="text-gray-500 mb-8">
        Fyll i formuläret nedan för att ansöka om ett privatlån
      </div>

      {/* ❌ BAD: Progress indicator is visual-only */}
      <V1StepIndicator steps={steps} currentStep={currentStep} />

      <div className="card p-6 mt-6">
        {currentStep === 0 && (
          <V1Step1
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            monthlyPayment={monthlyPayment}
          />
        )}
        {currentStep === 1 && (
          <V1Step2
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <V1Step3
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            monthlyPayment={monthlyPayment}
          />
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentStep > 0 ? (
            <div
              className="btn-secondary cursor-pointer"
              onClick={handleBack}
            >
              ← Tillbaka
            </div>
          ) : (
            <div />
          )}

          {currentStep < steps.length - 1 ? (
            <div
              className="btn-primary cursor-pointer"
              onClick={handleNext}
            >
              Nästa →
            </div>
          ) : (
            <div
              className="btn-primary cursor-pointer"
              onClick={handleSubmit}
            >
              Skicka ansökan
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ❌ V1 STEP INDICATOR - VISUAL ONLY
 */
function V1StepIndicator({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    // ❌ BAD: No ARIA, no screen reader context
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          {/* Step circle */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStep
                ? 'bg-navy-700 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {index + 1}
          </div>
          {/* Step label - hidden on mobile */}
          <div
            className={`hidden sm:block ml-2 text-sm ${
              index === currentStep ? 'text-navy-900 font-medium' : 'text-gray-500'
            }`}
          >
            {step}
          </div>
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-1 mx-2 ${
                index < currentStep ? 'bg-navy-700' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function V1Step1({
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
  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-navy-900">Välj lånebelopp</div>

      {/* ❌ BAD: Custom slider that is not keyboard accessible */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Belopp</span>
          <span className="font-medium text-navy-900">{formatSEK(formData.amount)}</span>
        </div>
        {/* ❌ BAD: This slider is mouse-only, no keyboard support */}
        <div
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const amount = Math.round((percent * 450000 + 50000) / 10000) * 10000;
            setFormData({ ...formData, amount: Math.max(50000, Math.min(500000, amount)) });
          }}
        >
          <div
            className="absolute h-full bg-navy-700 rounded-full"
            style={{ width: `${((formData.amount - 50000) / 450000) * 100}%` }}
          />
          <div
            className="absolute w-5 h-5 bg-white border-2 border-navy-700 rounded-full -top-1.5 -translate-x-1/2"
            style={{ left: `${((formData.amount - 50000) / 450000) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>50 000 kr</span>
          <span>500 000 kr</span>
        </div>
      </div>

      {/* Duration slider */}
      <div>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Återbetalningstid</span>
          <span className="font-medium text-navy-900">{formData.duration} år</span>
        </div>
        <div
          className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const duration = Math.round(percent * 9 + 1);
            setFormData({ ...formData, duration: Math.max(1, Math.min(10, duration)) });
          }}
        >
          <div
            className="absolute h-full bg-navy-700 rounded-full"
            style={{ width: `${((formData.duration - 1) / 9) * 100}%` }}
          />
          <div
            className="absolute w-5 h-5 bg-white border-2 border-navy-700 rounded-full -top-1.5 -translate-x-1/2"
            style={{ left: `${((formData.duration - 1) / 9) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1 år</span>
          <span>10 år</span>
        </div>
      </div>

      {/* Purpose dropdown */}
      <div>
        <div className="text-sm text-gray-500 mb-2">
          Lånesyfte
          {/* ❌ BAD: Help tooltip is hover-only */}
          <span className="ml-1 text-gray-400 cursor-help" title="Varför behöver vi veta detta?">
            ⓘ
          </span>
        </div>
        {/* ❌ BAD: No label association */}
        <select
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          className="input-base"
        >
          <option value="">Välj syfte...</option>
          <option value="renovation">Renovering</option>
          <option value="car">Bil</option>
          <option value="consolidate">Samla lån</option>
          <option value="other">Övrigt</option>
        </select>
        {/* ❌ BAD: Error not associated with field */}
        {errors.purpose && (
          <div className="text-red-500 text-sm mt-1">{errors.purpose}</div>
        )}
      </div>

      {/* Loan calculator result */}
      <div className="bg-navy-50 rounded-lg p-4">
        <div className="text-sm text-gray-600">Uppskattad månadskostnad</div>
        <div className="text-2xl font-semibold text-navy-900">
          {formatSEK(monthlyPayment)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Ränta från 4,5% (individuellt baserad på kreditprövning)
        </div>
      </div>
    </div>
  );
}

function V1Step2({
  formData,
  setFormData,
  errors,
}: {
  formData: any;
  setFormData: any;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-navy-900">Dina uppgifter</div>

      {/* ❌ BAD: No visible labels, just placeholders */}
      <div>
        <input
          type="text"
          placeholder="Personnummer (ÅÅÅÅMMDD-XXXX)"
          value={formData.personnummer}
          onChange={(e) => setFormData({ ...formData, personnummer: e.target.value })}
          className="input-base"
        />
        {errors.personnummer && (
          <div className="text-red-500 text-sm mt-1">{errors.personnummer}</div>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Årsinkomst före skatt"
          value={formData.income}
          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
          className="input-base"
        />
        {errors.income && (
          <div className="text-red-500 text-sm mt-1">{errors.income}</div>
        )}
      </div>

      {/* ❌ BAD: Radio buttons are styled divs */}
      <div>
        <div className="text-sm text-gray-500 mb-2">Anställningsform</div>
        <div className="space-y-2">
          {[
            { value: 'permanent', label: 'Tillsvidareanställning' },
            { value: 'temporary', label: 'Vikariat/tidsbegränsad' },
            { value: 'self', label: 'Egen företagare' },
          ].map((option) => (
            <div
              key={option.value}
              className={`p-3 border rounded-lg cursor-pointer ${
                formData.employment === option.value
                  ? 'border-navy-700 bg-navy-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setFormData({ ...formData, employment: option.value })}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.employment === option.value
                      ? 'border-navy-700'
                      : 'border-gray-300'
                  }`}
                >
                  {formData.employment === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-navy-700" />
                  )}
                </div>
                <span className="text-sm text-navy-900">{option.label}</span>
              </div>
            </div>
          ))}
        </div>
        {errors.employment && (
          <div className="text-red-500 text-sm mt-1">{errors.employment}</div>
        )}
      </div>
    </div>
  );
}

function V1Step3({
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
  const purposes: Record<string, string> = {
    renovation: 'Renovering',
    car: 'Bil',
    consolidate: 'Samla lån',
    other: 'Övrigt',
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-medium text-navy-900">Bekräfta din ansökan</div>

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

      {/* ❌ BAD: Fake checkbox using div */}
      <div
        className="flex items-start gap-3 cursor-pointer"
        onClick={() => setFormData({ ...formData, acceptTerms: !formData.acceptTerms })}
      >
        <div
          className={`w-5 h-5 mt-0.5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
            formData.acceptTerms
              ? 'bg-navy-700 border-navy-700'
              : 'border-gray-300 bg-white'
          }`}
        >
          {formData.acceptTerms && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div className="text-sm text-gray-600">
          Jag har läst och godkänner{' '}
          <span className="text-accent-500 cursor-pointer">lånevillkoren</span> och{' '}
          <span className="text-accent-500 cursor-pointer">personuppgiftspolicyn</span>
        </div>
      </div>
      {errors.acceptTerms && (
        <div className="text-red-500 text-sm">{errors.acceptTerms}</div>
      )}
    </div>
  );
}

function calculateMonthlyPayment(amount: number, years: number): number {
  const rate = 0.045 / 12; // 4.5% annual rate, monthly
  const payments = years * 12;
  return (amount * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
}
