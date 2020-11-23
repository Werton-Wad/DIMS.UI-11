import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import auth from './Auth/auth';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isAuthorized = auth.isAuthorized();
  return (
    // <Route
    //   {...rest}
    //   render={(props) => {
    //     const isAuthorized = auth.isAuthorized();
    //     return isAuthorized ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />;
    //   }}
    // />
    isAuthorized ? <Route component={Component} /> : <Redirect to={{ pathname: '/login' }} />
  );
};

export default PrivateRoute;
