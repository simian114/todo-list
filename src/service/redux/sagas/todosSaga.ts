import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import TodoWorker from 'service/firestore/todoService';
import { loginSuccess } from 'service/redux/slices/userSlice';
import {
  addTodoFailed,
  addTodoRequest,
  addTodoSuccess,
  getTodosFailed,
  getTodosRequest,
  getTodosSuccess,
  removeTodoRequest,
  Todo,
  UpdateTodo,
  updateTodoRequest,
} from '../slices/todosSlice';

const todoWorker = new TodoWorker('qi9QgyeEGmdiEmLWj26ZULJRAGI3');

function* getTodos(
  action: PayloadAction<{ uid: string }>,
): Generator<any, void, any> {
  try {
    const todos = yield call(todoWorker.getAll);
    yield put(getTodosSuccess({ todos }));
  } catch (error) {
    yield put(getTodosFailed());
  }
}

function* addTodo(
  action: PayloadAction<{ todo: Todo }>,
): Generator<any, void, any> {
  try {
    const newTodoId = yield call(todoWorker.addTodo, action.payload.todo);
    const newTodo = yield call(todoWorker.getTodo, newTodoId);
    yield put(addTodoSuccess({ todo: newTodo }));
  } catch (error) {
    yield put(addTodoFailed());
  }
}

function* removeTodo(
  action: PayloadAction<{ id: string }>,
): Generator<any, any, any> {
  yield call(todoWorker.removeTodo, action.payload.id);
}

function* updateTodo(
  action: PayloadAction<{ updateTodo: UpdateTodo }>,
): Generator<any, any, any> {
  yield call(todoWorker.updateTodo, action.payload.updateTodo);
}

function* watchGetTodos() {
  yield takeEvery(getTodosRequest.type, getTodos);
  yield takeEvery(loginSuccess.type, getTodos);
}

function* watchAddTodo() {
  yield takeEvery(addTodoRequest.type, addTodo);
}

function* watchRemoveTodo() {
  yield takeEvery(removeTodoRequest.type, removeTodo);
}

function* watchUpdateTodo() {
  yield takeEvery(updateTodoRequest.type, updateTodo);
}

export default function* watchTodo() {
  yield all([
    watchGetTodos(),
    watchAddTodo(),
    watchRemoveTodo(),
    watchUpdateTodo(),
  ]);
}
