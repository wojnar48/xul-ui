import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import { ALL_FILTERS_QUERY } from '../Filters';


// A helper function that takes a list of string tokens and returns Bulma CSS tags
const renderTags = (tokens) => (
  // TODO(SW): See if we can refactor this so that key does not have to be set to idx
  <div className='tags is-centered'>
    {tokens.map((token, idx) => <span key={idx} className='tag is-warning'>{token}</span>)}
  </div>
);

// TODO(SW): Generalize this into a reusable component
export const DELETE_FILTER_MUTATION = gql`
  mutation DELETE_FILTER_MUTATION($id: ID!) {
    deleteFilter(id: $id) {
      id
    }
  }
`;

class FilterTable extends Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
  };

  update = (cache, payload) => {
    // We can manually update the cache so that the client matches the
    // state of the server.

    // Read the cache for the filters we want
    const data = cache.readQuery({ query: ALL_FILTERS_QUERY });

    // Filter our the ID that was just deleted
    data.filters = data.filters.filter(filter => filter.id !== payload.data.deleteFilter.id);

    // Put filtered data back into cache
    cache.writeQuery({ query: ALL_FILTERS_QUERY, data });
  }

  handleDeleteFilter = (filterId, deleteFilterMutation) => {
    deleteFilterMutation({ variables: { id: filterId } });
  };

  render() {
    const { filters } = this.props;

    return (
      <Mutation
        mutation={DELETE_FILTER_MUTATION}
        update={this.update}
      >
        {(deleteFilter, { error, loading }) => {
          if (loading) return <div>Loading...</div>;

          return (
            <table className='table is-hoverable is-fullwidth'>
              <thead>
                <tr>
                  <th className='has-text-centered has-text-grey'>Name</th>
                  <th className='has-text-centered has-text-grey'>Filter Terms</th>
                  <th className='has-text-centered has-text-grey'>Created</th>
                  <th className='has-text-centered has-text-grey'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filters.map(filter => (
                  <tr key={filter.id}>
                    <td className='has-text-centered'>{filter.name}</td>
                    <td className='has-text-centered'>{renderTags(filter.filterTerms)}</td>
                    <td className='has-text-centered'>{filter.createdAt}</td>
                    <td className='has-text-centered'>
                      <button
                        className='button is-danger is-small'
                        onClick={() => this.handleDeleteFilter(filter.id, deleteFilter)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>)
                )}
              </tbody>
            </table>
          );
        }}
      </Mutation>
    );
  }
};

export default FilterTable;
