import React from 'react';


const renderTags = (tokens) => (
  <div className='tags is-centered'>
    {tokens.map(token => <span className='tag is-warning'>{token}</span>)}
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
          <tr>
            <td className='has-text-centered'>{filter.name}</td>
            <td className='has-text-centered'>{renderTags(filter.filterTerms)}</td>
            <td className='has-text-centered'>{filter.createdAt}</td>
          </tr>)
        )}
      </tbody>
    </table>
  );
};

export default FilterTable;
