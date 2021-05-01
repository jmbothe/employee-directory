import { stringify } from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EmployeeListItem } from "../domain/EmployeeListItem";
import useRuntime from "../runtime/useRuntime";
import Pagination from "./Pagination";

interface EmployeeListProps {
  searchValue: string;
  pageValue: number;
  isReceivingInput: boolean;
}

export default function EmployeeList({
  searchValue,
  pageValue,
  isReceivingInput,
}: EmployeeListProps) {
  const [employees, setEmployees] = useState<EmployeeListItem[]>();
  const [pageCount, setPageCount] = useState(0);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const { getEmployeeRepository } = useRuntime();
  const { push } = useHistory();

  // Ensure that `empty results` message and pagination components don't linger during search update.
  useEffect(
    function(): void {
      if (isReceivingInput || !searchValue) {
        setEmployees(undefined);
        setPageCount(0);
      }
    },
    [isReceivingInput, searchValue]
  )

  // Fetch search results when the url query param updates.
  useEffect(
    function (): void {
      async function getResults() {
        const { searchEmployees } = getEmployeeRepository();
        const results = await searchEmployees(searchValue, pageValue);
        const { employees, pages } = results;

        // if url has out-of-bounds page number, goto page 1.
        if (!employees.length && pageValue > pages) {
          const search = stringify({ page: 1, name: searchValue });

          return push({ search });
        }

        setEmployees(employees);
        setPageCount(pages);
        setIsLoadingResults(false);
      }

      if (searchValue) {
        getResults();
        setIsLoadingResults(true);
      }
    },
    [searchValue, pageValue, getEmployeeRepository, setIsLoadingResults, push]
  );

  return (
    <section>
      <h2>Search Results</h2>
      <Pagination
        isVisible={!(employees?.length === 0)}
        pageCount={pageCount}
        pageValue={pageValue}
        searchValue={searchValue}
      />
      <ul>
        {
          (isReceivingInput || isLoadingResults)
            ? <li>loading...</li>
            : employees?.length === 0
              ? <li>Sorry, no results. Try expanding your search criteria.</li>
              : employees?.map(({ name, id }) => <li key={id}>{name}</li>)
        }
      </ul>
    </section>
  );
}
