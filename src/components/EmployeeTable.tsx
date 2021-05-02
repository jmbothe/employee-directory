import classNames from "classnames";
import React from "react";
import useGetSearchResults from "../hooks/useGetSearchResults";
import Pagination from "./Pagination";

interface EmployeeTableProps {
  isReceivingInput: boolean;
}

export default function EmployeeTable({
  isReceivingInput
}: EmployeeTableProps) {
  const {
    employees,
    pageCount,
    willLoadResults,
    isLoadingResults,
  } = useGetSearchResults(isReceivingInput);

  return (
    <>
      <Pagination
        pageCount={pageCount}
        willLoadResults={willLoadResults}
        isLoadingResults={isLoadingResults}
        isReceivingInput={isReceivingInput}
        isEmptyResults={employees?.length === 0}
      />
      <section className="employee-table-container">
        <table
          className={classNames({
            "employee-table": true,
            "employee-table--stale":
              isReceivingInput || willLoadResults || isLoadingResults,
          })}
        >
          <tbody>
            <tr className="employee-table__first-row">
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
    </>
  );
}
