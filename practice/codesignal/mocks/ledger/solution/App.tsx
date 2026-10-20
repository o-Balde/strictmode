import { useCallback, useEffect, useRef, useState } from "react";
import { API, type Employee, type PaginatedResponse, type Transaction } from "../contract";

/**
 * EXPENSE LEDGER: reference solution, all four levels.
 *
 * Two lists and one map:
 *   - `feed`: every page loaded so far, plus the next page to ask for
 *   - `employeeView`: one employee's rows, or null when "All employees" is chosen
 *   - `approvals`: the user's own approval changes, keyed by id
 * Approvals live outside both lists because both lists are server snapshots.
 * Writing the change into one of them leaves the other stale, and the box
 * snaps back the moment the user switches views.
 */
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// "2026-03-01" parsed by `new Date` is UTC midnight, which is Feb 28 anywhere
// west of Greenwich. Formatting in UTC keeps the calendar date the API sent.
const calendarDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const formatDate = (isoDate: string) => calendarDate.format(new Date(`${isoDate}T00:00:00Z`));

interface Feed {
  rows: Transaction[];
  nextPage: number | null;
}

type Status = "loading" | "error" | "ready";

interface EmployeeView {
  status: Status;
  rows: Transaction[];
}

export default function App() {
  const [feed, setFeed] = useState<Feed>({ rows: [], nextPage: 0 });
  const [feedStatus, setFeedStatus] = useState<Status>("loading");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeView, setEmployeeView] = useState<EmployeeView | null>(null);
  const [approvals, setApprovals] = useState<Record<string, boolean>>({});
  const [approvalFailed, setApprovalFailed] = useState(false);

  // Level 3. Page 0 replaces and later pages append, so loading page 0 twice
  // (StrictMode runs mount effects twice in development) cannot duplicate rows.
  const loadPage = useCallback(async (page: number) => {
    setFeedStatus("loading");
    try {
      const { data, nextPage } = await getJson<PaginatedResponse<Transaction[]>>(API.transactions(page));
      setFeed((current) => ({ rows: page === 0 ? data : [...current.rows, ...data], nextPage }));
      setFeedStatus("ready");
    } catch {
      setFeedStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadPage(0);
  }, [loadPage]);

  // Level 4
  useEffect(() => {
    let ignore = false;
    getJson<Employee[]>(API.employees).then(
      (list) => {
        if (!ignore) setEmployees(list);
      },
      () => {
        // The filter still works with only "All employees" in it.
      },
    );
    return () => {
      ignore = true;
    };
  }, []);

  // Only the newest selection may write the employee view. Choosing A, then B,
  // must show B even when A's response arrives last.
  const latestSelection = useRef(0);
  async function selectEmployee(id: string) {
    const selection = ++latestSelection.current;
    setEmployeeId(id);
    if (id === "") {
      // "All employees" is the paginated feed we already hold, not a request.
      setEmployeeView(null);
      return;
    }
    setEmployeeView({ status: "loading", rows: [] });
    try {
      const rows = await getJson<Transaction[]>(API.employeeTransactions(id));
      if (selection === latestSelection.current) setEmployeeView({ status: "ready", rows });
    } catch {
      if (selection === latestSelection.current) setEmployeeView({ status: "error", rows: [] });
    }
  }

  // Level 2, made optimistic in Level 3: flip now, undo if the server refuses.
  async function setApproval(transaction: Transaction, approved: boolean) {
    setApprovals((current) => ({ ...current, [transaction.id]: approved }));
    setApprovalFailed(false);
    try {
      const response = await fetch(API.approval(transaction.id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      if (!response.ok) throw new Error(`PUT approval failed with ${response.status}`);
    } catch {
      setApprovals((current) => ({ ...current, [transaction.id]: !approved }));
      setApprovalFailed(true);
    }
  }

  const isApproved = (transaction: Transaction) => approvals[transaction.id] ?? transaction.approved;

  const rows = employeeView ? employeeView.rows : feed.rows;
  const status = employeeView ? employeeView.status : feedStatus;
  const initialLoad = status === "loading" && rows.length === 0;
  const retry = () => (employeeView ? void selectEmployee(employeeId) : void loadPage(feed.nextPage ?? 0));

  const approvedRows = rows.filter(isApproved);
  const showViewMore = !employeeView && feed.nextPage !== null && rows.length > 0 && status !== "error";

  return (
    <main>
      <label>
        Filter by employee{" "}
        <select
          data-testid="employee-filter"
          value={employeeId}
          onChange={(event) => void selectEmployee(event.target.value)}
        >
          <option value="">All employees</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>
      </label>

      {initialLoad ? <p data-testid="ledger-status">Loading transactions...</p> : null}

      {status === "error" ? (
        <div>
          <p role="alert" data-testid="ledger-error">
            Could not load transactions
          </p>
          <button type="button" data-testid="retry-btn" onClick={retry}>
            Retry
          </button>
        </div>
      ) : null}

      {approvalFailed ? (
        <p role="alert" data-testid="approval-error">
          Could not update approval
        </p>
      ) : null}

      {!initialLoad && status !== "error" && rows.length === 0 ? (
        <p data-testid="ledger-empty">No transactions</p>
      ) : null}

      {rows.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Approved</th>
              <th>Merchant</th>
              <th>Employee</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((transaction) => (
              <tr key={transaction.id} data-testid={`txn-${transaction.id}`}>
                <td>
                  <input
                    type="checkbox"
                    data-testid={`approve-${transaction.id}`}
                    aria-label={`Approve ${transaction.merchant}`}
                    checked={isApproved(transaction)}
                    onChange={(event) => void setApproval(transaction, event.target.checked)}
                  />
                </td>
                <td>{transaction.merchant}</td>
                <td>
                  {transaction.employee.firstName} {transaction.employee.lastName}
                </td>
                <td>{formatDate(transaction.date)}</td>
                <td>{money.format(transaction.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <p data-testid="ledger-total">Total: {money.format(sum(rows))}</p>
      <p data-testid="approved-summary">
        {approvedRows.length} of {rows.length} approved ({money.format(sum(approvedRows))})
      </p>

      {showViewMore ? (
        <button
          type="button"
          data-testid="view-more"
          disabled={status === "loading"}
          onClick={() => void loadPage(feed.nextPage ?? 0)}
        >
          {status === "loading" ? "Loading..." : "View more"}
        </button>
      ) : null}
    </main>
  );
}

const sum = (rows: readonly Transaction[]) => rows.reduce((total, row) => total + row.amount, 0);

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`GET ${url} failed with ${response.status}`);
  return (await response.json()) as T;
}
