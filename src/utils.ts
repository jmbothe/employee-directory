import { ParsedQuery } from "query-string";

export type ValueOf<T> = T[keyof T];

export function normalizeNameQueryParameter(
  query: ValueOf<ParsedQuery>
): string {
  return typeof query === "string" ? query : "";
}

export function normalizePageQueryParameter(
  query: ValueOf<ParsedQuery>
): number {
  return typeof query === "string" ? +query : 1;
}
