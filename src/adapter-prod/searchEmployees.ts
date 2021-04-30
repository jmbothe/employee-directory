import { ApolloClient, ApolloError, NormalizedCacheObject } from "@apollo/client";
import { EmployeeListItem } from "../domain/EmployeeListItem";
import searchEmployeesQuery from "./searchEmployeesQuery";

interface EmployeeListItemDto {
  id: string;
  name: string;
}

interface QueryResult {
  characters: {
    results: EmployeeListItemDto[];
  };
}

export default async function searchEmployees(
  gqlClient: ApolloClient<NormalizedCacheObject>,
  name: string
): Promise<EmployeeListItem[]> {
  const { data, errors } = await gqlClient.query<QueryResult>({
    variables: {name},
    query: searchEmployeesQuery,
    // allows reading/handling `errors` property from response object.
    errorPolicy: "all"
  });

  // handle empty results.
  if (errors) {
    if (errors.some(({message}) => message === "404: Not Found")) {
      return [];
    }

    // Just do what Apollo would have done if we didn't set errorPolicy: all
    // TODO: Improve error handling for other error scenarios.
    throw new ApolloError({graphQLErrors: errors})
  }


  return data.characters.results;
}
