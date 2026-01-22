export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: 'groceries' | 'entertainment' | 'income' | 'transport' | 'shopping' | 'utilities' | 'transfer';
  amount: number;
  accountId: string;
}

/**
 * Mock transactions for the demo
 * Swedish merchants and descriptions
 */
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'ICA Maxi Lindhagen',
    category: 'groceries',
    amount: -892.0,
    accountId: '1',
  },
  {
    id: '2',
    date: '2024-01-14',
    description: 'Spotify Premium',
    category: 'entertainment',
    amount: -119.0,
    accountId: '1',
  },
  {
    id: '3',
    date: '2024-01-12',
    description: 'Lön - Techbolaget AB',
    category: 'income',
    amount: 32500.0,
    accountId: '1',
  },
  {
    id: '4',
    date: '2024-01-10',
    description: 'SL Månadskort',
    category: 'transport',
    amount: -970.0,
    accountId: '1',
  },
  {
    id: '5',
    date: '2024-01-08',
    description: 'Systembolaget',
    category: 'shopping',
    amount: -456.0,
    accountId: '1',
  },
  {
    id: '6',
    date: '2024-01-07',
    description: 'Netflix',
    category: 'entertainment',
    amount: -149.0,
    accountId: '1',
  },
  {
    id: '7',
    date: '2024-01-05',
    description: 'Coop Konsum',
    category: 'groceries',
    amount: -567.5,
    accountId: '1',
  },
  {
    id: '8',
    date: '2024-01-04',
    description: 'Överföring till sparkonto',
    category: 'transfer',
    amount: -5000.0,
    accountId: '1',
  },
  {
    id: '9',
    date: '2024-01-03',
    description: 'Stockholms Stad - Parkering',
    category: 'transport',
    amount: -45.0,
    accountId: '1',
  },
  {
    id: '10',
    date: '2024-01-02',
    description: 'H&M Drottninggatan',
    category: 'shopping',
    amount: -799.0,
    accountId: '1',
  },
];

/**
 * Get category label in Swedish
 */
export function getCategoryLabel(category: Transaction['category']): string {
  const labels: Record<Transaction['category'], string> = {
    groceries: 'Matvaror',
    entertainment: 'Nöje',
    income: 'Inkomst',
    transport: 'Transport',
    shopping: 'Shopping',
    utilities: 'Räkningar',
    transfer: 'Överföring',
  };
  return labels[category];
}
