'use client';

import { useState } from 'react';
import { Transaction, TransactionType, Category, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/types/transaction';

interface Props {
  onAdd: (t: Transaction) => void;
}

export default function AddTransactionForm({ onAdd }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<Category>('Food & Dining');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (newType === 'income') {
      setCategory('Salary');
    } else {
      setCategory('Food & Dining');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    if (!date) {
      setError('Please select a date.');
      return;
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: parsedAmount,
      type,
      category,
      date
    };

    onAdd(transaction);
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Type</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['income', 'expense'] as TransactionType[]).map(t => (
            <button
              type="button"
              key={t}
              onClick={() => handleTypeChange(t)}
              style={{
                flex: 1,
                padding: '8px',
                border: '2px solid',
                borderColor: type === t ? (t === 'income' ? '#2e7d32' : '#c62828') : '#ddd',
                borderRadius: 8,
                background: type === t ? (t === 'income' ? '#e8f5e9' : '#ffebee') : 'white',
                color: type === t ? (t === 'income' ? '#2e7d32' : '#c62828') : '#666',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              {t === 'income' ? '+ Income' : '− Expense'}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="e.g. Grocery shopping"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount ($)</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value as Category)}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      {error && (
        <p style={{ color: '#c62828', fontSize: '0.88rem', marginBottom: 8 }}>{error}</p>
      )}

      <button type="submit" className="btn btn-primary">
        Add Transaction
      </button>
    </form>
  );
}
