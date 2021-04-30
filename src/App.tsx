import React from "react";
import {
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import EmployeeSearch from "./components/EmployeeDirectory";
import { employeesPath, rootPath } from "./pathnames";

function App() {
  return (
    <Switch>
      <Route path={employeesPath}>
        <EmployeeSearch />
      </Route>
      <Route path={rootPath}>
        <Redirect to={employeesPath} />
      </Route>
    </Switch>
  );
}

export default App;
