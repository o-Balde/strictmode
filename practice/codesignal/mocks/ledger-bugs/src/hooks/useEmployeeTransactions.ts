import { useCallback, useState } from "react";
import { API, getJson, type Transaction } from "../api";

export function useEmployeeTransactions() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const fetchByEmployee = useCallback(async (employeeId: string) => {
    try {
      const data = await getJson<Transaction[]>(API.employeeTransactions(employeeId));
      setTransactions(data);
    } catch {
      setTransactions([]);
    }
  }, []);

  const clear = useCallback(() => {
    setTransactions(null);
  }, []);

  return { transactions, fetchByEmployee, clear };
}
