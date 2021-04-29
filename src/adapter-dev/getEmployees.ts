import { Employee } from "../domain/Employee";
import employees from "./employees.json";

export default function getEmployees(): Promise<Employee[]> {
    return Promise.resolve(employees as Employee[]);
}
