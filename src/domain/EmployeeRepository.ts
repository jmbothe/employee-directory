import { SearchEmployeesResult } from "./SearchEmployeesResult";

export interface EmployeeRepository {
    searchEmployees(name: string, page?: number): Promise<SearchEmployeesResult>;
}
