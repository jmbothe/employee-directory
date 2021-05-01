import { EmployeeListItem } from "./EmployeeListItem";

export interface SearchEmployeesResult {
    pages: number;
    employees: EmployeeListItem[];
}