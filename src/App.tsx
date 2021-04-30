import React, { useState } from "react";
import EmployeeList from "./components/EmployeeTable";
import SearchInput from "./components/SearchInput";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <section>
      <h1>Employee Directory</h1>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <EmployeeList
        searchValue={searchValue}
      />
    </section>
  );
}

export default App;
