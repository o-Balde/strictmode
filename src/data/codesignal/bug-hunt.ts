import { p, tsx } from "../interview-prep/blocks";
import type { BugHunt } from "./types";

/**
 * The bug hunt: a working ledger with seven bugs, in the style of Ramp's
 * public front-end challenge. Each bug has its own spec and the fixes are
 * independent; that property is checked when the kit is verified.
 */
export const BUG_HUNT: BugHunt = {
  id: "ledger-bugs",
  title: "Expense ledger: seven bugs",
  intro: [
    p(
      "The other shape a company-built React test takes: a small, finished-looking app with independent bugs, each described only by its symptom. You read unfamiliar code, reproduce, find the cause, and fix it without breaking anything else. The app talks to the same mock API as the ledger mock.",
    ),
    p(
      "Read the tickets, open the preview at `?mock=ledger-bugs`, and fix them in any order. Each ticket has its own spec: `npm run level -- ledger-bugs 3` runs bug 3 only.",
    ),
  ],
  rules: [
    "Fix only the bugs; don't restyle or refactor what works.",
    "Keep every `data-testid`, and add no dependencies.",
    "The bugs are independent: no fix needs another one first.",
    "Budget about 8 minutes a bug. Skip one that stalls you and come back.",
  ],
  provided: [
    { path: "mocks/ledger-bugs/src/App.tsx", caption: "src/App.tsx" },
    { path: "mocks/ledger-bugs/src/hooks/usePaginatedTransactions.ts", caption: "src/hooks/usePaginatedTransactions.ts" },
    { path: "mocks/ledger-bugs/src/hooks/useEmployeeTransactions.ts", caption: "src/hooks/useEmployeeTransactions.ts" },
    { path: "mocks/ledger-bugs/src/components/TransactionRow.tsx", caption: "src/components/TransactionRow.tsx" },
    { path: "mocks/ledger-bugs/src/api.ts", caption: "src/api.ts" },
  ],
  solution: [
    { path: "mocks/ledger-bugs/solution/App.tsx", caption: "solution/App.tsx" },
    { path: "mocks/ledger-bugs/solution/hooks/usePaginatedTransactions.ts", caption: "solution/hooks/usePaginatedTransactions.ts" },
    { path: "mocks/ledger-bugs/solution/hooks/useEmployeeTransactions.ts", caption: "solution/hooks/useEmployeeTransactions.ts" },
  ],
  tickets: [
    {
      number: 1,
      title: "View more replaces the transactions",
      symptom: "Clicking View more shows the next five transactions, and the first five disappear.",
      expected: "The next page is added below the rows already shown.",
      hint: "Find where a page response is stored. What does the state become, and what should it become?",
      spec: "mocks/ledger-bugs/specs/bug1.test.tsx",
      fix: [
        p("The hook stores each page instead of appending it. Use the updater form, so the new page joins the latest rows, and let page 0 replace so a reload cannot duplicate."),
        tsx(
          `
setTransactions(response.data);
`,
          { caption: "Before: usePaginatedTransactions.ts", tone: "bad" },
        ),
        tsx(
          `
type Row = { id: string };
declare const response: { data: Row[] };
declare const page: number;
declare const setTransactions: Dispatch<SetStateAction<Row[]>>;

setTransactions((current) => (page === 0 ? response.data : [...current, ...response.data]));
`,
          { caption: "After", tone: "good" },
        ),
      ],
    },
    {
      number: 2,
      title: "Choosing All employees after an employee crashes the page",
      symptom: "Pick an employee, then pick All employees again: the page goes blank.",
      expected: "All employees shows the paginated transactions again, without asking the API for an empty employee.",
      hint: "What request does choosing All make? What does the API answer, and what does the app do with that answer?",
      spec: "mocks/ledger-bugs/specs/bug2.test.tsx",
      fix: [
        p(
          "Every choice, including `\"\"`, goes to `fetchByEmployee`. The API answers `400 { error }`, `getJson` never checks `response.ok`, so the error object becomes the rows and `.map` throws during render. Route All to the feed you already hold.",
        ),
        tsx(
          `
declare const byEmployee: { clear: () => void; fetchByEmployee: (id: string) => Promise<void> };
declare const setEmployeeId: (id: string) => void;

function handleEmployeeChange(id: string) {
  setEmployeeId(id);
  if (id === "") byEmployee.clear();
  else void byEmployee.fetchByEmployee(id);
}
`,
          { caption: "After: App.tsx", tone: "good" },
        ),
      ],
    },
    {
      number: 3,
      title: "An approval jumps to another transaction",
      symptom: "Approve James's first transaction, switch to Ana: her first transaction now shows as approved, though it is not.",
      expected: "Each row shows its own transaction's approval, whatever was on screen before.",
      hint: "The row keeps the approval in its own state. Which component instance does React reuse for Ana's first row, and why?",
      spec: "mocks/ledger-bugs/specs/bug3.test.tsx",
      fix: [
        p(
          "Rows are keyed by index. When the list changes, React keeps the component at position 0, and with it the `useState` value set for James's row. Key by the transaction id, so a different transaction gets a fresh row.",
        ),
        tsx(
          `
declare const rows: { id: string }[];
declare function TransactionRow(props: { transaction: { id: string } }): JSX.Element;

const before = rows.map((transaction, index) => <TransactionRow key={index} transaction={transaction} />);
const after = rows.map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />);
`,
          { caption: "App.tsx", tone: "good" },
        ),
      ],
    },
    {
      number: 4,
      title: "A slow answer for a previous employee replaces the current one",
      symptom: "Choose James, then quickly Mary: Mary's transactions appear, then James's replace them.",
      expected: "The rows always belong to the employee chosen last.",
      hint: "Two requests are in flight. Which one writes state last, and is it the one the user wants?",
      spec: "mocks/ledger-bugs/specs/bug4.test.tsx",
      fix: [
        p("Number each request and let only the newest write state. Clearing the filter counts as a newer request, so a late answer cannot reopen an employee view."),
        tsx(
          `
type Transaction = { id: string };
declare function getJson<T>(url: string): Promise<T>;

function useEmployeeTransactions() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const latestRequest = useRef(0);

  const fetchByEmployee = useCallback(async (employeeId: string) => {
    const request = ++latestRequest.current;
    try {
      const data = await getJson<Transaction[]>(\`/api/employees/\${employeeId}/transactions\`);
      if (request === latestRequest.current) setTransactions(data);
    } catch {
      if (request === latestRequest.current) setTransactions([]);
    }
  }, []);

  const clear = useCallback(() => {
    latestRequest.current += 1;
    setTransactions(null);
  }, []);

  return { transactions, fetchByEmployee, clear };
}
`,
          { caption: "After: useEmployeeTransactions.ts", tone: "good" },
        ),
      ],
    },
    {
      number: 5,
      title: "View more stays at the end of the data, and clicking it crashes",
      symptom: "After the last page, View more is still there; clicking it blanks the page.",
      expected: "View more disappears once there is no next page.",
      hint: "What does the API return on the last page? Is that value used anywhere in the button's condition?",
      spec: "mocks/ledger-bugs/specs/bug5.test.tsx",
      fix: [
        p(
          "The button only checks that rows exist. At the end, `nextPage` is `null`; clicking requests `?page=null`, gets a 400 body back as data, and crashes. Show the button only while a next page exists.",
        ),
        tsx(
          `
declare const byEmployee: { transactions: unknown[] | null };
declare const paginated: { nextPage: number | null };
declare const rows: unknown[];

const showViewMore = byEmployee.transactions === null && paginated.nextPage !== null && rows.length > 0;
`,
          { caption: "After: App.tsx", tone: "good" },
        ),
      ],
    },
    {
      number: 6,
      title: "The total never changes",
      symptom: "Total stays at $0.00 whatever is on screen.",
      expected: "Total is the sum of the transactions on screen.",
      hint: "When does the memoised total recompute?",
      spec: "mocks/ledger-bugs/specs/bug6.test.tsx",
      fix: [
        p("`useMemo` has an empty dependency list, so it computed once, on the first render, when there were no rows. Depend on `rows`, or drop the memo: summing a page of rows is cheap."),
        tsx(
          `
declare const rows: { amount: number }[];

const total = useMemo(() => rows.reduce((sum, row) => sum + row.amount, 0), [rows]);
`,
          { caption: "After: App.tsx", tone: "good" },
        ),
      ],
    },
    {
      number: 7,
      title: "The employee filter says Loading employees... until the transactions arrive",
      symptom: "Employees load quickly, but the filter stays disabled until the (slower) transactions load.",
      expected: "The filter is usable as soon as the employees are in.",
      hint: "Which loading flags feed the select's `isLoading`?",
      spec: "mocks/ledger-bugs/specs/bug7.test.tsx",
      fix: [
        p("The select waits on two unrelated requests. Give each piece of UI the loading state of the data it shows."),
        tsx(
          `
declare const employeesLoading: boolean;
declare const paginated: { loading: boolean };

const before = employeesLoading || paginated.loading;
const after = employeesLoading;
`,
          { caption: "App.tsx: the select's isLoading", tone: "good" },
        ),
      ],
    },
  ],
};
