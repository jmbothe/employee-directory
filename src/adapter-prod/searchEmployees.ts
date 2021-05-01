import {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
} from "@apollo/client";
import { SearchEmployeesResult } from "../domain/SearchEmployeesResult";
import searchEmployeesQuery from "./searchEmployeesQuery";

interface EmployeeListItemDto {
  id: string;
  name: string;
}

interface QueryResult {
  characters: {
    info: {
      pages: number;
    };
    results: EmployeeListItemDto[];
  };
}

export default async function searchEmployees(
  gqlClient: ApolloClient<NormalizedCacheObject>,
  name: string,
  page: number
): Promise<SearchEmployeesResult> {
  const { data, errors } = await gqlClient.query<QueryResult>({
    variables: { name, page },
    query: searchEmployeesQuery,
    // allows reading/handling `errors` property from response object.
    errorPolicy: "all",
  });

  // handle empty results.
  if (errors) {
    if (errors.some(({ message }) => message === "404: Not Found")) {
      return {
        pages: 1,
        employees: [],
      };
    }

    // Just do what Apollo would have done if we didn't set errorPolicy: "all"
    // TODO: Improve error handling for other error scenarios.
    throw new ApolloError({ graphQLErrors: errors });
  }

  // Apollo cache does not cache errors for errorPolicy: "all", so still need a null check for results.
  // Appears to be a known issue.
  // https://github.com/apollographql/apollo-client/issues/4644
  return {
    pages: data.characters?.info.pages || 1,
    employees: data.characters?.results || [],
  };
}
