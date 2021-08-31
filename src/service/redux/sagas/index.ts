import { all } from 'redux-saga/effects';
import watchGetTodos from './todosSaga';
import watchLogin from './userSaga';

export default function* rootSaga() {
  yield all([watchLogin(), watchGetTodos()]);
}
