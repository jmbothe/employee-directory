import React, { useEffect, useState } from "react";
import { EmployeeListItem } from "../domain/EmployeeListItem";
import useRuntime from "../runtime/useRuntime";

interface EmployeeListProps {
    searchValue: string;
}

export default function EmployeeList({
    searchValue
}: EmployeeListProps) {
    const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
    const {getEmployeeRepository} = useRuntime();

    useEffect(function() {
        if (searchValue) {
            getEmployeeRepository()
                .searchEmployees(searchValue)
                .then(setEmployees);
        }
    }, [searchValue, getEmployeeRepository]);

    const listItems = employees.map(({name, id}) => (
        <li key={id}>{name}</li>
    ));

    return (
        <section>
            <h2>Search Results</h2>
            <ul>
                {listItems}
            </ul>
        </section>
    )
}
