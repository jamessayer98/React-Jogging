import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

import { RouteURLs, Roles } from '../../constants';
import { AuthActions } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    marginRight: theme.spacing(2),
    color: 'white',
    textDecoration: 'none',
  },
  activeLink: {
    color: '#00FFFF',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { me, history, logout } = props;

  const isUserManageAllowed = me.role >= Roles.MANAGER;

  const handleLogout = () => {
    logout();
    history.push(RouteURLs.ROOT);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Travel
            </Typography>
            <NavLink
              className={classes.link}
              activeClassName={classes.activeLink}
              to={RouteURLs.DASHBOARD}
              exact={true}
            >
              <Button color="inherit">Dashboard</Button>
            </NavLink>
            <NavLink
              className={classes.link}
              activeClassName={classes.activeLink}
              to={RouteURLs.PLANS}
              exact={true}
            >
              <Button color="inherit">Travel Plans</Button>
            </NavLink>
            {isUserManageAllowed && (
              <NavLink
                className={classes.link}
                activeClassName={classes.activeLink}
                to={RouteURLs.USERS}
                exact={true}
              >
                <Button color="inherit">Users</Button>
              </NavLink>              
            )}
            <IconButton aria-label="logout" color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
};

const mapStateToProps = (state) => ({
  me: state.getIn(['auth', 'me']),
});

const mapDispatchToProps = {
  logout: AuthActions.logout,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Header);
