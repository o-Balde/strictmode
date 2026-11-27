import { java, list, output, p, say, steps, trap, ts, tsx } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

export const SB_CODING: PrepSection = {
  id: "sb-coding",
  track: "coding",
  title: "Coding round: Codility-style problems",
  blurb:
    "Candidates describe Scotiabank's online assessment as Codility: three problems, LeetCode easy to medium, 60–90 minutes, any language, and every test case must pass. Number of Islands and an intervals problem are named in reports. Solve each one out loud before opening it, then say its complexity.",
  drill: "data-structures",
  questions: [
    {
      id: "sb-code-approach",
      question: "How do you approach a timed Codility problem?",
      level: "junior",
      short:
        "Read the whole statement and the constraints, because n tells you the complexity you can afford. Write out two or three edge cases before coding. Get a correct brute force first if the optimal approach isn't obvious, then improve it. Test against your edge cases, since the hidden tests check correctness **and** performance. Leave time to read your code once more for off-by-one errors and empty input.",
      body: [
        steps(
          "Restate the problem and confirm input and output types, ranges, and whether there can be duplicates, negatives or empty input.",
          "Name the pattern: hash map, two pointers, sliding window, stack, BFS/DFS, sorting plus a sweep, binary search.",
          "Say the complexity out loud before you code.",
          "Code it cleanly with real names, and run it against the examples plus your edge cases.",
          "If it's live, keep talking: interviewers reported that they want you to explain your solution while you write it.",
        ),
        list(
          "n ≤ 10^3 → O(n²) is fine. n ≤ 10^5–10^6 → you need O(n log n) or O(n).",
          "Codility shows a few example tests. The hidden ones include large inputs and extreme values.",
        ),
      ],
    },
    {
      id: "sb-code-two-sum",
      question: "Two Sum: return the indexes of two numbers that add up to a target.",
      level: "junior",
      short:
        "One pass with a hash map from value to index. For each number, check whether `target - n` has already been seen. That is O(n) time and O(n) space, against the O(n²) brute force over all pairs.",
      body: [
        ts(`
function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const j = seen.get(target - nums[i]);
    if (j !== undefined) return [j, i];
    seen.set(nums[i], i);
  }
  return null;
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([1, 2], 7));
`),
        output(`
[ 0, 1 ]
[ 1, 2 ]
null
`),
        java(`
static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        Integer j = seen.get(target - nums[i]);
        if (j != null) return new int[] { j, i };
        seen.put(nums[i], i);
    }
    return new int[0];
}
`),
      ],
    },
    {
      id: "sb-code-brackets",
      question: "Check whether a string's brackets are balanced.",
      level: "junior",
      short:
        "Use a stack. Push each opener. On a closer, pop and check that it matches. At the end the stack must be empty. That is O(n) time and O(n) space. The edge cases are a closer with an empty stack, and leftover openers.",
      body: [
        ts(`
function isBalanced(s: string): boolean {
  const opener: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else if (ch in opener && stack.pop() !== opener[ch]) return false;
  }
  return stack.length === 0;
}

console.log(isBalanced("{[()()]}"), isBalanced("([)]"), isBalanced("(("));
`),
        output("true false false"),
      ],
    },
    {
      id: "sb-code-islands",
      question: "Number of Islands: count connected groups of land in a grid.",
      level: "intermediate",
      short:
        "Scan every cell. When you find unvisited land, count one island and flood-fill the whole island with BFS or DFS, marking it visited so it isn't counted again. That is O(rows × cols) time. An iterative stack avoids recursion-depth limits on large grids. A candidate reported this exact problem in a Scotiabank intern assessment.",
      body: [
        ts(`
function numIslands(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let islands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== "1") continue;
      islands++;
      grid[r][c] = "0"; // mark visited (say so: this mutates the input)
      const stack: [number, number][] = [[r, c]];
      while (stack.length > 0) {
        const [cr, cc] = stack.pop()!;
        for (const [dr, dc] of directions) {
          const nr = cr + dr;
          const nc = cc + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === "1") {
            grid[nr][nc] = "0";
            stack.push([nr, nc]);
          }
        }
      }
    }
  }
  return islands;
}

console.log(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ]),
);
`),
        output("3"),
        java(`
static int numIslands(char[][] grid) {
    int islands = 0;
    for (int r = 0; r < grid.length; r++)
        for (int c = 0; c < grid[0].length; c++)
            if (grid[r][c] == '1') { islands++; sink(grid, r, c); }
    return islands;
}

static void sink(char[][] grid, int r, int c) {
    Deque<int[]> stack = new ArrayDeque<>();
    stack.push(new int[] { r, c });
    grid[r][c] = '0';
    int[][] dirs = { {1, 0}, {-1, 0}, {0, 1}, {0, -1} };
    while (!stack.isEmpty()) {
        int[] cell = stack.pop();
        for (int[] d : dirs) {
            int nr = cell[0] + d[0], nc = cell[1] + d[1];
            if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == '1') {
                grid[nr][nc] = '0';
                stack.push(new int[] { nr, nc });
            }
        }
    }
}
`),
      ],
      followUps: [
        {
          q: "What if you may not change the input?",
          a: "Keep a separate `visited` array of booleans, or a `Set` of `r,c` keys. It costs O(rows × cols) extra space.",
        },
      ],
    },
    {
      id: "sb-code-intervals",
      question: "Merge overlapping intervals (e.g. maintenance windows).",
      level: "intermediate",
      short:
        "Sort by start time, then sweep. If the next interval starts at or before the current one ends, extend the current end. Otherwise start a new interval. That is O(n log n) for the sort and O(n) for the sweep. A report mentions a long final-round interview on a single 'hard intervals' problem, so also know its relatives: insert an interval, minimum meeting rooms, and free time across schedules.",
      body: [
        ts(`
function merge(intervals: [number, number][]): [number, number][] {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [start, end] of sorted) {
    const last = merged.at(-1);
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}

console.log(JSON.stringify(merge([[1, 3], [8, 10], [2, 6], [15, 18], [17, 20]])));
`),
        output("[[1,6],[8,10],[15,20]]"),
        p("For minimum meeting rooms, sort the start times and the end times separately and walk both with two pointers. A room frees up whenever the earliest end is at or before the next start, and the answer is the peak number of rooms in use. That is also O(n log n)."),
      ],
    },
    {
      id: "sb-code-stock",
      question: "Best time to buy and sell a stock once.",
      level: "junior",
      short:
        "Track the lowest price seen so far and the best profit from selling today. One pass: O(n) time, O(1) space. If prices only fall, return 0.",
      body: [
        ts(`
function maxProfit(prices: number[]): number {
  let lowest = Infinity;
  let best = 0;
  for (const price of prices) {
    lowest = Math.min(lowest, price);
    best = Math.max(best, price - lowest);
  }
  return best;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]), maxProfit([7, 6, 4, 3, 1]));
`),
        output("5 0"),
      ],
    },
    {
      id: "sb-code-fibonacci",
      question: "Write Fibonacci. Why is the naive recursion slow?",
      level: "junior",
      short:
        "Naive recursion recomputes the same subproblems again and again: O(2^n). Memoisation caches each result, giving O(n). The iterative version keeps only the last two values, O(n) time and O(1) space. Past `fib(78)` the values exceed `Number.MAX_SAFE_INTEGER`, so use `BigInt` in JavaScript or `long`/`BigInteger` in Java. A Scotiabank candidate reported this question.",
      body: [
        ts(`
function fib(n: number): bigint {
  let [a, b] = [0n, 1n];
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

const memo = new Map<number, number>();
function fibMemo(n: number): number {
  if (n < 2) return n;
  const cached = memo.get(n);
  if (cached !== undefined) return cached;
  const value = fibMemo(n - 1) + fibMemo(n - 2);
  memo.set(n, value);
  return value;
}

console.log([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(fibMemo).join(" "));
console.log(fib(90).toString());
`),
        output(`
0 1 1 2 3 5 8 13 21 34
2880067194370816120
`),
      ],
    },
    {
      id: "sb-code-sliding-window",
      question: "Longest substring without repeating characters.",
      level: "intermediate",
      short:
        "Use a sliding window with a map from each character to the index where it was last seen. When the current character already appears inside the window, move the window's start past that occurrence. Track the best window length. O(n) time.",
      body: [
        ts(`
function longestUnique(s: string): number {
  const lastSeen = new Map<string, number>();
  let start = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const previous = lastSeen.get(s[i]);
    if (previous !== undefined && previous >= start) start = previous + 1;
    lastSeen.set(s[i], i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}

console.log(longestUnique("abcabcbb"), longestUnique("bbbbb"), longestUnique("pwwkew"));
`),
        output("3 1 3"),
      ],
    },
    {
      id: "sb-code-hash-counting",
      question: "Group anagrams, and find the first non-repeating character.",
      level: "junior",
      short:
        "Both are hash-map counting problems. For anagrams, the key is the word's letters sorted (O(k log k) per word), or a count of each letter (O(k)). For the first unique character, count every character in one pass, then return the first one with a count of 1 in a second pass. Both are O(n).",
      body: [
        ts(`
function groupAnagrams(words: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const word of words) {
    const key = [...word].sort().join("");
    groups.set(key, [...(groups.get(key) ?? []), word]);
  }
  return [...groups.values()];
}

function firstUnique(s: string): string | null {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (const ch of s) if (counts.get(ch) === 1) return ch;
  return null;
}

console.log(JSON.stringify(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])));
console.log(firstUnique("abacabad"), firstUnique("aabb"));
`),
        output(`
[["eat","tea","ate"],["tan","nat"],["bat"]]
c null
`),
      ],
    },
    {
      id: "sb-code-aggregate",
      question: "Given a list of transactions, total them per client per day.",
      level: "junior",
      short:
        "Group with a map keyed on `clientId` plus the calendar day, summing integer cents. Decide which time zone defines 'day' (UTC, or the client's) and say so. Keep money in integers. A `Map` keeps insertion order, which makes the output deterministic. RBC candidates report this exact shape of problem, and it is the bread and butter of wealth platforms.",
      body: [
        ts(`
interface Txn {
  clientId: string;
  at: string; // ISO timestamp, UTC
  amountCents: number;
}

const txns: Txn[] = [
  { clientId: "c-1", at: "2026-11-24T09:15:00Z", amountCents: 12_500 },
  { clientId: "c-2", at: "2026-11-24T10:00:00Z", amountCents: -4_000 },
  { clientId: "c-1", at: "2026-11-24T16:40:00Z", amountCents: -2_500 },
  { clientId: "c-1", at: "2026-11-25T08:05:00Z", amountCents: 1_000 },
];

function dailyTotals(list: Txn[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const t of list) {
    const key = \`\${t.clientId}|\${t.at.slice(0, 10)}\`; // UTC calendar day
    totals.set(key, (totals.get(key) ?? 0) + t.amountCents);
  }
  return totals;
}

for (const [key, cents] of dailyTotals(txns)) console.log(key, (cents / 100).toFixed(2));
`),
        output(`
c-1|2026-11-24 100.00
c-2|2026-11-24 -40.00
c-1|2026-11-25 10.00
`),
        p("Follow-up: 'top K clients by total debits'. Aggregate the same way, then sort and slice, O(n log n). Or keep a min-heap of size K, O(n log K). In SQL: `GROUP BY` + `ORDER BY ... LIMIT K`."),
      ],
    },
    {
      id: "sb-code-sin",
      question: "Validate a Canadian Social Insurance Number.",
      level: "junior",
      short:
        "A SIN is 9 digits with a Luhn check digit. Strip spaces and dashes and require exactly 9 digits. Double every second digit from the left (positions 2, 4, 6, 8), subtract 9 from any result above 9, and add everything up. The total must be divisible by 10. That is O(1). Onboarding forms run exactly this check before a SIN reaches the server, where it is checked again.",
      body: [
        ts(`
function isValidSin(input: string): boolean {
  const digits = input.replace(/[\\s-]/g, "");
  if (!/^\\d{9}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let d = Number(digits[i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

console.log(isValidSin("046 454 286"), isValidSin("046-454-287"), isValidSin("12345678"));
`),
        output("true false false"),
        list(
          "A valid checksum only proves the number is well-formed, not that it belongs to this person. Identity is verified separately.",
          "A SIN starting with 9 belongs to a temporary resident and carries an expiry date, which can be a business rule.",
          "Treat the SIN as highly sensitive. Mask it in the UI (`*** *** 286`), keep it out of logs, URLs and analytics, and encrypt it at rest.",
        ),
      ],
    },
    {
      id: "sb-code-bank",
      question: "Design a small bank: open, deposit, withdraw, transfer, with validation.",
      level: "intermediate",
      short:
        "Model balances in integer cents (or `BigDecimal`). Validate positive amounts, account existence and sufficient funds **before** changing anything, so a failed transfer leaves both balances untouched. Throw domain-specific errors. Keep a history. In the follow-ups, interviewers ask about concurrency (lock both accounts in a consistent order), idempotent transfers, and why you didn't use a float.",
      body: [
        ts(`
class InsufficientFunds extends Error {}

class Bank {
  private readonly balances = new Map<string, bigint>(); // cents
  private readonly history: string[] = [];

  open(id: string, initialCents = 0n): void {
    if (this.balances.has(id)) throw new Error(\`Account \${id} already exists\`);
    this.balances.set(id, initialCents);
  }

  deposit(id: string, cents: bigint): void {
    if (cents <= 0n) throw new RangeError("Amount must be positive");
    this.balances.set(id, this.balanceOf(id) + cents);
    this.history.push(\`deposit \${id} \${cents}\`);
  }

  withdraw(id: string, cents: bigint): void {
    if (cents <= 0n) throw new RangeError("Amount must be positive");
    const balance = this.balanceOf(id);
    if (balance < cents) throw new InsufficientFunds(\`\${id} has \${balance}, needs \${cents}\`);
    this.balances.set(id, balance - cents);
    this.history.push(\`withdraw \${id} \${cents}\`);
  }

  transfer(from: string, to: string, cents: bigint): void {
    if (from === to) throw new Error("Cannot transfer to the same account");
    this.balanceOf(to); // validate the destination before any money moves
    this.withdraw(from, cents); // throws before mutating if funds are short
    this.deposit(to, cents);
  }

  balanceOf(id: string): bigint {
    const balance = this.balances.get(id);
    if (balance === undefined) throw new Error(\`No account \${id}\`);
    return balance;
  }
}

const bank = new Bank();
bank.open("TFSA-1", 100_00n);
bank.open("RRSP-7");
bank.transfer("TFSA-1", "RRSP-7", 40_00n);
console.log(bank.balanceOf("TFSA-1"), bank.balanceOf("RRSP-7"));

try {
  bank.withdraw("RRSP-7", 50_00n);
} catch (error) {
  console.log(error instanceof InsufficientFunds, (error as Error).message);
}
`),
        output(`
6000n 4000n
true RRSP-7 has 4000, needs 5000
`),
        say("In a real system the transfer would be one database transaction, with an idempotency key and a double-entry ledger. In memory, I make sure every check runs before the first mutation."),
      ],
    },
  ],
};

export const SB_BUILDS: PrepSection = {
  id: "sb-builds",
  track: "coding",
  title: "Live builds candidates reported",
  blurb:
    "Besides algorithms, Scotiabank reports describe small practical builds: render a table from an API in a function component, a counter as a **class** component, a todo app, a Node REST API returning JSON, and Spring query-parameter binding. Build each one from a blank file in under 20 minutes.",
  questions: [
    {
      id: "sb-build-fetch-table",
      question: "Fetch data from an endpoint and render it as a table in a function component.",
      level: "junior",
      short:
        "Use `useState` for the rows and a status, and `useEffect` keyed on the URL to fetch, with an `AbortController` cleanup. Check `response.ok`, because `fetch` only rejects on network errors. Render loading, error and empty states, then a semantic `<table>` with a `<caption>`, `<th scope=\"col\">` headers and stable `key`s.",
      body: [
        tsx(`
interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

type Status = "loading" | "error" | "ready";

function UsersTable({ url }: { url: string }) {
  const [rows, setRows] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [sortKey, setSortKey] = useState<"name" | "email">("name");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        return response.json() as Promise<User[]>;
      })
      .then((data) => {
        setRows(data);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (!(err instanceof DOMException && err.name === "AbortError")) setStatus("error");
      });
    return () => controller.abort();
  }, [url]);

  const sorted = useMemo(() => rows.toSorted((a, b) => a[sortKey].localeCompare(b[sortKey])), [rows, sortKey]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error") return <p role="alert">Could not load users. Try again.</p>;
  if (sorted.length === 0) return <p>No users found.</p>;

  return (
    <table>
      <caption>Users, sorted by {sortKey}</caption>
      <thead>
        <tr>
          <th scope="col">
            <button onClick={() => setSortKey("name")}>Name</button>
          </th>
          <th scope="col">
            <button onClick={() => setSortKey("email")}>Email</button>
          </th>
          <th scope="col">Company</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
`),
        list(
          "Likely extensions: sorting (done above), a search filter (derive it, don't store it), pagination, and a retry button.",
          "`toSorted` returns a new array. Calling `rows.sort()` would mutate state in place.",
        ),
      ],
    },
    {
      id: "sb-build-class-counter",
      question: "Build a counter as a class component, then as a function component.",
      level: "junior",
      short:
        "In a class component, state lives in `this.state` and changes through `this.setState`. Use the updater form when the next value depends on the previous one. Handlers are arrow-function class fields, so `this` stays bound. Lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) do the job of effects. The function version uses `useState` and `useEffect`. Legacy code in banks still has class components, which is why this gets asked.",
      body: [
        tsx(`
interface CounterProps {
  step?: number;
}

interface CounterState {
  count: number;
}

class Counter extends Component<CounterProps, CounterState> {
  state: CounterState = { count: 0 };

  increment = () => this.setState((prev) => ({ count: prev.count + (this.props.step ?? 1) }));
  decrement = () => this.setState((prev) => ({ count: prev.count - (this.props.step ?? 1) }));
  reset = () => this.setState({ count: 0 });

  componentDidUpdate(_prevProps: CounterProps, prevState: CounterState) {
    if (prevState.count !== this.state.count) document.title = \`Count: \${this.state.count}\`;
  }

  render() {
    return (
      <div>
        <p aria-live="polite">Count: {this.state.count}</p>
        <button onClick={this.decrement}>−</button>
        <button onClick={this.increment}>+</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}
`, { caption: "Class component" }),
        tsx(`
function Counter({ step = 1 }: { step?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <div>
      <p aria-live="polite">Count: {count}</p>
      <button onClick={() => setCount((c) => c - step)}>−</button>
      <button onClick={() => setCount((c) => c + step)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
`, { caption: "Function component" }),
        trap("`this.setState({ count: this.state.count + 1 })` called twice in one handler adds 1, not 2, because updates are batched. The updater form `prev => ...` adds 2. The same applies to `setCount(count + 1)` in a function component."),
      ],
    },
    {
      id: "sb-build-todo",
      question: "Build a todo app: add, toggle, delete, and show the number remaining.",
      level: "junior",
      short:
        "Keep one array of `{ id, text, done }` in state and update it immutably: spread to add, `map` to toggle, `filter` to delete. Derive the remaining count during render; don't store it. Wrap the input in a `<form>`, so Enter submits. Trim input and ignore empty todos. Use stable ids for keys.",
      body: [
        tsx(`
interface Todo {
  id: string;
  text: string;
  done: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const remaining = todos.filter((todo) => !todo.done).length; // derived, not stored

  function add(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text: trimmed, done: false }]);
    setText("");
  }

  const toggle = (id: string) =>
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  const remove = (id: string) => setTodos((prev) => prev.filter((todo) => todo.id !== id));

  return (
    <section aria-labelledby="todo-title">
      <h2 id="todo-title">Todos ({remaining} remaining)</h2>
      <form onSubmit={add}>
        <label htmlFor="new-todo">New todo</label>
        <input id="new-todo" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
              <span style={{ textDecoration: todo.done ? "line-through" : undefined }}>{todo.text}</span>
            </label>
            <button onClick={() => remove(todo.id)} aria-label={\`Delete \${todo.text}\`}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
`),
        p("Likely follow-ups: filter tabs (all, active, done) kept in state or in the URL, persisting to `localStorage` in an effect, editing in place, and moving state into a `useReducer` once the actions multiply."),
      ],
    },
    {
      id: "sb-build-node-api",
      question: "Write a Node REST API with a GET and a POST that return JSON.",
      level: "junior",
      short:
        "With Express: parse JSON bodies, validate the input, return proper status codes (201 with a `Location` header on create, 400 on bad input, 404 when something is missing), and add an error handler at the end. Keep the store behind a small function so it can become a database later. Say out loud what you'd add next: authentication, rate limiting, a schema validator such as Zod, and tests with supertest.",
      body: [
        ts(`
import express, { type Request, type Response, type NextFunction } from "express";
import { randomUUID } from "node:crypto";

interface Account {
  id: string;
  clientId: string;
  type: "TFSA" | "RRSP" | "FHSA" | "NON_REGISTERED";
}

const accounts = new Map<string, Account>();
const TYPES = new Set(["TFSA", "RRSP", "FHSA", "NON_REGISTERED"]);

const app = express();
app.use(express.json({ limit: "10kb" }));

app.get("/api/accounts", (req, res) => {
  const { clientId } = req.query;
  const list = [...accounts.values()].filter((a) => !clientId || a.clientId === clientId);
  res.json({ data: list });
});

app.get("/api/accounts/:id", (req, res) => {
  const account = accounts.get(req.params.id);
  if (!account) return res.status(404).json({ title: "Account not found" });
  res.json(account);
});

app.post("/api/accounts", (req, res) => {
  const { clientId, type } = req.body ?? {};
  const errors: string[] = [];
  if (typeof clientId !== "string" || clientId.trim() === "") errors.push("clientId is required");
  if (!TYPES.has(type)) errors.push("type must be one of TFSA, RRSP, FHSA, NON_REGISTERED");
  if (errors.length) return res.status(400).json({ title: "Invalid request", errors });

  const account: Account = { id: randomUUID(), clientId, type };
  accounts.set(account.id, account);
  res.status(201).location(\`/api/accounts/\${account.id}\`).json(account);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ title: "Internal error" });
});

app.listen(3000, () => console.log("listening on :3000"));
`),
        trap("Forgetting `return` after `res.status(400).json(...)`, so the handler keeps running and tries to send a second response."),
      ],
    },
    {
      id: "sb-build-spring-query-pojo",
      question: "In Spring, map a GET request's query parameters to an object.",
      level: "junior",
      short:
        "Spring binds query parameters to a controller argument that isn't annotated, by name (this is an implicit `@ModelAttribute`), and since Spring 6 that includes records, through their constructor. Add `@Valid` with Bean Validation annotations for the constraints. For one or two parameters, `@RequestParam` with `required` and `defaultValue` is clearer. Use `@PathVariable` for ids that are part of the path. A 2019 Scotiabank candidate was asked for the 'full syntax' of exactly this.",
      body: [
        java(`
public record AccountSearch(
        String clientId,
        AccountType type,               // "TFSA" converts to the enum automatically
        @Min(0) Integer page,
        @Min(1) @Max(100) Integer size) {}

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountQueryController {

    // GET /api/v1/accounts?clientId=c-1&type=TFSA&page=0&size=20
    @GetMapping
    public List<AccountResponse> search(@Valid AccountSearch criteria) {
        return service.search(criteria);
    }

    // The explicit alternative, for a couple of parameters
    @GetMapping("/by-client")
    public List<AccountResponse> byClient(
            @RequestParam String clientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return service.byClient(clientId, PageRequest.of(page, size));
    }

    // GET /api/v1/accounts/a-9 → a path variable
    @GetMapping("/{id}")
    public AccountResponse get(@PathVariable String id) {
        return service.get(id);
    }
}
`),
        p("Binding or validation failures on a model attribute raise a `BindException` (or `MethodArgumentNotValidException`), which a `@RestControllerAdvice` turns into a 400 response."),
      ],
    },
  ],
};
