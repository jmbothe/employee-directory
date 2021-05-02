import { parse } from "query-string";
import { useLocation } from "react-router-dom";

interface QueryStringState {
  searchValue: string;
  pageValue: number;
}

export default function useQueryString(): QueryStringState {
  // query param is the ultimate source of truth for the search value and page number.
  const location = useLocation();
  const { name, page } = parse(location.search);
  // TODO: error handling/messaging for bad query params?
  // Also, should really update query param if its bad, since query is supposed to be state store.
  const searchValue = typeof name === "string" ? name : "";
  const pageValue = typeof page === "string" && +page > 0 ? +page : 1;

  return { searchValue, pageValue };
}
