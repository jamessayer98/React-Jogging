import React from 'react';
import { connect } from 'react-redux';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
  Container,
  Typography,
  CssBaseline,
  TextField,
  Button,
  Grid,
  Link,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { AuthActions } from '../../../store/actions';
import { requestFail } from '../../../helpers/request';
import { ActionTypes } from '../../../constants';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = (props) => {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const { login, authStatus } = props;

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {authStatus === requestFail(ActionTypes.AUTH_LOGIN) && (
              <Alert color="error">Invalid username or password!</Alert>
            )}
            <Controller
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Username"
                  autoComplete="username"
                  autoFocus
                />
              }
              name="username"
              control={control}
              rules={{
                required: 'Username is required',
              }}
              defaultValue=""
            />
            <ErrorMessage as={<Typography color="error" />} errors={errors} name="username" />
            <Controller
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              }
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
              }}
              defaultValue=""
            />
            <ErrorMessage as={<Typography color="error" />} errors={errors} name="password" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
};

const mapStateToProps = (state) => ({
  authStatus: state.getIn(['auth', 'status']),
});

const mapDispatchToProps = {
  login: AuthActions.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
