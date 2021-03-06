// Gives a HOC that exposes Apollo Client via props
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    // TODO(SW): Change uri for production
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          // We send over the cookies for the ride
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
