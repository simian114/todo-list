import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as TodoService from 'service/todos';
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

function* getTodos(
  action: PayloadAction<{ userId: string }>,
): Generator<any, void, any> {
  try {
    const todos = yield call(TodoService.getAll, action.payload.userId);
    yield put(getTodosSuccess({ todos }));
  } catch (error) {
    yield put(getTodosFailed());
  }
}

function* addTodo(
  action: PayloadAction<{ todo: Todo }>,
): Generator<any, void, any> {
  try {
    const newTodo = yield call(TodoService.addTodo, action.payload.todo);
    yield put(addTodoSuccess({ todo: newTodo }));
  } catch (error) {
    yield put(addTodoFailed());
  }
}

function* removeTodo(
  action: PayloadAction<{ id: string }>,
): Generator<any, any, any> {
  yield call(TodoService.removeTodo, action.payload.id);
}

function* updateTodo(
  action: PayloadAction<{ updateTodo: UpdateTodo }>,
): Generator<any, any, any> {
  yield call(TodoService.updateTodo, action.payload.updateTodo);
}

function* watchGetTodos() {
  yield takeEvery(getTodosRequest.type, getTodos);
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
