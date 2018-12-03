// Gives a HOC that exposes Apollo Client via props
import withApollo from 'next-with-apollo';
// Package containing everything you need to set up Apollo Client
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    // TODO(SW): Change uri for production
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
