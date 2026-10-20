/**
 * AUTOCOMPLETE: your workspace. Spec on the prep page; run it with
 *   npm run level -- autocomplete
 */
export type SearchFn = (query: string, signal: AbortSignal) => Promise<string[]>;

export interface AutocompleteProps {
  search: SearchFn;
  delayMs?: number;
}

export function Autocomplete({ search }: AutocompleteProps) {
  void search;
  return <input aria-label="Search" />;
}
