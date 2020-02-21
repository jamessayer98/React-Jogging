import { all } from 'redux-saga/effects';
import auth from './auth';
import plan from './plan';

export default function* rootSaga () {
  yield all([
    auth(),
    plan(),
  ]);
};
