export { API } from "../../ledger/contract";
export type { Employee, PaginatedResponse, Transaction } from "../../ledger/contract";

export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return (await response.json()) as T;
}

export async function saveApproval(url: string, approved: boolean): Promise<void> {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ approved }),
  });
  if (!response.ok) throw new Error(`PUT ${url} failed with ${response.status}`);
}
