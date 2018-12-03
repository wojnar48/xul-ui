import React from 'react';
import Link from 'next/link';

const Nav = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link href='/'>
        <a className="navbar-item">
          <span className='icon is-large'>
            <i className='fas fa-bug fa-lg has-text-primary'></i>
          </span>
        </a>
      </Link>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <Link href='/'>
          <a className="navbar-item">
            Home
          </a>
        </Link>

        <Link href='/dashboard'>
          <a className="navbar-item">
            Dashboard
          </a>
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a className="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Nav;
