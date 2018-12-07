import React from 'react';
import { withRouter } from 'next/router';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import AuthForm from './AuthForm';
import { CURRENT_USER_QUERY } from '../User';
import {
  SIGNUP_MUTATION,
  LOGIN_MUTATION
} from '../../graphql';


const AuthFormContainer = (props) => {
  const { router } = props;
    
  // `router.pathname` will be either '/login' or '/signup' depending on the URL
  const isLogin = router.pathname === '/login';
  // Select which mutation to use
  const mutation = isLogin ? LOGIN_MUTATION : SIGNUP_MUTATION;
    
  return (
    <section className='section has-background-white-ter' style={{ height: '100vh' }}>
      <div className='container'>
        <div className='columns'>
          <div className='column is-4' />
          <div className='column is-4'>
            <div className='box'>
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
          <div className='column is-4' />
        </div>
      </div>
    </section>
  );
}

AuthFormContainer.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(AuthFormContainer);