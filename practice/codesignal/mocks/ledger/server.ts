import { fail, ok, type Routes } from "../../shared/mock-server";
import type { Employee, Transaction } from "./contract";
import firstPage from "./transactions.json";

export const PAGE_SIZE = 5;

export const EMPLOYEES: Employee[] = [
  { id: "e1", firstName: "James", lastName: "Smith" },
  { id: "e2", firstName: "Mary", lastName: "Jones" },
  { id: "e3", firstName: "Ana", lastName: "Lee" },
];

const [james, mary, ana] = EMPLOYEES;

/** Twelve rows: page 0 is transactions.json, then pages 1 (five rows) and 2 (two rows). */
export const TRANSACTIONS: Transaction[] = [
  ...(firstPage as Transaction[]),
  { id: "t6", amount: 45, merchant: "Figma", date: "2026-03-05", employee: ana, approved: false },
  { id: "t7", amount: 23.1, merchant: "Lyft", date: "2026-03-06", employee: james, approved: false },
  { id: "t8", amount: 10, merchant: "Notion", date: "2026-03-07", employee: mary, approved: true },
  { id: "t9", amount: 2499, merchant: "Apple", date: "2026-03-08", employee: ana, approved: false },
  { id: "t10", amount: 6.75, merchant: "Starbucks", date: "2026-03-09", employee: james, approved: false },
  { id: "t11", amount: 312.4, merchant: "Hilton", date: "2026-03-10", employee: mary, approved: false },
  { id: "t12", amount: 21, merchant: "GitHub", date: "2026-03-11", employee: ana, approved: true },
];

/**
 * A fresh server per test: approvals written with PUT are remembered, the way
 * a real backend would, but never leak into the next test.
 */
export function createRoutes(): Routes {
  const rows = TRANSACTIONS.map((transaction) => ({ ...transaction }));

  return {
    "GET /api/transactions": ({ url }) => {
      const page = Number(url.searchParams.get("page"));
      if (!Number.isInteger(page) || page < 0) return fail(400, { error: "page must be a whole number" });
      const start = page * PAGE_SIZE;
      if (start >= rows.length && page !== 0) return fail(400, { error: `Invalid page ${page}` });
      const end = start + PAGE_SIZE;
      return ok({ data: rows.slice(start, end), nextPage: end < rows.length ? page + 1 : null });
    },
    "PUT /api/transactions/:id/approval": ({ params, body }) => {
      const row = rows.find((candidate) => candidate.id === params.id);
      const approved = (body as { approved?: unknown } | undefined)?.approved;
      if (!row) return fail(404, { error: "Unknown transaction" });
      if (typeof approved !== "boolean") return fail(400, { error: "approved must be a boolean" });
      row.approved = approved;
      return ok({ id: row.id, approved });
    },
    "GET /api/employees": () => ok(EMPLOYEES),
    "GET /api/employees/:id/transactions": ({ params }) => {
      if (!params.id) return fail(400, { error: "Employee id cannot be empty" });
      return ok(rows.filter((row) => row.employee.id === params.id));
    },
  };
}
