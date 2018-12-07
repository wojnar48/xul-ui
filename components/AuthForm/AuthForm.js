import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


class AuthForm extends Component {

  // TODO(SW): Build a component to render server errors if there are any

  static propTypes = {
    isLogin: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    mutation: PropTypes.func.isRequired,
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

  // Creates a submit handler and closes over the mutation fn provided as a prop
  createHandleSubmit = (mutationCb) =>
    async (e) => {
      e.preventDefault();
      await mutationCb({ variables: this.state });

      // Redirect to the dashboard
      // TODO(SW): Investigate why using this.props.router and Router does not work.
      window.location.href = '/dashboard';

      // Clear state
      this.setState({ email: '', username: '', password: '' });
  };

  render() {
    const { isLogin, isLoading, mutation } = this.props;

    return (
      <form method='post' onSubmit={this.createHandleSubmit(mutation)}>
        <fieldset disabled={isLoading} aria-busy={isLoading} style={{ border: 'none' }}>
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
    );
  }
}

export default AuthForm;