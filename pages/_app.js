import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import Page from '../components/Page';
import withData from '../lib/withData';


// Creates a custom component that is used by Next.js to wrap individual pages.
// See: https://nextjs.org/docs/#custom-app.
class AppContainer extends App {
  render() {
    // `this.props.apollo` is available because of the HOC `withData` generates
    const { Component, apollo } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

// Wrapping in withData makes the apollo client accessible
// via this.props.
export default withData(AppContainer);
