import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { ActionTypes } from '../../constants';
import { request, requestSuccess, requestFail, requestPending} from '../../helpers/request';

export function* doGetUsers() {
  try {
    yield put({
      type: requestPending(ActionTypes.GET_USERS),
    });

    const response = yield call(request, 'user/', 'get');
    yield put({
      type: requestSuccess(ActionTypes.GET_USERS),
      payload: fromJS(response.data),
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.GET_USERS),
      payload: err,
    });
  }
};

export function *doGetUser(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.GET_USER),
    });

    const response = yield call(request, `user/${action.id}`, 'get');
    yield put({
      type: requestSuccess(ActionTypes.GET_USER),
      payload: fromJS(response.data),
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.GET_USER),
      payload: err,
    });
  }
};

export function *doAddUser(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.ADD_USER),
    });

    const response = yield call(request, 'user/', 'post', {
      username: action.data.username,
      email: action.data.email,
      role: action.data.role,
    });
    yield put({
      type: requestSuccess(ActionTypes.ADD_USER),
      payload: fromJS(response.data),
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.ADD_USER),
      payload: err,
    });
  }
};

export function *doUpdateUser(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.UPDATE_USER),
    });

    const response = yield call(request, `user/${action.id}/`, 'put', {
      username: action.data.username,
      email: action.data.email,
      role: action.data.role,
    });
    yield put({
      type: requestSuccess(ActionTypes.UPDATE_USER),
      payload: fromJS(response.data),      
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.UPDATE_USER),
      payload: err,
    });
  }
};

export function* doDeleteUser(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.DELETE_USER),
    });

    yield call(request, `user/${action.id}/`, 'delete');
    yield put({
      type: requestSuccess(ActionTypes.DELETE_USER),
      payload: action.id,
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.DELETE_USER),
      payload: err,
    });
  }
};

export default function* planSaga() {
  yield takeLatest(ActionTypes.GET_USERS, doGetUsers);
  yield takeLatest(ActionTypes.GET_USER, doGetUser);
  yield takeLatest(ActionTypes.ADD_USER, doAddUser);
  yield takeLatest(ActionTypes.UPDATE_USER, doUpdateUser);
  yield takeLatest(ActionTypes.DELETE_USER, doDeleteUser);
};
