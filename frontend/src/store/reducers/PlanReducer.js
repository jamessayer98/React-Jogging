import { fromJS } from 'immutable';

import { requestSuccess, requestFail, requestPending } from '../../helpers/request';
import { ActionTypes } from '../../constants';

const initialState = fromJS({
  plans: [],
  nextPlans: [],
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
        error: null,
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

    case requestSuccess(ActionTypes.GET_PLAN):
      return state.merge({
        plan: action.payload,
        status: requestSuccess(ActionTypes.GET_PLAN),
        error: null,
      });
    case requestFail(ActionTypes.GET_PLAN):
      return state.merge({
        plan: {},
        status: requestFail(ActionTypes.GET_PLAN),
        error: action.payload,
      });
    case requestPending(ActionTypes.GET_PLAN):
      return state.merge({
        status: requestPending(ActionTypes.GET_PLAN),
      });

    case requestSuccess(ActionTypes.ADD_PLAN):
      return state.merge({
        plan: action.payload,
        status: requestSuccess(ActionTypes.ADD_PLAN),
        error: null,
      });
    case requestFail(ActionTypes.ADD_PLAN):
      return state.merge({
        plan: {},
        status: requestFail(ActionTypes.ADD_PLAN),
        error: action.payload,
      });
    case requestPending(ActionTypes.ADD_PLAN):
      return state.merge({
        status: requestPending(ActionTypes.ADD_PLAN),
      });

    case requestSuccess(ActionTypes.UPDATE_PLAN):
      return state.merge({
        plan: action.payload,
        status: requestSuccess(ActionTypes.UPDATE_PLAN),
        error: null,
      });
    case requestFail(ActionTypes.UPDATE_PLAN):
      return state.merge({
        plan: {},
        status: requestFail(ActionTypes.UPDATE_PLAN),
        error: action.payload,
      });
    case requestPending(ActionTypes.UPDATE_PLAN):
      return state.merge({
        status: requestPending(ActionTypes.UPDATE_PLAN),
      });

    case requestSuccess(ActionTypes.DELETE_PLAN): {
      const filteredPlans = state.getIn(['plans'])
        .filter(plan => plan.get('id') !== action.payload);
      const filteredNextPlans = state.getIn(['nextPlans'])
        .filter(plan => plan.get('id') !== action.payload);

      return state.merge({
        plans: filteredPlans,
        nextPlans: filteredNextPlans,
        status: requestSuccess(ActionTypes.DELETE_PLAN),
        error: null,
      });
    }
    case requestFail(ActionTypes.DELETE_PLAN):
      return state.merge({
        plan: {},
        status: requestFail(ActionTypes.DELETE_PLAN),
        error: action.payload,
      });
    case requestPending(ActionTypes.DELETE_PLAN):
      return state.merge({
        status: requestPending(ActionTypes.DELETE_PLAN),
      });

    case requestSuccess(ActionTypes.GET_NEXT_PLANS):
      return state.merge({
        nextPlans: action.payload,
        status: requestSuccess(ActionTypes.GET_NEXT_PLANS),
        error: null,
      });
    case requestFail(ActionTypes.GET_NEXT_PLANS):
      return state.merge({
        nextPlans: [],
        status: requestFail(ActionTypes.GET_NEXT_PLANS),
        error: action.payload,
      });
    case requestPending(ActionTypes.GET_NEXT_PLANS):
      return state.merge({
        status: requestPending(ActionTypes.GET_NEXT_PLANS),
      });
    default:
      return state;
  }
};
