import delay from "delay";
import { SearchEmployeesResult } from "../domain/SearchEmployeesResult";
import employees from "./employees.json";

// Returns mock data from json file.
export default async function searchEmployees(
  name: string,
  page: number
): Promise<SearchEmployeesResult> {
  // Set delay so devs can see loading state.
  await delay(700);

  const pageSize = 15;
  const startSlice = (page - 1) * pageSize;
  const endSlice = page * pageSize;

  const filteredEmployees = employees
    .filter(({name: employeeName}) => (new RegExp(name, "i")).test(employeeName))
  const paginatedEmployees = filteredEmployees.slice(startSlice, endSlice);
  const pages = Math.ceil(filteredEmployees.length / pageSize) || 1;

  return {
    employees: paginatedEmployees,
    pages,
  };
}
