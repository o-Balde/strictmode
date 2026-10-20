import { useState } from "react";
import { API, saveApproval, type Transaction } from "../api";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const [approved, setApproved] = useState(transaction.approved);

  async function handleChange(next: boolean) {
    setApproved(next);
    try {
      await saveApproval(API.approval(transaction.id), next);
    } catch {
      setApproved(!next);
    }
  }

  return (
    <tr data-testid={`txn-${transaction.id}`}>
      <td>
        <input
          type="checkbox"
          data-testid={`approve-${transaction.id}`}
          aria-label={`Approve ${transaction.merchant}`}
          checked={approved}
          onChange={(event) => void handleChange(event.target.checked)}
        />
      </td>
      <td>{transaction.merchant}</td>
      <td>
        {transaction.employee.firstName} {transaction.employee.lastName}
      </td>
      <td>{money.format(transaction.amount)}</td>
    </tr>
  );
}
