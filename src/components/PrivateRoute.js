import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from './Auth/AuthProvider';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const currentUser = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return !!currentUser ? <Component {...props} {...rest} /> : <Redirect to={{ pathname: '/login' }} />;
      }}
    />
  );
};

export default PrivateRoute;
