import { parse } from "query-string";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { normalizeQueryParameter } from "../utils";
import EmployeeList from "./EmployeeTable";
import SearchInput from "./SearchInput";

function EmployeeSearch() {
  // query param is the ultimate source of truth for the search value.
  const location = useLocation();
  const { name } = parse(location.search);
  const searchValue = normalizeQueryParameter(name);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  return (
    <section>
      <h1>Employee Directory</h1>
      <SearchInput
        isLoadingResults={isLoadingResults}
        searchValue={searchValue}
      />
      <EmployeeList
        setIsLoadingResults={setIsLoadingResults}
        searchValue={searchValue}
      />
    </section>
  );
}

export default EmployeeSearch;
