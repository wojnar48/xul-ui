import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';

import FilterTable from './FilterTable';
import User from '../User';
import AuthFormContainer from '../AuthForm';
import { ALL_FILTERS_QUERY } from '../../graphql';


class Dashboard extends Component {
  // TODO(SW): Add a global Loading and Error components that can be reused

  render() {
    return (
      <User>
        {({ data }) => {
          // Show the auth form if no current user is present
          if (!data.me) return <AuthFormContainer />;

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
                      <button className='button is-primary'>
                        <Link href='/create-filter'>
                          <a>Add Filter</a>
                        </Link>
                      </button>
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

export default Dashboard;

