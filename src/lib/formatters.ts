/**
 * Format a number as Swedish currency (SEK)
 * Example: 45231.50 -> "45 231,50 kr"
 */
export function formatSEK(amount: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number as Swedish currency without decimals
 * Example: 45231 -> "45 231 kr"
 */
export function formatSEKRounded(amount: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a personnummer with dash
 * Example: "198504231234" -> "19850423-1234"
 */
export function formatPersonnummer(pnr: string): string {
  const clean = pnr.replace(/\D/g, '');
  if (clean.length === 12) {
    return `${clean.slice(0, 8)}-${clean.slice(8)}`;
  }
  if (clean.length === 10) {
    // Assume 19xx for older format
    return `19${clean.slice(0, 6)}-${clean.slice(6)}`;
  }
  return pnr;
}

/**
 * Validate personnummer format (basic validation)
 * Returns true if format is valid (doesn't check Luhn)
 */
export function isValidPersonnummer(pnr: string): boolean {
  const clean = pnr.replace(/\D/g, '');
  return clean.length === 12 || clean.length === 10;
}

/**
 * Format a date in Swedish format
 * Example: "2024-01-15" -> "15 januari 2024"
 */
export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Format a date in short Swedish format
 * Example: "2024-01-15" -> "2024-01-15"
 */
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Format account number with masked digits
 * Example: "12345678" -> "**** 5678"
 */
export function formatAccountNumberMasked(accountNumber: string): string {
  const clean = accountNumber.replace(/\D/g, '');
  if (clean.length >= 4) {
    return `**** ${clean.slice(-4)}`;
  }
  return accountNumber;
}

/**
 * Format phone number in Swedish format
 * Example: "0701234567" -> "070-123 45 67"
 */
export function formatPhoneNumber(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) {
    return `${clean.slice(0, 3)}-${clean.slice(3, 6)} ${clean.slice(6, 8)} ${clean.slice(8)}`;
  }
  return phone;
}
