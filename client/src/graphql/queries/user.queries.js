import { gql } from 'apollo-boost';

export const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

export const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;
