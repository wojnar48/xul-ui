import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';
import { Query } from 'react-apollo';

import FilterTable from './FilterTable';
import CreateFilterModal from './CreateFilterModal';
import { Button } from '../Button';
import User from '../User';
import { ALL_FILTERS_QUERY } from '../../graphql';


class Dashboard extends Component {
  // TODO(SW): Add a global Loading and Error components that can be reused
  // TODO(SW): See if we can protect the route using getInitialProps in the app container

  render() {
    const { router } = this.props;

    return (
      <User>
        {({ data }) => {
          // Show the auth form if no current user is present
          if (!data.me) {
            router.replace('/login');
            return <div />;
          };

          return (
            <section className='section dashboard-section'>
              <div className='container dashboard-container'>
                <div className='columns'>
                  <div className='column'>
                    <nav className='level'>
                      <div className='level-left'>
                        <h3 className='title has-text-grey'>Filters</h3>
                      </div>
                      <div className='level-right'>
                        <CreateFilterModal />
                      </div>
                    </nav>
                    <div className='box'>
                      <Query query={ALL_FILTERS_QUERY}>
                        {({ data, loading, error }) => {
                          if (loading) return <p>Loading...</p>;
                          if (error) return <p>{`Error: ${error.message}`}</p>
                          
                          return (
                            <FilterTable
                              filters={data.filters}
                              loading={loading}
                            />
                          );
                        }}
                      </Query>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        }}
      </User>
    );
  }
}

export default withRouter(Dashboard);

