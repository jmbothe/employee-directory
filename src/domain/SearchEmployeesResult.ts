import { Employee } from "./Employee";

export interface SearchEmployeesResult {
    pages: number;
    employees: Employee[];
}