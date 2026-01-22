'use client';

import { useState } from 'react';
import { mockAccounts } from '@/data/accounts';
import { mockTransactions } from '@/data/transactions';
import { mockUser, getFullName } from '@/data/users';
import { formatSEK } from '@/lib/formatters';

/**
 * ❌ V1 ACCOUNT PAGE - ACCESSIBILITY ISSUES
 *
 * This page demonstrates common accessibility anti-patterns:
 *
 * 1. Transaction table uses divs instead of <table>
 * 2. Color-only indicators for income/expense (red/green)
 * 3. Tabs are styled divs with no ARIA roles
 * 4. Icon buttons have no accessible names
 * 5. Chart has no text alternative
 * 6. Balance cards lack proper structure
 */
export default function V1AccountPage() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Översikt', 'Transaktioner', 'Dokument'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Greeting */}
      <div className="mb-8">
        <div className="text-2xl font-semibold text-navy-900">
          Hej, {getFullName(mockUser)}
        </div>
        <div className="text-gray-500">Välkommen tillbaka</div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {mockAccounts.map((account) => (
          // ❌ BAD: No semantic structure, just styled divs
          <div key={account.id} className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-500">{account.name}</div>
                <div className="text-2xl font-semibold text-navy-900 mt-1">
                  {formatSEK(account.balance)}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {account.accountNumber}
                </div>
              </div>
              {/* ❌ BAD: Icon button with no accessible name */}
              <div
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => {}}
              >
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ❌ BAD: Tabs using divs with no ARIA roles or keyboard support */}
      <div className="card">
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                className={`px-6 py-4 cursor-pointer text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === index
                    ? 'border-navy-700 text-navy-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === 0 && <V1OverviewTab />}
          {activeTab === 1 && <V1TransactionsTab />}
          {activeTab === 2 && <V1DocumentsTab />}
        </div>
      </div>
    </div>
  );
}

function V1OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <div>
        <div className="text-lg font-medium text-navy-900 mb-4">
          Snabbåtgärder
        </div>
        <div className="flex gap-3">
          {/* ❌ BAD: Buttons are divs */}
          <div className="btn-secondary cursor-pointer">Överföring</div>
          <div className="btn-secondary cursor-pointer">Betala</div>
          <div className="btn-secondary cursor-pointer">Swish</div>
        </div>
      </div>

      {/* Spending chart */}
      <div>
        <div className="text-lg font-medium text-navy-900 mb-4">
          Utgifter denna månad
        </div>
        {/* ❌ BAD: Chart with no text alternative */}
        <V1SpendingChart />
      </div>

      {/* Recent transactions preview */}
      <div>
        <div className="text-lg font-medium text-navy-900 mb-4">
          Senaste transaktioner
        </div>
        <V1TransactionList transactions={mockTransactions.slice(0, 5)} />
      </div>
    </div>
  );
}

function V1TransactionsTab() {
  return (
    <div>
      {/* ❌ BAD: Filter/action buttons with no accessible names */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-medium text-navy-900">
          Alla transaktioner
        </div>
        <div className="flex gap-2">
          {/* ❌ BAD: Icon-only buttons with no labels */}
          <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </div>
        </div>
      </div>

      <V1TransactionList transactions={mockTransactions} />
    </div>
  );
}

function V1DocumentsTab() {
  const documents = [
    { name: 'Kontoutdrag januari 2024', date: '2024-01-31', type: 'PDF' },
    { name: 'Kontoutdrag december 2023', date: '2023-12-31', type: 'PDF' },
    { name: 'Årsbesked 2023', date: '2024-01-15', type: 'PDF' },
  ];

  return (
    <div>
      <div className="text-lg font-medium text-navy-900 mb-4">
        Dina dokument
      </div>
      <div className="space-y-2">
        {documents.map((doc, index) => (
          // ❌ BAD: Clickable div instead of button/link
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => {}}
          >
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
              </svg>
              <div>
                <div className="font-medium text-navy-900">{doc.name}</div>
                <div className="text-sm text-gray-500">{doc.date}</div>
              </div>
            </div>
            {/* ❌ BAD: Download icon with no accessible name */}
            <div className="p-2 hover:bg-gray-200 rounded-lg">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ❌ V1 TRANSACTION LIST - ACCESSIBILITY ISSUES
 *
 * Problems:
 * 1. Uses divs instead of proper <table>
 * 2. Color is the only indicator for income vs expense
 * 3. No proper headers
 * 4. No screen reader context
 */
function V1TransactionList({ transactions }: { transactions: typeof mockTransactions }) {
  return (
    // ❌ BAD: Using divs instead of <table>
    <div className="divide-y divide-gray-100">
      {/* ❌ BAD: Headers are just styled divs, not <th> */}
      <div className="grid grid-cols-3 gap-4 py-3 text-sm font-medium text-gray-500">
        <div>Datum</div>
        <div>Beskrivning</div>
        <div className="text-right">Belopp</div>
      </div>

      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="grid grid-cols-3 gap-4 py-3 text-sm"
        >
          <div className="text-gray-600">{transaction.date}</div>
          <div className="text-navy-900">{transaction.description}</div>
          {/* ❌ BAD: Color-only indication of income (green) vs expense (red) */}
          <div
            className={`text-right font-medium ${
              transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {transaction.amount >= 0 ? '+' : ''}
            {formatSEK(transaction.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * ❌ V1 SPENDING CHART - ACCESSIBILITY ISSUES
 *
 * Problems:
 * 1. Pure visual chart with no text alternative
 * 2. No data table fallback
 * 3. Color is the only way to distinguish categories
 */
function V1SpendingChart() {
  const data = [
    { category: 'Matvaror', amount: 4500, color: 'bg-blue-500' },
    { category: 'Transport', amount: 2100, color: 'bg-green-500' },
    { category: 'Nöje', amount: 1800, color: 'bg-purple-500' },
    { category: 'Shopping', amount: 3200, color: 'bg-orange-500' },
    { category: 'Övrigt', amount: 1400, color: 'bg-gray-500' },
  ];

  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    // ❌ BAD: No role="img", no aria-label, no text alternative
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.category} className="flex items-center gap-4">
          <div className="w-24 text-sm text-gray-600">{item.category}</div>
          {/* ❌ BAD: Bar chart with no accessible value */}
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
