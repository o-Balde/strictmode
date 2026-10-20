/**
 * Expense ledger: the types and endpoints the levels refer to.
 * Read-only; your code goes in src/.
 */
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Transaction {
  id: string;
  /** Dollars, e.g. 1234.5. */
  amount: number;
  merchant: string;
  /** A calendar date, `YYYY-MM-DD`, with no time and no timezone. */
  date: string;
  employee: Employee;
  approved: boolean;
}

/** Page-based pagination. `nextPage` is null on the last page. */
export interface PaginatedResponse<TData> {
  data: TData;
  nextPage: number | null;
}

export const API = {
  /** GET → PaginatedResponse<Transaction[]>. Pages hold 5 rows and start at 0. */
  transactions: (page: number) => `/api/transactions?page=${page}`,
  /** PUT, body `{ "approved": boolean }` → 200 `{ id, approved }`. */
  approval: (transactionId: string) => `/api/transactions/${encodeURIComponent(transactionId)}/approval`,
  /** GET → Employee[]. */
  employees: "/api/employees",
  /** GET → Transaction[]: every transaction of one employee, not paginated. */
  employeeTransactions: (employeeId: string) => `/api/employees/${encodeURIComponent(employeeId)}/transactions`,
} as const;
