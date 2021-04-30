import { ParsedQuery } from "query-string";

export type ValueOf<T> = T[keyof T];

// no tolerance for anything but a simple sting :)
export function normalizeQueryParameter(query: ValueOf<ParsedQuery>): string {
  if (typeof query === "string") {
    return query;
  }

  return "";
}
