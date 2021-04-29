import React from 'react';
import createDevRuntime from './adapter-dev/createDevRuntime';
import EmployeeTable from './components/EmployeeTable';
import RuntimeContext from './runtime/RuntimeContext';

const runtime = createDevRuntime();

function App() {
  return (
    <RuntimeContext.Provider value={runtime}>
        <EmployeeTable />
    </RuntimeContext.Provider>
  );
}

export default App;
