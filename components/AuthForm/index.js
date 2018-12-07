import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

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

class AuthForm extends Component {
  // TODO(SW): Build a component to render server errors if there are any

  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    username: '',
    email: '',
    password: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  // Creates a submit handler and closes over the mutation function provided
  // by Apollo.
  createHandleSubmit = (mutation) =>
    async (e) => {
      e.preventDefault();
      await mutation();

      // Redirect to the dashboard
      // TODO(SW): Investigate why using this.props.router and Router does not work.
      window.location.href = '/dashboard';

      // Clear state
      this.setState({ email: '', username: '', password: '' });
  };

  render() {
    const { router } = this.props;
    
    // `router.pathname` will be either '/login' or '/signup' depending on which
    // page invokes the component.
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
                  variables={this.state}
                  refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                >
                  {(mutationCallback, { error, loading }) => (
                    <form method='post' onSubmit={this.createHandleSubmit(mutationCallback)}>
                      <fieldset disabled={loading} aria-busy={loading} style={{ border: 'none' }}>
                        <h2 className="subtitle is-4 has-text-centered has-text-grey">
                          {isLogin ? 'Sign in to your account' : 'Sign up for Lax'}
                        </h2>

                        <div className="field">
                          <div className="control has-text-centered">
                            {
                              isLogin
                                ? `Don't have an account yet?`
                                : 'Already have an account?'
                            }
                            {' '}
                            {
                              isLogin
                                ? <Link href='/signup'><a>Sign up here</a></Link>
                                : <Link href='/login'><a>Sign in here</a></Link>
                            }
                          </div>
                        </div>

                        <div className="field">
                          <div className="control">
                            <input
                              type='email'
                              name='email'
                              placeholder="Email"
                              className="input is-medium"
                              autoComplete='off'
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>

                        {
                          !isLogin && <div className="field">
                            <div className="control">
                              <input
                                type='text'
                                name='username'
                                placeholder="Username (Optional)"
                                className="input is-medium"
                                autoComplete='off'
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                        }

                        <div className="field">
                          <div className="control">
                            <input
                              type='password'
                              name='password'
                              placeholder="Password"
                              className="input is-medium"
                              autoComplete='off'
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="field">
                          <div className="control">
                            <button type="submit" name="register" className="button is-primary is-fullwidth is-medium">
                              {isLogin ? 'Sign in' : 'Sign up'}
                            </button>
                          </div>
                        </div>

                        <div className="field">
                          <div className="control has-text-centered">
                            <a>Forgot password?</a>
                          </div>
                        </div>
                      </fieldset>
                    </form>
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
}

export default withRouter(AuthForm);