import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
import { ApolloClient } from 'apollo-boost';

class AppContainer extends App {
  // Creates a custom component that is used by Next.js to wrap individual pages.
  // See: https://nextjs.org/docs/#custom-app.
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

export default withData(AppContainer);
