import { call, put, takeLatest } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { ActionTypes } from '../../constants';
import { request, requestSuccess, requestFail, requestPending} from '../../helpers/request';

export function* doGetPlans() {
  try {
    yield put({
      type: requestPending(ActionTypes.GET_PLANS),
    });

    const response = yield call(request, 'record/', 'get');
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

export default function* planSaga() {
  yield takeLatest(ActionTypes.GET_PLANS, doGetPlans);
};
