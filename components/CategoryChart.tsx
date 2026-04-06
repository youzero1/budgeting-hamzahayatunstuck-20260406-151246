'use client';

import { Transaction, CATEGORY_COLORS, Category } from '@/types/transaction';

interface Props {
  transactions: Transaction[];
}

export default function CategoryChart({ transactions }: Props) {
  const expenses = transactions.filter(t => t.type === 'expense');

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expense data available.</p>
      </div>
    );
  }

  const categoryTotals: Partial<Record<Category, number>> = {};
  for (const t of expenses) {
    categoryTotals[t.category] = (categoryTotals[t.category] ?? 0) + t.amount;
  }

  const entries = Object.entries(categoryTotals) as [Category, number][];
  entries.sort((a, b) => b[1] - a[1]);

  const maxAmount = entries[0]?.[1] ?? 1;

  return (
    <div>
      {entries.map(([cat, amount]) => {
        const pct = (amount / maxAmount) * 100;
        return (
          <div key={cat} className="chart-bar-container">
            <div className="chart-bar-label">
              <span>{cat}</span>
              <span>${amount.toFixed(2)}</span>
            </div>
            <div className="chart-bar-track">
              <div
                className="chart-bar-fill"
                style={{
                  width: `${pct}%`,
                  background: CATEGORY_COLORS[cat]
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
