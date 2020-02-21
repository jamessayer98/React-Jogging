import { fromJS } from 'immutable';

import { requestSuccess, requestFail, requestPending } from '../../helpers/request';
import { ActionTypes } from '../../constants';

const initialState = fromJS({
  plans: [],
  plan: null,
  status: 'INIT',
  error: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case requestSuccess(ActionTypes.GET_PLANS):
      return state.merge({
        plans: action.payload,
        status: requestSuccess(ActionTypes.GET_PLANS),
      });
    case requestFail(ActionTypes.GET_PLANS):
      return state.merge({
        plans: [],
        status: requestFail(ActionTypes.GET_PLANS),
        error: action.payload,
      });
    case requestPending(ActionTypes.GET_PLANS):
      return state.merge({
        status: requestPending(ActionTypes.GET_PLANS),
      });
    default:
      return state;
  }
};
