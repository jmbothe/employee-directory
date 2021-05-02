import React, { useState } from "react";
import "./EmployeeDirectory.css";
import EmployeeTable from "./EmployeeTable";
import SearchInput from "./SearchInput";

export default function EmployeeDirectory() {
  // `true` while user is typing in search text input.
  // This immediately signals that search is in progress, even though data fetching is debounced.
  const [isReceivingInput, setIsReceivingInput] = useState(false);

  return (
    <section className="employee-directory">
      <h1 className="employee-directory__heading">Employee Directory</h1>
      <SearchInput setIsReceivingInput={setIsReceivingInput} />
      <EmployeeTable isReceivingInput={isReceivingInput} />
    </section>
  );
}
