import React from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

import Nav from '../Nav';

// Use the router provided by Next.js to listen for route changes and render a
// progress bar using the nprogress package.
Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => <Nav />;

export default Header;
