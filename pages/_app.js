import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import Page from '../components/Page';
import withData from '../lib/withData';


// Creates a custom component that is used by Next.js to wrap individual pages.
// See: https://nextjs.org/docs/#custom-app.
class AppContainer extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps  = {};

    // If the Component has any initial props, get them
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Expose the query to the user
    pageProps.query = ctx.query;

    return { pageProps };
  }

  render() {
    // `this.props.apollo` is available because of the HOC `withData` generates
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(AppContainer);
