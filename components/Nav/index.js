import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';

import User, { CURRENT_USER_QUERY } from '../User';

// Create the sign out mutation
export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const UnauthedLinks = () => (
  <React.Fragment>
    <Link href='/login'>
      <a className="button is-white is-outlined">
        <strong>Log in</strong>
      </a>
    </Link>
    <Link href='/signup'>
      <a className="button is-primary is-outlined">
        Sign up
      </a>
    </Link>
  </React.Fragment>
);

const AuthedLinks = () => (
  // We use `refetchQueries` to ensure components that require current user data rerender
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signout) => (
      <button
      className="button is-primary is-outlined"
      onClick={signout}
      >
        Sign out
      </button>
    )}
  </Mutation>
);

const Nav = () => (
  <User>
    {({ data, loading }) => (
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className='container'>
        <div className="navbar-brand">
          <Link href='/'>
            <a className="navbar-item">
              <span className='icon is-large'>
                <i className='fas fa-bug fa-2x has-text-primary'></i>
              </span>
            </a>
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <Link href='/dashboard'>
              <a className="navbar-item is-active">
                Dashboard
              </a>
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
               {
                 !data.me
                    ? <UnauthedLinks />
                    : <AuthedLinks />
               }
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )}
  </User>
);

export default Nav;
