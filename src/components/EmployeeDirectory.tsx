import { parse } from "query-string";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  normalizeNameQueryParameter,
  normalizePageQueryParameter,
} from "../utils";
import EmployeeTable from "./EmployeeTable";
import SearchInput from "./SearchInput";

export default function EmployeeDirectory() {
  // query param is the ultimate source of truth for the search value and page number.
  const location = useLocation();
  const { name, page } = parse(location.search);
  // TODO: error handling/messaging for bad query params?
  const searchValue = normalizeNameQueryParameter(name);
  const pageValue = normalizePageQueryParameter(page);

  // `true` while user is typing in search text input.
  // This immediately signals that search is in progress, even though data fetching is debounced.
  const [isReceivingInput, setIsReceivingInput] = useState(false);

  return (
    <section>
      <h1>Employee Directory</h1>
      <SearchInput
        searchValue={searchValue}
        setIsReceivingInput={setIsReceivingInput}
      />
      <EmployeeTable
        isReceivingInput={isReceivingInput}
        searchValue={searchValue}
        pageValue={pageValue}
      />
    </section>
  );
}
