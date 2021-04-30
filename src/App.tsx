import React from 'react';
import createDevRuntime from './adapter-dev/createDevRuntime';
import EmployeeTable from './components/EmployeeTable';
import RuntimeContext from './runtime/RuntimeContext';

const runtime = createDevRuntime();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <RuntimeContext.Provider value={runtime}>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <EmployeeList
        searchValue={searchValue}
      />
    </RuntimeContext.Provider>
  );
}

export default App;
