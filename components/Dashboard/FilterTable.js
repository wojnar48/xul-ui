import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

import { ALL_FILTERS_QUERY, DELETE_FILTER_MUTATION } from '../../graphql';
import { Button } from '../Button';


// A helper function that takes a list of string tokens and returns Bulma CSS tags
const renderTags = (tokens) => (
  // TODO(SW): See if we can refactor this so that key does not have to be set to idx
  <div className='tags is-centered'>
    {tokens.map((token, idx) => <span key={idx} className='tag is-warning'>{token}</span>)}
  </div>
);

class FilterTable extends Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
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
    NProgress.start();
    deleteFilterMutation({ variables: { id: filterId } });
  };

  render() {
    const { filters,loading } = this.props;

    return (
      <Mutation
        mutation={DELETE_FILTER_MUTATION}
        onCompleted={() => NProgress.done()}
        onError={() => NProgress.done()}
        update={this.update}
      >
        {(deleteFilter, { error, loading }) => {

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
                      <Button
                        className='is-danger is-small'
                        onClick={() => this.handleDeleteFilter(filter.id, deleteFilter)}
                        isLoading={loading}
                        isDisabled={loading}
                      >
                        Delete
                      </Button>
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
