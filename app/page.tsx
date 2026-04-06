'use client';

import { useState, useEffect } from 'react';
import AddTransactionForm from '@/components/AddTransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlySummary from '@/components/MonthlySummary';
import CategoryChart from '@/components/CategoryChart';
import { Transaction } from '@/types/transaction';

const STORAGE_KEY = 'budget_transactions';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch {
        setTransactions([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t: Transaction) => {
    setTransactions(prev => [t, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const filteredTransactions = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
  });

  const tabFiltered = filteredTransactions.filter(t => {
    if (activeTab === 'all') return true;
    return t.type === activeTab;
  });

  const years = Array.from(
    new Set([
      selectedYear - 1,
      selectedYear,
      selectedYear + 1,
      ...transactions.map(t => new Date(t.date).getFullYear())
    ])
  ).sort((a, b) => b - a);

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>💰 Budget Tracker</h1>
          <p>Manage your income and expenses with ease</p>
        </div>
      </header>
      <main className="container">
        <div className="month-selector">
          <label style={{ fontWeight: 600, color: '#555' }}>Viewing:</label>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(Number(e.target.value))}
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <MonthlySummary transactions={filteredTransactions} />

        <div className="grid">
          <div className="card">
            <h2>Add Transaction</h2>
            <AddTransactionForm onAdd={addTransaction} />
          </div>

          <div className="card">
            <h2>Category Breakdown</h2>
            <CategoryChart transactions={filteredTransactions} />
          </div>

          <div className="card full-width">
            <h2>Transactions — {MONTHS[selectedMonth]} {selectedYear}</h2>
            <div className="tab-bar">
              {(['all', 'income', 'expense'] as const).map(tab => (
                <button
                  key={tab}
                  className={`tab-btn${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <TransactionList
              transactions={tabFiltered}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </main>
    </>
  );
}
