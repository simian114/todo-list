import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, put, call } from 'redux-saga/effects';
import TodoWorker from 'service/firestore/todoWorker';
import { loginSuccess } from 'service/redux/slices/userSlice';
import {
  addTodoRequest,
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
  setTodosError,
} from '../slices/todosSlice';

function* getTodos(
  action: PayloadAction<{ uid: string }>,
): Generator<any, void, any> {
  try {
    const todos = yield call(TodoWorker.getAll);
    yield put(getTodosSuccess({ todos }));
  } catch (error) {
    yield put(getTodosFailed());
  }
}

function* addTodo(
  action: PayloadAction<{ todo: Todo }>,
): Generator<any, void, any> {
  try {
    yield call(TodoWorker.addTodo, action.payload.todo);
  } catch (error) {
    yield put(
      setTodosError({ errorMessage: 'todo 추가에 에러가 발생했습니다.' }),
    );
  }
}

function* removeTodo(
  action: PayloadAction<{ id: string }>,
): Generator<any, any, any> {
  yield call(TodoWorker.removeTodo, action.payload.id);
}

function* updateTodo(
  action: PayloadAction<{ updateTodo: UpdateTodo }>,
): Generator<any, any, any> {
  yield call(TodoWorker.updateTodo, action.payload.updateTodo);
}

function* reorderTodos(
  action: PayloadAction<{ reorder: ReOrderTodos }>,
): Generator<any, void, any> {
  yield call(TodoWorker.reorderTodo, action.payload.reorder);
}

function* updateTodoStatus(
  action: PayloadAction<{
    updateTodoStatus: UpdateTodoStatus;
  }>,
): Generator<any, void, any> {
  const { id, status } = action.payload.updateTodoStatus;
  const todo = yield call(TodoWorker.getTodo, id);
  if (todo.status === status) return;
  todo.status = status;
  yield call(TodoWorker.updateTodo, todo);
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
