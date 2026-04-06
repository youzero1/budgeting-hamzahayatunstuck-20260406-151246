export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Other Income'
  | 'Food & Dining'
  | 'Housing'
  | 'Transportation'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Utilities'
  | 'Education'
  | 'Other Expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
}

export const INCOME_CATEGORIES: Category[] = [
  'Salary',
  'Freelance',
  'Investment',
  'Other Income'
];

export const EXPENSE_CATEGORIES: Category[] = [
  'Food & Dining',
  'Housing',
  'Transportation',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Utilities',
  'Education',
  'Other Expense'
];

export const CATEGORY_COLORS: Record<Category, string> = {
  'Salary': '#4caf50',
  'Freelance': '#8bc34a',
  'Investment': '#00bcd4',
  'Other Income': '#009688',
  'Food & Dining': '#ff5722',
  'Housing': '#9c27b0',
  'Transportation': '#ff9800',
  'Entertainment': '#e91e63',
  'Healthcare': '#f44336',
  'Shopping': '#3f51b5',
  'Utilities': '#607d8b',
  'Education': '#795548',
  'Other Expense': '#9e9e9e'
};
