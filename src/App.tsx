import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import EmployeeDirectory from "./components/EmployeeDirectory";
import { employeesPath, rootPath } from "./pathnames";

export default function App() {
  return (
    <Switch>
      <Route path={employeesPath}>
        <EmployeeDirectory />
      </Route>
      <Route path={rootPath}>
        <Redirect to={employeesPath} />
      </Route>
      {/** TODO: Custom 404 page, Error page, etc. */}
    </Switch>
  );
}
