import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { RouteURLs as Routes } from '../../constants';
import Login from '../auth/Login';

const routes = (props) => {
  const { isLoggedIn } = props;

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={Routes.ROOT} render={() => {
            if (isLoggedIn) return <Redirect to={Routes.DASHBOARD} />;
            return <Redirect to={Routes.LOGIN} />;
          }} />
          <Route path={Routes.LOGIN} component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.me,
});

export default connect(mapStateToProps, null)(routes);
