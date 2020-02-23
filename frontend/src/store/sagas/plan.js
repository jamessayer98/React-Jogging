import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { ActionTypes } from '../../constants';
import { request, requestSuccess, requestFail, requestPending} from '../../helpers/request';

export function* doGetPlans(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.GET_PLANS),
    });

    const enhancedParams = {};
    Object.keys(action.params).forEach(param => {
      if (!!action.params[param]) enhancedParams[param] = action.params[param];
    });
    const response = yield call(request, 'record/', 'get', null, true, enhancedParams);
    yield put({
      type: requestSuccess(ActionTypes.GET_PLANS),
      payload: fromJS(response.data),
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.GET_PLANS),
      payload: err,
    });
  }
};

export function *doGetPlan(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.GET_PLAN),
    });

    const response = yield call(request, `record/${action.id}`, 'get');
    yield put({
      type: requestSuccess(ActionTypes.GET_PLAN),
      payload: fromJS(response.data),
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.GET_PLAN),
      payload: err,
    });
  }
};

export function *doAddPlan(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.ADD_PLAN),
    });

    const response = yield call(request, 'record/', 'post', {
      destination: action.data.destination,
      start_date: action.data.startDate,
      end_date: action.data.endDate,
      comment: action.data.comment,
    });
    yield put({
      type: requestSuccess(ActionTypes.ADD_PLAN),
      payload: fromJS(response.data),
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.ADD_PLAN),
      payload: err,
    });
  }
};

export function *doUpdatePlan(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.UPDATE_PLAN),
    });

    const response = yield call(request, `record/${action.id}/`, 'put', {
      destination: action.data.destination,
      start_date: action.data.startDate,
      end_date: action.data.endDate,
      comment: action.data.comment,
    });
    yield put({
      type: requestSuccess(ActionTypes.UPDATE_PLAN),
      payload: fromJS(response.data),      
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.UPDATE_PLAN),
      payload: err,
    });
  }
};

export function* doDeletePlan(action) {
  try {
    yield put({
      type: requestPending(ActionTypes.DELETE_PLAN),
    });

    yield call(request, `record/${action.id}/`, 'delete');
    yield put({
      type: requestSuccess(ActionTypes.DELETE_PLAN),
      payload: action.id,
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.DELETE_PLAN),
      payload: err,
    });
  }
};

export function* doGetNextPlans() {
  try {
    yield put({
      type: requestPending(ActionTypes.GET_NEXT_PLANS),
    });

    const response = yield call(request, 'next-month-plan/', 'get');
    yield put({
      type: requestSuccess(ActionTypes.GET_NEXT_PLANS),
      payload: fromJS(response.data),
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.GET_NEXT_PLANS),
      payload: err,
    });
  }
};

export default function* planSaga() {
  yield takeLatest(ActionTypes.GET_PLANS, doGetPlans);
  yield takeLatest(ActionTypes.GET_PLAN, doGetPlan);
  yield takeLatest(ActionTypes.ADD_PLAN, doAddPlan);
  yield takeLatest(ActionTypes.UPDATE_PLAN, doUpdatePlan);
  yield takeLatest(ActionTypes.DELETE_PLAN, doDeletePlan);
  yield takeLatest(ActionTypes.GET_NEXT_PLANS, doGetNextPlans);
};
