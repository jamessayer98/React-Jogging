import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'
import { Roles, RouteURLs } from '../../constants';

const AdminRoute = (props) => {
  const { component: Component, me, ...rest } = props;

  return (
    <Route
      {...rest}
      render={() => {
        if (me.toJS().role >= Roles.MANAGER) return <Component {...props} />;
        return <Redirect to={RouteURLs.DASHBOARD} />
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  me: state.getIn(['auth', 'me']),
});

export default connect(mapStateToProps, null)(AdminRoute);
