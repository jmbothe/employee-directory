import { EmployeeRepository } from "../domain/EmployeeRepository";

// Runtime is a context-injected set of data-fetching repositories.
export interface Runtime {
    getEmployeeRepository(): EmployeeRepository;
}
