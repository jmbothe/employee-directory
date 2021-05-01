import { stringify } from "query-string";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Employee } from "../domain/Employee";
import useRuntime from "../runtime/useRuntime";
import Pagination from "./Pagination";

interface EmployeeTableProps {
  searchValue: string;
  pageValue: number;
  isReceivingInput: boolean;
}

export default function EmployeeTable({
  searchValue,
  pageValue,
  isReceivingInput,
}: EmployeeTableProps) {
  const [employees, setEmployees] = useState<Employee[]>();
  const [pageCount, setPageCount] = useState(0);
  const [willLoadResults, setWillLoadResults] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const { getEmployeeRepository } = useRuntime();
  const { push } = useHistory();

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
    function (): void {
      async function getResults() {
        const { searchEmployees } = getEmployeeRepository();
        const results = await searchEmployees(searchValue, pageValue);
        const { employees, pages } = results;

        // if url has out-of-bounds page number, goto page 1.
        if (pageValue > pages) {
          const search = stringify({ page: 1, name: searchValue });

          return push({ search });
        }

        // This series of setState() calls is causing a series of component renders.
        // Not a perf issue right now, but makes a good case to start thinking about useReducer() or redux.
        setEmployees(employees);
        setPageCount(pages);
        setWillLoadResults(false);
        setIsLoadingResults(false);
      }

      setIsLoadingResults(true);
      getResults();
    },
    [searchValue, pageValue, getEmployeeRepository, setIsLoadingResults, push]
  );

  let subheadingText = "";

  if (employees?.length === 0) {
    subheadingText = "Sorry, no results. Try expanding your search criteria.";
  } else if (isReceivingInput || willLoadResults) {
    subheadingText = "Searching...";
  } else if (isLoadingResults) {
    subheadingText = `Page ${pageValue} of ${pageCount} loading...`;
  } else {
    subheadingText = `Page ${pageValue} of ${pageCount}`;
  }

  return (
    <section>
      <h2>Search Results</h2>
      <h3>{subheadingText}</h3>
      <Pagination
        pageCount={pageCount}
        pageValue={pageValue}
        searchValue={searchValue}
      />
      <table>
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>Job Title</td>
            <td>Location Name</td>
            <td>Location Type</td>
          </tr>
          {employees?.map(({ name, role, location, id }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{role}</td>
              <td>{location?.name}</td>
              <td>{location?.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
