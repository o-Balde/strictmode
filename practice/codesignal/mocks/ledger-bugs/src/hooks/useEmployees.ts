import { useEffect, useState } from "react";
import { API, getJson, type Employee } from "../api";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    getJson<Employee[]>(API.employees)
      .then((list) => {
        if (!ignore) setEmployees(list);
      })
      .catch(() => {
        // The filter still offers "All employees".
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return { employees, loading };
}
