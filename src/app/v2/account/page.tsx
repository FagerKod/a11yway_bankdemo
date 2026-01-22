'use client';

import { useState } from 'react';
import { mockAccounts } from '@/data/accounts';
import { mockTransactions } from '@/data/transactions';
import { mockUser, getFullName } from '@/data/users';
import { formatSEK } from '@/lib/formatters';

/**
 * ⚠️ V2 ACCOUNT PAGE - SEMANTIC BUT INCOMPLETE
 *
 * Improvements over v1:
 * ✅ Uses proper <table> for transactions
 * ✅ Buttons are real <button> elements
 * ✅ Headings have proper hierarchy
 *
 * Still missing:
 * ❌ Tabs don't have full ARIA roles
 * ❌ Icon buttons missing aria-label
 * ❌ Color-only indicator for income/expense
 * ❌ Chart has no text alternative
 */
export default function V2AccountPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Översikt', 'Transaktioner', 'Dokument'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ✅ GOOD: Proper heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-navy-900">
          Hej, {getFullName(mockUser)}
        </h1>
        <p className="text-gray-500">Välkommen tillbaka</p>
      </div>

      {/* Balance Cards - improved but not fully accessible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {mockAccounts.map((account) => (
          <article key={account.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm text-gray-500">{account.name}</h2>
                <p className="text-2xl font-semibold text-navy-900 mt-1">
                  {formatSEK(account.balance)}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {account.accountNumber}
                </p>
              </div>
              {/* ✅ GOOD: Real button */}
              {/* ❌ MISSING: No aria-label */}
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* ⚠️ Tabs - buttons but no ARIA tab pattern */}
      <div className="card">
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab, index) => (
              // ✅ GOOD: Using button instead of div
              // ❌ MISSING: No role="tab", aria-selected, tabpanel linking
              <button
                key={tab}
                className={`px-6 py-4 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === index
                    ? 'border-navy-700 text-navy-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 0 && <V2OverviewTab />}
          {activeTab === 1 && <V2TransactionsTab />}
          {activeTab === 2 && <V2DocumentsTab />}
        </div>
      </div>
    </div>
  );
}

function V2OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <section>
        <h3 className="text-lg font-medium text-navy-900 mb-4">
          Snabbåtgärder
        </h3>
        <div className="flex gap-3">
          {/* ✅ GOOD: Real buttons */}
          <button className="btn-secondary">Överföring</button>
          <button className="btn-secondary">Betala</button>
          <button className="btn-secondary">Swish</button>
        </div>
      </section>

      {/* Spending chart */}
      <section>
        <h3 className="text-lg font-medium text-navy-900 mb-4">
          Utgifter denna månad
        </h3>
        <V2SpendingChart />
      </section>

      {/* Recent transactions */}
      <section>
        <h3 className="text-lg font-medium text-navy-900 mb-4">
          Senaste transaktioner
        </h3>
        <V2TransactionTable transactions={mockTransactions.slice(0, 5)} />
      </section>
    </div>
  );
}

function V2TransactionsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-navy-900">
          Alla transaktioner
        </h3>
        <div className="flex gap-2">
          {/* ✅ GOOD: Real buttons */}
          {/* ❌ MISSING: No aria-label - screen readers just hear nothing */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </div>
      </div>

      <V2TransactionTable transactions={mockTransactions} />
    </div>
  );
}

function V2DocumentsTab() {
  const documents = [
    { id: '1', name: 'Kontoutdrag januari 2024', date: '2024-01-31', type: 'PDF' },
    { id: '2', name: 'Kontoutdrag december 2023', date: '2023-12-31', type: 'PDF' },
    { id: '3', name: 'Årsbesked 2023', date: '2024-01-15', type: 'PDF' },
  ];

  return (
    <section>
      <h3 className="text-lg font-medium text-navy-900 mb-4">
        Dina dokument
      </h3>
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.id}>
            {/* ✅ GOOD: Using link instead of clickable div */}
            <a
              href={`/v2/documents/${doc.id}`}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                </svg>
                <div>
                  <span className="font-medium text-navy-900">{doc.name}</span>
                  <span className="block text-sm text-gray-500">{doc.date}</span>
                </div>
              </div>
              {/* ❌ MISSING: No aria-label on download button */}
              <button
                className="p-2 hover:bg-gray-200 rounded-lg"
                onClick={(e) => e.preventDefault()}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * ⚠️ V2 TRANSACTION TABLE - SEMANTIC BUT INCOMPLETE
 *
 * ✅ Uses proper <table> with <th>
 * ❌ No scope attribute on headers
 * ❌ No caption
 * ❌ Still color-only for income/expense
 */
function V2TransactionTable({ transactions }: { transactions: typeof mockTransactions }) {
  return (
    // ✅ GOOD: Using <table> instead of divs
    <table className="w-full">
      {/* ❌ MISSING: No <caption> */}
      <thead>
        <tr className="text-left text-sm font-medium text-gray-500">
          {/* ❌ MISSING: No scope="col" */}
          <th className="py-3 pr-4">Datum</th>
          <th className="py-3 pr-4">Beskrivning</th>
          <th className="py-3 text-right">Belopp</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="text-sm">
            <td className="py-3 pr-4 text-gray-600">{transaction.date}</td>
            <td className="py-3 pr-4 text-navy-900">{transaction.description}</td>
            <td className="py-3 text-right">
              {/* ❌ STILL BAD: Color-only indication */}
              <span
                className={`font-medium ${
                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.amount >= 0 ? '+' : ''}
                {formatSEK(transaction.amount)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * ⚠️ V2 SPENDING CHART - VISUAL ONLY
 *
 * ❌ No accessible alternative
 * ❌ No role="img" or aria-label
 * ❌ No data table fallback
 */
function V2SpendingChart() {
  const data = [
    { category: 'Matvaror', amount: 4500, color: 'bg-blue-500' },
    { category: 'Transport', amount: 2100, color: 'bg-green-500' },
    { category: 'Nöje', amount: 1800, color: 'bg-purple-500' },
    { category: 'Shopping', amount: 3200, color: 'bg-orange-500' },
    { category: 'Övrigt', amount: 1400, color: 'bg-gray-500' },
  ];

  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    // ❌ MISSING: No accessible alternative for this visual chart
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.category} className="flex items-center gap-4">
          <div className="w-24 text-sm text-gray-600">{item.category}</div>
          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${item.color} rounded-full`}
              style={{ width: `${(item.amount / maxAmount) * 100}%` }}
            />
          </div>
          <div className="w-24 text-sm text-right text-navy-900">
            {formatSEK(item.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}
