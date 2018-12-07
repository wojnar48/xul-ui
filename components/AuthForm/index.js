import React from 'react';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import AuthForm from './AuthForm';
import { CURRENT_USER_QUERY } from '../User';


export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $username: String!, $password: String!) {
    signup(email: $email, username: $username, password: $password) {
      id
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

const AuthFormContainer = (props) => {
  const { router } = props;
    
  // `router.pathname` will be either '/login' or '/signup' depending on the URL
  const isLogin = router.pathname === '/login';
  // Select which mutation to use
  const mutation = isLogin ? LOGIN_MUTATION : SIGNUP_MUTATION;
    
  return (
    <section className="section has-background-white-ter" style={{ height: '100vh' }}>
      <div className="container">
        <div className="columns">
          <div className='column is-4'></div>
          <div className="column is-4">
            <div className="box">
              <Mutation
                mutation={mutation}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
              >
                {(mutationCallback, { error, loading }) => (
                  <AuthForm
                    mutation={mutationCallback}
                    isLoading={loading}
                    isLogin={isLogin}
                  />
              )}
              </Mutation>
            </div>
          </div>
          <div className='column is-4'></div>
        </div>
      </div>
    </section>
  );
}

AuthFormContainer.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(AuthFormContainer);