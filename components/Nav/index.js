import React from 'react';
import Link from 'next/link';

const Nav = () => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Nav;
