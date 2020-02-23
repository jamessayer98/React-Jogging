import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';

import AuthReducer from './AuthReducer';
import PlanReducer from './PlanReducer';
import UserReducer from './UserReducer';
import { ActionTypes } from '../../constants';

const appReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: AuthReducer,
  plan: PlanReducer,
  user: UserReducer,
});

export default (history) => (state, action) => {
  if (action.type === ActionTypes.AUTH_LOGOUT) {
    state = fromJS({});
  }

  return appReducer(history)(state, action);
};
