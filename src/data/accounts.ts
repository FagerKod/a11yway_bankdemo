export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'loan';
  accountNumber: string;
  balance: number;
  currency: string;
}

/**
 * Mock accounts for the demo
 * Swedish account types and SEK currency
 */
export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Lönekonto',
    type: 'checking',
    accountNumber: '1234-56 789 01',
    balance: 45231.5,
    currency: 'SEK',
  },
  {
    id: '2',
    name: 'Sparkonto',
    type: 'savings',
    accountNumber: '8765-43 210 98',
    balance: 128450.0,
    currency: 'SEK',
  },
];

/**
 * Get total balance across all accounts
 */
export function getTotalBalance(accounts: Account[]): number {
  return accounts.reduce((sum, account) => sum + account.balance, 0);
}
