import gql from "graphql-tag";

export const GET_COUNTRIES_QUERY = gql`
  query {
    countries {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

export const GET_COUNTRY_QUERY = gql`
  query getCountry($code: ID!) {
    country(code: $code) {
      currency
      capital
      states {
        name
      }
      languages {
        name
      }
    }
  }
`;
