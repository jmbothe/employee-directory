import { Employee } from "../domain/Employee";
import { EmployeeDto } from "./EmployeeDto";

export default function toEmployee(employeeDto: EmployeeDto): Employee {
    return {
        ...employeeDto,
        // using the rick & morty API, some of the field names dont really make sense for an employee directory app...
        role: employeeDto.species
    }
}
