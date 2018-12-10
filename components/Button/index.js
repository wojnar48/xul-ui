import React from 'react';
import cnames from 'classnames';


export const Button = (props) => {
  const {
    className,
    isLoading,
    isDisabled,
  } = props;

  const classes = cnames(`button ${className}`, {
    'is-loading': isLoading,
  });

  return (
    <button
      className={classes}
      onClick={props.onClick}
      type='button'
      disabled={isDisabled}
    >
      {props.children}
    </button>
  );
};
