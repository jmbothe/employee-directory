import { gql } from "@apollo/client";

export default gql`
  query searchEmployees($name: String, $page: Int) {
    characters(filter: { name: $name }, page: $page) {
      info {
        pages
      }
      results {
        id
        name
        species
        location {
          name
          type
        }
      }
    }
  }
`;
