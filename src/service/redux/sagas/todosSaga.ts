import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, put, call } from 'redux-saga/effects';
import TodoWorker from 'service/firestore/todoWorker';
import { loginSuccess } from 'service/redux/slices/userSlice';
import {
  addTodoFailed,
  addTodoRequest,
  addTodoSuccess,
  getTodosFailed,
  getTodosRequest,
  getTodosSuccess,
  removeTodoRequest,
  ReOrderTodos,
  reorderTodosRequest,
  Todo,
  UpdateTodo,
  UpdateTodoStatus,
  updateTodoRequest,
  updateTodoStatusRequest,
} from '../slices/todosSlice';

const todoWorker = new TodoWorker();

function* getTodos(
  action: PayloadAction<{ uid: string }>,
): Generator<any, void, any> {
  try {
    todoWorker.init(action.payload.uid);
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

function* reorderTodos(
  action: PayloadAction<{ reorder: ReOrderTodos }>,
): Generator<any, void, any> {
  yield call(todoWorker.reorderTodo, action.payload.reorder);
}

function* updateTodoStatus(
  action: PayloadAction<{
    updateTodoStatus: UpdateTodoStatus;
  }>,
): Generator<any, void, any> {
  const { id, status } = action.payload.updateTodoStatus;
  const todo = yield call(todoWorker.getTodo, id);
  if (todo.status === status) return;
  todo.status = status;
  yield call(todoWorker.updateTodo, todo);
}

function* watchTodos() {
  yield takeEvery(getTodosRequest.type, getTodos);
  yield takeEvery(loginSuccess.type, getTodos);
  yield takeEvery(addTodoRequest.type, addTodo);
  yield takeEvery(removeTodoRequest.type, removeTodo);
  yield takeEvery(updateTodoRequest.type, updateTodo);
  yield takeEvery(reorderTodosRequest.type, reorderTodos);
  yield takeEvery(updateTodoStatusRequest.type, updateTodoStatus);
}

export default function* watchTodo() {
  yield watchTodos();
}
