import { AppConfig } from "./AppConfig";
import { EmployeeRepository } from "./EmployeeRepository";

// Runtime is a context-injected set of data-fetching repositories.
export interface Runtime {
    getEmployeeRepository(): EmployeeRepository;
    getAppConfig(): AppConfig;
}
