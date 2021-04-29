import { EmployeeRepository } from "../domain/EmployeeRepository";
import getEmployees from "./getEmployees";

export default function getEmployeeRepository(): EmployeeRepository {
    return {getEmployees};
}