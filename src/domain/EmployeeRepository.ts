import { Employee } from "./Employee";

export interface EmployeeRepository {
    getEmployees(): Promise<Employee[]>;
}
