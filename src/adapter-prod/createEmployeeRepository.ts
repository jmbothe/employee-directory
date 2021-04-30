import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { EmployeeRepository } from "../domain/EmployeeRepository";
import searchEmployees from "./searchEmployees";

export default function createEmployeeRepository(
    gqlClient: ApolloClient<NormalizedCacheObject>
): EmployeeRepository {
    return {
        searchEmployees: searchEmployees.bind(undefined, gqlClient)
    };
};
