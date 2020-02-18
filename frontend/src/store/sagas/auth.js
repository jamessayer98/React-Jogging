import { call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from '../../constants';
import { request, requestSuccess, requestFail} from '../../helpers/request';

export function* doLogin(action) {
  try {
    const response = yield call(request, 'auth/login', 'post', {
      username: action.username,
      password: action.password
    });
    yield put({
      type: requestSuccess(ActionTypes.AUTH_LOGIN),
      payload: {
        token: response.data.token,
        me: {
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        },
      },
    });
  } catch (err) {
    yield put({
      type: requestFail(ActionTypes.AUTH_LOGIN),
      payload: err,
    });
  }
};

export default function* authSaga() {
  yield takeLatest(ActionTypes.AUTH_LOGIN, doLogin);
};
