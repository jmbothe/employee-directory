import { EmployeeRepository } from "../domain/EmployeeRepository";
import searchEmployees from "./searchEmployees";

export default function getEmployeeRepository(): EmployeeRepository {
    return {searchEmployees};
}