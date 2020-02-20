import React from 'react';
import { connect } from 'react-redux';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const { control, handleSubmit, watch, errors } = useForm();
  const { signup, authStatus } = props;

  const onSubmit = (data) => {
    signup(data);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {authStatus === requestFail(ActionTypes.AUTH_SIGNUP) && (
            <Alert color="error">Create an account failed!</Alert>
          )}
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  as={
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="Email"
                      type="email"
                      autoComplete="email"
                    />
                  }
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                  }}
                  defaultValue=""
                />
                <ErrorMessage as={<Typography color="error" />} errors={errors} name="email" />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Controller
                  as={
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      label="Confirm password"
                      type="password"
                      autoComplete="confirm-password"
                    />
                  }
                  name="confirm-password"
                  control={control}
                  rules={{
                    validate: (value) => value === watch('password') || 'The password do not match'
                  }}
                  defaultValue=""
                />
                <ErrorMessage as={<Typography color="error" />} errors={errors} name="confirm-password" />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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
  signup: AuthActions.signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
