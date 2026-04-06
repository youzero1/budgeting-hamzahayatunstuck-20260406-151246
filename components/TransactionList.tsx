'use client';

import { Transaction, CATEGORY_COLORS } from '@/types/transaction';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions found for this period.</p>
        <p style={{ marginTop: 8 }}>Add a transaction to get started!</p>
      </div>
    );
  }

  return (
    <ul className="transaction-list">
      {transactions.map(t => (
        <li key={t.id} className="transaction-item">
          <div className="transaction-info">
            <div className="transaction-desc">
              {t.description}
              <span
                className="category-badge"
                style={{
                  background: CATEGORY_COLORS[t.category] + '22',
                  color: CATEGORY_COLORS[t.category]
                }}
              >
                {t.category}
              </span>
            </div>
            <div className="transaction-meta">
              {new Date(t.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
          <span className={`transaction-amount ${t.type}`}>
            {t.type === 'income' ? '+' : '−'}${t.amount.toFixed(2)}
          </span>
          <button
            className="btn-danger"
            onClick={() => onDelete(t.id)}
            title="Delete transaction"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
