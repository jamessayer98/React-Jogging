import { requestSuccess, requestFail } from '../../helpers/request';
import { ActionTypes } from '../../constants';

const getInitialState = () => {
  const authRestore = JSON.parse(localStorage.getItem('travel_auth') || null);

  return authRestore ? {
    token: authRestore.token,
    me: authRestore.info,
    status: 'INIT',
    error: null,
  } : {
    token: null,
    me: null,
    status: 'INIT',
    error: null,
  };
};

const initialState = getInitialState();

export default (state = initialState, action) => {
  switch (action.type) {
    case requestSuccess(ActionTypes.AUTH_LOGIN):
      return {
        ...state,
        token: action.payload.token,
        me: action.payload.info,
        status: requestSuccess(ActionTypes.AUTH_LOGIN),
      };
    case requestFail(ActionTypes.AUTH_LOGIN):
      return {
        ...state,
        token: null,
        me: null,
        status: requestFail(ActionTypes.AUTH_LOGIN),
        error: action.payload,
      };
    case requestSuccess(ActionTypes.AUTH_SIGNUP):
      return {
        ...state,
        status: requestSuccess(ActionTypes.AUTH_SIGNUP),
      };
    case requestFail(ActionTypes.AUTH_SIGNUP):
      return {
        ...state,
        status: requestFail(ActionTypes.AUTH_SIGNUP),
        error: action.payload,
      };
    default:
      return state;
  }
};
