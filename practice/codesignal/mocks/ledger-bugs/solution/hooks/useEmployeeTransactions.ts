import { useCallback, useRef, useState } from "react";
import { API, getJson, type Transaction } from "../api";

export function useEmployeeTransactions() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const latestRequest = useRef(0);

  const fetchByEmployee = useCallback(async (employeeId: string) => {
    const request = ++latestRequest.current;
    try {
      const data = await getJson<Transaction[]>(API.employeeTransactions(employeeId));
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
