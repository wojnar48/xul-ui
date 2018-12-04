import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';


class LoginForm extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    username: '',
    email: '',
    password: '',
  };

  render() {
    const { router } = this.props;
    
    // `router.pathname` will be either '/login' or '/signup' depending on which
    // page invokes the component.
    const isLogin = router.pathname === '/login';

    return (
      <section className="section has-background-white-ter" style={{ height: '100vh' }}>
        <div className="container">
          <div className="columns">
            <div className='column is-4'></div>
            <div className="column is-4">
              <div className="box">
                <form>
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

                </form>
              </div>
            </div>
          <div className='column is-4'></div>
        </div>
        </div>
      </section>
    );
  }
}

export default withRouter(LoginForm);