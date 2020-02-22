import { all } from 'redux-saga/effects';
import auth from './auth';
import plan from './plan';
import user from './user';

export default function* rootSaga () {
  yield all([
    auth(),
    plan(),
    user(),
  ]);
};
