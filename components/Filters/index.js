import React, { Component } from 'react';
import Link from 'next/link';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import FilterTable from './FilterTable';
import RequiresAuth from '../RequiresAuth';


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

class Filters extends Component {
  // TODO(SW): Add a global Loading and Error components that can be reused

  render() {
    return (
      <RequiresAuth>
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
                      
                      return <FilterTable filters={data.filters} />;
                    }}
                  </Query>
                </div>
              </div>
            </div>
          </div>
        </section>
      </RequiresAuth>
    );
  }
}

export default Filters;

