import { useCallback, useEffect, useState } from "react";
import { API, getJson, type PaginatedResponse, type Transaction } from "../api";

export function usePaginatedTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  const loadPage = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const response = await getJson<PaginatedResponse<Transaction[]>>(API.transactions(page));
      setTransactions(response.data);
      setNextPage(response.nextPage);
    } catch {
      // Keep what is on screen; View more stays available to try again.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPage(0);
  }, [loadPage]);

  const fetchNextPage = useCallback(() => {
    void loadPage(nextPage as number);
  }, [loadPage, nextPage]);

  return { transactions, nextPage, loading, fetchNextPage };
}
