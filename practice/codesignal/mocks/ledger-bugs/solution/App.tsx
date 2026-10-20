import { useMemo, useState } from "react";
import { EmployeeSelect } from "./components/EmployeeSelect";
import { TransactionRow } from "./components/TransactionRow";
import { useEmployeeTransactions } from "./hooks/useEmployeeTransactions";
import { useEmployees } from "./hooks/useEmployees";
import { usePaginatedTransactions } from "./hooks/usePaginatedTransactions";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function App() {
  const { employees, loading: employeesLoading } = useEmployees();
  const paginated = usePaginatedTransactions();
  const byEmployee = useEmployeeTransactions();
  const [employeeId, setEmployeeId] = useState("");

  const rows = byEmployee.transactions ?? paginated.transactions;
  const total = useMemo(() => rows.reduce((sum, row) => sum + row.amount, 0), [rows]);

  function handleEmployeeChange(id: string) {
    setEmployeeId(id);
    if (id === "") byEmployee.clear();
    else void byEmployee.fetchByEmployee(id);
  }

  return (
    <main>
      <EmployeeSelect
        employees={employees}
        isLoading={employeesLoading}
        value={employeeId}
        onChange={handleEmployeeChange}
      />

      {rows.length === 0 && paginated.loading ? <p>Loading transactions...</p> : null}

      <table>
        <tbody>
          {rows.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>

      <p data-testid="ledger-total">Total: {money.format(total)}</p>

      {byEmployee.transactions === null && paginated.nextPage !== null && rows.length > 0 ? (
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
