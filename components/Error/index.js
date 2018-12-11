import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';


const ErrorItem = ({ error, handleDelete }) => (
  <div className={styles.errorContainer}>
    <div className='notification has-background-white'>
      <button
        className={`delete ${styles.errorDelete}`}
        onClick={handleDelete}
      ></button>
      <p className='has-text-danger'>
        <strong>Error: </strong>
        {' '}
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  </div>
);

const DisplayError = ({ error, handleDelete }) => {
  if (!error || !error.message) return null;

  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <div key={i}>
        <ErrorItem error={error} handleDelete={handleDelete} />
      </div>
    ));
  }

  return (
    <div>
      <ErrorItem error={error} handleDelete={handleDelete} />
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
  handleDelete: () => ({}),
};

DisplayError.propTypes = {
  error: PropTypes.object,
  handleDelete: PropTypes.func,
};

export default DisplayError;
