import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import AuthReducer from './AuthReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth: AuthReducer,
});
