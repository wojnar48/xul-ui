import React from 'react';
import Router from 'next/router';

import User from '../User';
import { roundToNearestMinutes } from 'date-fns';

const RequiresAuth = (props) => {
  return (
    <User>
      {({ data, loading }) => {
        if (loading) return <div>Loading...</div>;
        if (!data.me) Router.push({ pathname: '/login' });

        return (
          <React.Fragment>
            {props.children}
          </React.Fragment>
        );
      }}
    </User>
  );
};

export default RequiresAuth;
