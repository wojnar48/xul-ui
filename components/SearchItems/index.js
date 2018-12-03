import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import SearchItem from '../SearchItem';


const ALL_SEARCH_ITEMS_QUERY = gql`
  query ALL_SEARCH_ITEMS_QUERY {
    searchItems {
      id
      text
    }
  }
`;

class SearchItems extends Component {
  render() {
    return (
      <div>
        <p>Search Items</p>
        <Query query={ALL_SEARCH_ITEMS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{`Error: ${error.message}`}</p>

            return (
              <div>
                {data.searchItems.map((item) =>
                  <SearchItem key={item.id} item={item} />)}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default SearchItems;

