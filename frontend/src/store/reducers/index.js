import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';

import AuthReducer from './AuthReducer';
import PlanReducer from './PlanReducer';
import UserReducer from './UserReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: AuthReducer,
  plan: PlanReducer,
  user: UserReducer,
});
