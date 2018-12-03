import React from 'react';

const FilterTable = ({ filters }) => {
  return (
    <table className='table is-hoverable is-fullwidth'>
      <thead>
        <tr>
          <th className='has-text-centered'>Name</th>
          <th className='has-text-centered'>Filter Terms</th>
          <th className='has-text-centered'>Created</th>
        </tr>
      </thead>
      <tbody>
        {filters.map(filter => (
          <tr>
            <td className='has-text-centered'>{filter.name}</td>
            <td className='has-text-centered'>{filter.filterTerms.join(', ')}</td>
            <td className='has-text-centered'>{filter.createdAt}</td>
          </tr>)
        )}
      </tbody>
    </table>
  );
};

export default FilterTable;
