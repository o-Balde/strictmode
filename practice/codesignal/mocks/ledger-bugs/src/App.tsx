import { useMemo, useState } from "react";
import { EmployeeSelect } from "./components/EmployeeSelect";
import { TransactionRow } from "./components/TransactionRow";
import { useEmployeeTransactions } from "./hooks/useEmployeeTransactions";
import { useEmployees } from "./hooks/useEmployees";
import { usePaginatedTransactions } from "./hooks/usePaginatedTransactions";

/**
 * EXPENSE LEDGER, BUG HUNT: your workspace.
 *
 * This app ships with seven bugs. The prep page lists each one as a ticket:
 * the symptom, and what should happen instead. Fix them in any order; each
 * has its own spec, and no fix depends on another. Rules, as in the real
 * thing: fix only the bugs, keep every data-testid, add no dependencies.
 *
 *   npm run level -- ledger-bugs 3     run bug 3's spec
 *   npm run level -- ledger-bugs       run all seven
 */
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function App() {
  const { employees, loading: employeesLoading } = useEmployees();
  const paginated = usePaginatedTransactions();
  const byEmployee = useEmployeeTransactions();
  const [employeeId, setEmployeeId] = useState("");

  const rows = byEmployee.transactions ?? paginated.transactions;
  const total = useMemo(() => rows.reduce((sum, row) => sum + row.amount, 0), []);

  function handleEmployeeChange(id: string) {
    setEmployeeId(id);
    void byEmployee.fetchByEmployee(id);
  }

  return (
    <main>
      <EmployeeSelect
        employees={employees}
        isLoading={employeesLoading || paginated.loading}
        value={employeeId}
        onChange={handleEmployeeChange}
      />

      {rows.length === 0 && paginated.loading ? <p>Loading transactions...</p> : null}

      <table>
        <tbody>
          {rows.map((transaction, index) => (
            <TransactionRow key={index} transaction={transaction} />
          ))}
        </tbody>
      </table>

      <p data-testid="ledger-total">Total: {money.format(total)}</p>

      {byEmployee.transactions === null && rows.length > 0 ? (
        <button
          type="button"
          data-testid="view-more"
          disabled={paginated.loading}
          onClick={paginated.fetchNextPage}
        >
          View more
        </button>
      ) : null}
    </main>
  );
}
