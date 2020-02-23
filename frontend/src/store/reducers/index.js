import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';

import AuthReducer from './AuthReducer';
import PlanReducer from './PlanReducer';
import UserReducer from './UserReducer';
import { ActionTypes } from '../../constants';

export default (history) => {
  const appReducer = combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    plan: PlanReducer,
    user: UserReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === ActionTypes.AUTH_LOGOUT) {
      state = fromJS(undefined);
    }
    return appReducer(state, action);
  }

  return rootReducer;
}
