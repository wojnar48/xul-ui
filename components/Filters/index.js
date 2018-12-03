import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import FilterTable from '../FilterTable';
import CreateFilterModal from '../CreateFilterModal';


const ALL_FILTERS_QUERY = gql`
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
  state = {
    modalIsOpen: false,
  };

  toggleModalState = () => {
    this.setState((state) => ({ modalIsOpen: !state.modalIsOpen }));
  };

  render() {
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
                  <button
                    className='button is-primary'
                    onClick={this.toggleModalState}
                  >
                    Add Filter
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
        <CreateFilterModal
          modalIsOpen={this.state.modalIsOpen}
          toggleModalState={this.toggleModalState}
        />
      </section>
    );
  }
}

export default Filters;

