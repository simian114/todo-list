import { all } from 'redux-saga/effects';
import watchTodo from './todosSaga';
import { watchLogin, watchLogout } from './userSaga';

export default function* rootSaga() {
  // yield all([watchLogin(), watchLogout(), watchGetTodos()]);
  yield all([watchLogin(), watchLogout(), watchTodo()]);
}
