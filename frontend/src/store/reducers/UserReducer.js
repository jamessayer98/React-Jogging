import { fromJS } from 'immutable';

import { requestSuccess, requestFail, requestPending } from '../../helpers/request';
import { ActionTypes } from '../../constants';

const initialState = fromJS({
  users: [],
  user: null,
  status: 'INIT',
  error: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case requestSuccess(ActionTypes.GET_USERS):
      return state.merge({
        users: action.payload,
        user: null,
        status: requestSuccess(ActionTypes.GET_USERS),
        error: null,
      });
    case requestFail(ActionTypes.GET_USERS):
      return state.merge({
        users: [],
        user: null,
        status: requestFail(ActionTypes.GET_USERS),
        error: action.payload,
      });
    case requestPending(ActionTypes.GET_USERS):
      return state.merge({
        status: requestPending(ActionTypes.GET_USERS),
      });

    case requestSuccess(ActionTypes.GET_USER):
      return state.merge({
        user: action.payload,
        status: requestSuccess(ActionTypes.GET_USER),
        error: null,
      });
    case requestFail(ActionTypes.GET_USER):
      return state.merge({
        user: {},
        status: requestFail(ActionTypes.GET_USER),
        error: action.payload,
      });
    case requestPending(ActionTypes.GET_USER):
      return state.merge({
        status: requestPending(ActionTypes.GET_USER),
      });

    case requestSuccess(ActionTypes.ADD_USER):
      return state.merge({
        user: action.payload,
        status: requestSuccess(ActionTypes.ADD_USER),
        error: null,
      });
    case requestFail(ActionTypes.ADD_USER):
      return state.merge({
        user: {},
        status: requestFail(ActionTypes.ADD_USER),
        error: action.payload,
      });
    case requestPending(ActionTypes.ADD_USER):
      return state.merge({
        status: requestPending(ActionTypes.ADD_USER),
      });

    case requestSuccess(ActionTypes.UPDATE_USER):
      return state.merge({
        user: action.payload,
        status: requestSuccess(ActionTypes.UPDATE_USER),
        error: null,
      });
    case requestFail(ActionTypes.UPDATE_USER):
      return state.merge({
        user: {},
        status: requestFail(ActionTypes.UPDATE_USER),
        error: action.payload,
      });
    case requestPending(ActionTypes.UPDATE_USER):
      return state.merge({
        status: requestPending(ActionTypes.UPDATE_USER),
      });

    case requestSuccess(ActionTypes.DELETE_USER): {
      const filteredUsers = state.getIn(['users'])
        .filter(user => user.get('id') !== action.payload);

      return state.merge({
        users: filteredUsers,
        status: requestSuccess(ActionTypes.DELETE_USER),
        error: null,
      });
    }
    case requestFail(ActionTypes.DELETE_USER):
      return state.merge({
        user: {},
        status: requestFail(ActionTypes.DELETE_USER),
        error: action.payload,
      });
    case requestPending(ActionTypes.DELETE_USER):
      return state.merge({
        status: requestPending(ActionTypes.DELETE_USER),
      });

      default:
      return state;
  }
};
