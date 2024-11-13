import { gql } from "@apollo/client";

export const SEARCH_POKEMON = gql`
  query ($search: String!) {
    pokemon(search: $search) {
      id
      name
      number
      types
      variant
      paths {
        color
        points
      }
    }
  }
`;
