import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { SearchEmployeesResult } from "../domain/SearchEmployeesResult";
import { EmployeeDto } from "./EmployeeDto";
import searchEmployeesQuery from "./searchEmployeesQuery";
import toEmployee from "./toEmployee";

interface QueryResult {
  characters: {
    info: {
      pages: number;
    };
    results: EmployeeDto[];
  };
}

export default async function searchEmployees(
  gqlClient: ApolloClient<NormalizedCacheObject>,
  name: string,
  page: number
): Promise<SearchEmployeesResult> {
  try {
    const { data } = await gqlClient.query<QueryResult>({
      variables: { name, page },
      query: searchEmployeesQuery,
    });

    const {characters} = data;
    const {info, results} = characters;

    return {
      ...info,
      employees: results.map(toEmployee),
    };
  } catch (error) {
    if (error.message === "404: Not Found") {
      return {
        pages: 1,
        employees: [],
      };
    }

    throw error;
  }
}
