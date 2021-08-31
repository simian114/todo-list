import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, put, call } from 'redux-saga/effects';
import { getAll } from 'service/todos';
import {
  getTodosFailed,
  getTodosRequest,
  getTodosSuccess,
} from '../slices/todosSlice';

function* getTodos(
  action: PayloadAction<{ userId: string }>,
): Generator<any, void, any> {
  try {
    // TODO: API CALL;
    const todos = yield call(getAll, action.payload.userId);
    console.log('$$$$$$$$$$$$$$$$$$');
    // TODO: if todos is null,
    console.log(todos);
    console.log('$$$$$$$$$$$$$$$$$$');
    yield put(getTodosSuccess({ todos: todos }));
  } catch (error) {
    yield put(getTodosFailed());
  }
}

export default function* watchGetTodos() {
  yield takeEvery(getTodosRequest.type, getTodos);
}
