import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm, Controller, ErrorMessage } from 'react-hook-form';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { RouteURLs, ActionTypes, Roles } from '../../../constants';
import { UserActions } from '../../../store/actions';
import { requestSuccess, requestFail } from '../../../helpers/request';
import { getAvailableRoles } from '../../../helpers/role';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  select: {
    width: '100%',
    margin: theme.spacing(2, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserEdit = (props) => {
  const classes = useStyles();
  const {
    getUser,
    addUser,
    updateUser,
    me,
    user,
    status,
    error,
  } = props;
  const { control, handleSubmit, setValue, watch, errors } = useForm();
  const params = useParams();

  useEffect(() => {
    if (params.id) getUser(params.id);
    setValue('role', 0);
  }, []);

  useEffect(() => {
    if (!user || !user.toJS()) return;
    setValue('username', user.toJS().username);
    setValue('email', user.toJS().email);
    setValue('role', user.toJS().profile.role);
  }, [user]);

  const requestIsSucceeded = () => {
    return status === requestSuccess(ActionTypes.ADD_USER) || status === requestSuccess(ActionTypes.UPDATE_USER);
  };

  const requestIsFailed = () => {
    return status === requestFail(ActionTypes.ADD_USER) || status === requestFail(ActionTypes.UPDATE_USER);
  };

  const getErrorText = () => {
    return error ? Object.keys(error.data).map((key) => (
      <div key={key}>{`${key}: ${error.data[key]}`}</div>
    )) : '';
  };

  const onSubmit = (data) => {
    if (params.id) updateUser(user.toJS().id, data);
    else addUser(data);
  };

  return (
    <>
      <Container maxWidth="sm">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {params.id ? 'Update user' : 'Create a new user'}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {requestIsSucceeded() && (
              <Alert color="success">
                {params.id ? 'Update a user successfully': 'Create a new user successfully'}
              </Alert>
            )}
            {requestIsFailed() && (
              <Alert color="error">
                {getErrorText()}
              </Alert>
            )}
            <Grid container spacing={1}>
              <Grid item sm={12}>
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
              <Grid item sm={12}>
                <Controller
                  as={
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      type="email"
                      label="Email"
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
              <Grid item sm={12}>
                <Controller
                  as={
                    <Select className={classes.select} variant="outlined" native>
                      {Object.keys(getAvailableRoles(me.toJS().role)).map(role => (
                        <option value={Roles[role]} key={role}>
                          {role}
                        </option>
                      ))}
                    </Select>
                  }
                  name="role"
                  control={control}
                  rules={{
                    required: 'Role is required',
                  }}
                  defaultValue=""
                />
                <ErrorMessage as={<Typography color="error" />} errors={errors} name="role" />
              </Grid>
              {!params.id && (
                <>
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
                </>
              )}
              <Grid container>
                <Grid item xs>
                  <Button href={RouteURLs.USERS} color="primary">
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {params.id ? 'Update': 'Add'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  me: state.getIn(['auth', 'me']),
  user: state.getIn(['user', 'user']),
  status: state.getIn(['user', 'status']),
  error: state.getIn(['user', 'error']),
});

const mapDispatchToProps = {
  getUser: UserActions.getUser,
  addUser: UserActions.addUser,
  updateUser: UserActions.updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
