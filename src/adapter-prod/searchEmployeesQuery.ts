import { gql } from "@apollo/client";

export default gql`
  query searchEmployees($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;
