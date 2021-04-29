import React, { useEffect, useState } from "react";
import useRuntime from "../runtime/useRuntime";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const {getEmployeeRepository} = useRuntime();

    useEffect(function() {
        getEmployeeRepository().getEmployees()
            .then(setEmployees);
    }, [getEmployeeRepository]);

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
