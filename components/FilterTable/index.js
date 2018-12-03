import React from 'react';
import PropTypes from 'prop-types';

// A helper function that takes a list of string tokens and returns Bulma CSS tags
const renderTags = (tokens) => (
  // TODO(SW): See if we can refactor this so that key does not have to be set to idx
  <div className='tags is-centered'>
    {tokens.map((token, idx) => <span key={idx} className='tag is-warning'>{token}</span>)}
  </div>
);

const FilterTable = ({ filters }) => {
  return (
    <table className='table is-hoverable is-fullwidth'>
      <thead>
        <tr>
          <th className='has-text-centered has-text-grey'>Name</th>
          <th className='has-text-centered has-text-grey'>Filter Terms</th>
          <th className='has-text-centered has-text-grey'>Created</th>
        </tr>
      </thead>
      <tbody>
        {filters.map(filter => (
          <tr key={filter.id}>
            <td className='has-text-centered'>{filter.name}</td>
            <td className='has-text-centered'>{renderTags(filter.filterTerms)}</td>
            <td className='has-text-centered'>{filter.createdAt}</td>
          </tr>)
        )}
      </tbody>
    </table>
  );
};

FilterTable.prototype = {
  filters: PropTypes.shape({
    name: PropTypes.string.isRequired,
    filterTerms: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default FilterTable;
