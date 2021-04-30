import { EmployeeListItem } from "./EmployeeListItem";

export interface EmployeeRepository {
    searchEmployees(name: string): Promise<EmployeeListItem[]>;
}
