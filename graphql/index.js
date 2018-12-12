import gql from 'graphql-tag';


export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      id
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      username
      permissions
    }
  }
`;

export const ALL_FILTERS_QUERY = gql`
  query ALL_SEARCH_ITEMS_QUERY {
    filters {
      id
      name
      filterTerms
      createdAt
    }
  }
`;

export const DELETE_FILTER_MUTATION = gql`
  mutation DELETE_FILTER_MUTATION($id: ID!) {
    deleteFilter(id: $id) {
      id
    }
  }
`;

export const CREATE_FILTER_MUTATION = gql`
  mutation CREATE_FILTER_MUTATION(
    $name: String!
    $filterTerms: [String!]!
    $resultFilter: String!
  ) {
    createFilter(
      name: $name
      filterTerms: $filterTerms
      resultFilter: $resultFilter
    ) {
      id
      name
      filterTerms
      createdAt
    }
  }
`;

