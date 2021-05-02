import { stringify } from "query-string";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Employee } from "../domain/Employee";
import useRuntime from "../runtime/useRuntime";
import useQueryString from "./useQueryString";

interface GetSearchResultsState {
  employees: Employee[] | undefined;
  pageCount: number;
  willLoadResults: boolean;
  isLoadingResults: boolean;
}

export default function useGetSearchResults(
  isReceivingInput: boolean
): GetSearchResultsState {
  const { push } = useHistory();
  const { searchValue, pageValue } = useQueryString();
  const { getEmployeeRepository } = useRuntime();
  const [employees, setEmployees] = useState<Employee[]>();
  const [pageCount, setPageCount] = useState(0);
  const [willLoadResults, setWillLoadResults] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  // Ensure that "Searching..." message stays on screen after user stops typing and before url update.
  useEffect(
    function (): void {
      if (isReceivingInput) {
        setWillLoadResults(true);
      }
    },
    [isReceivingInput]
  );

  // Fetch search results when the url query param updates.
  useEffect(
    function () {
      async function getSearchResults() {
        const { searchEmployees } = getEmployeeRepository();
        const results = await searchEmployees(searchValue, pageValue);
        const { employees, pages } = results;

        // if url has out-of-bounds page number, goto page 1.
        if (pageValue > pages) {
          const search = stringify({ page: 1, name: searchValue });

          return push({ search });
        }

        // This series of setState() calls is causing repeated of component renders.
        // Not a perf issue right now, but makes a good case to start thinking about useReducer() or redux.
        setEmployees(employees);
        setPageCount(pages);
        setWillLoadResults(false);
        setIsLoadingResults(false);
      }

      setIsLoadingResults(true);
      getSearchResults();
    },
    [searchValue, pageValue, getEmployeeRepository, push]
  );

  return { employees, pageCount, willLoadResults, isLoadingResults };
}
