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
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AuthActions } from '../../../store/actions';

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

const Login = (props) => {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const { login } = props;

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
            <Controller
              as={
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              }
              name="remember"
              type="checkbox"
              control={control}
              defaultValue={false}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs offset={6}>
                <Link href="#" variant="body2">
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

const mapDispatchToProps = {
  login: AuthActions.login,
};

export default connect(null, mapDispatchToProps)(Login);
