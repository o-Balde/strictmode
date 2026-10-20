import type { Transaction } from "../contract";
import transactions from "../transactions.json";

/**
 * EXPENSE LEDGER: your workspace. Level 1 starts here.
 *
 * Below is the designer's static row. Render every transaction from
 * transactions.json with it, then the total, following the Level 1 spec on the
 * prep page. Watch the money and date formats: the specs compare exact text.
 *
 *   npm run level -- ledger 1
 *   npm run dev → ?mock=ledger
 */
const rows = transactions as Transaction[];

export default function App() {
  void rows;

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr data-testid="txn-t0">
            <td>Merchant</td>
            <td>First Last</td>
            <td>Jan 1, 2026</td>
            <td>$0.00</td>
          </tr>
        </tbody>
      </table>
      <p data-testid="ledger-total">Total: $0.00</p>
    </main>
  );
}
