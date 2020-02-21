import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { fromJS } from 'immutable';

import { ActionTypes, RouteURLs } from '../../constants';
import { request, requestSuccess, requestFail} from '../../helpers/request';

export function* doLogin(action) {
  try {
    const response = yield call(request, 'login/', 'post', {
      username: action.username,
      password: action.password
    }, false);

    const { token } = response.data;
    const userInfo = {
      username: response.data.username,
      email: response.data.email,
      role: response.data.role,
    }

    if (action.remember) {
      localStorage.setItem('travel_auth', JSON.stringify({
        token,
        info: userInfo,
      }))
    }

    yield put({
      type: requestSuccess(ActionTypes.AUTH_LOGIN),
      payload: {
        token,
        info: fromJS(userInfo),
      },
    });
    yield put(push(RouteURLs.DASHBOARD));
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.AUTH_LOGIN),
      payload: err,
    });
  }
};

export function* doSignup(action) {
  try {
    yield call(request, 'signup/', 'post', {
      username: action.username,
      email: action.email,
      password: action.password
    }, false);

    yield put({
      type: requestSuccess(ActionTypes.AUTH_SIGNUP),
    });
    yield put(push(RouteURLs.LOGIN));
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.AUTH_SIGNUP),
      payload: err,
    });    
  }
}

export default function* authSaga() {
  yield takeLatest(ActionTypes.AUTH_LOGIN, doLogin);
  yield takeLatest(ActionTypes.AUTH_SIGNUP, doSignup);
};
