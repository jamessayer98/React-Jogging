import { ActionTypes } from '../../constants';

export const login = (credentials) => {
  return {
    type: ActionTypes.AUTH_LOGIN,
    ...credentials,
  };
};

export const signup = (credentials) => {
  return {
    type: ActionTypes.AUTH_SIGNUP,
    ...credentials,
  };
};

export const logout = () => {
  localStorage.removeItem('travel_auth');

  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
};
