'use client';

import { Transaction } from '@/types/transaction';

interface Props {
  transactions: Transaction[];
}

export default function MonthlySummary({ transactions }: Props) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary-cards">
      <div className="summary-card income">
        <div className="label">Total Income</div>
        <div className="amount">${totalIncome.toFixed(2)}</div>
      </div>
      <div className="summary-card expense">
        <div className="label">Total Expenses</div>
        <div className="amount">${totalExpenses.toFixed(2)}</div>
      </div>
      <div className="summary-card balance">
        <div className="label">Balance</div>
        <div
          className="amount"
          style={{ color: balance >= 0 ? '#1565c0' : '#c62828' }}
        >
          {balance >= 0 ? '' : '−'}${Math.abs(balance).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
