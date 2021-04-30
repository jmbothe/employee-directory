import React, { useEffect, useState } from "react";
import { EmployeeListItem } from "../domain/EmployeeListItem";
import useRuntime from "../runtime/useRuntime";

interface EmployeeListProps {
  searchValue?: string;
  setIsLoadingResults(isLoading: boolean): void;
}

export default function EmployeeList({
  searchValue = "",
  setIsLoadingResults,
}: EmployeeListProps) {
  const [employees, setEmployees] = useState<EmployeeListItem[]>();
  const { getEmployeeRepository } = useRuntime();

  // This effect happens whenever the url query param updates.
  useEffect(
    function () {
      async function getResults() {
        const {searchEmployees} = getEmployeeRepository();
        const results = await searchEmployees(searchValue);

        setEmployees(results);
        setIsLoadingResults(false);
      }

      if (searchValue) {
        getResults();
        setIsLoadingResults(true);
      } else {
        // Clears "empty results" message when user clears the text input.
        setEmployees(undefined);
      }
    },
    [searchValue, getEmployeeRepository, setIsLoadingResults]
  );

  const listItems = employees?.map(({ name, id }) => <li key={id}>{name}</li>);

  const emptyResultMessage = employees?.length === 0 && (
    <p>Sorry, no results. Try expanding your search criteria.</p>
  );

  return (
    <section>
      <h2>Search Results</h2>
      <ul>{listItems}</ul>
      {emptyResultMessage}
    </section>
  );
}
