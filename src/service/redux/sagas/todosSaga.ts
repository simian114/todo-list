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

function* getTodos(): Generator<any, void, any> {
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
  try {
    yield call(TodoWorker.removeTodo, action.payload.id);
  } catch (error) {
    yield put(setTodosError({ errorMessage: 'todo 삭제에 실패했습니다.' }));
  }
}

function* updateTodo(
  action: PayloadAction<{ updateTodo: UpdateTodo }>,
): Generator<any, any, any> {
  try {
    yield call(TodoWorker.updateTodo, action.payload.updateTodo);
  } catch (error) {
    yield put(setTodosError({ errorMessage: 'todo 업데이트에 실패했습니다.' }));
  }
}

function* reorderTodos(
  action: PayloadAction<{ reorder: ReOrderTodos }>,
): Generator<any, void, any> {
  try {
    yield call(TodoWorker.reorderTodo, action.payload.reorder);
  } catch (error) {
    yield put(setTodosError({ errorMessage: 'todo 업데이트에 실패했습니다.' }));
  }
}

function* updateTodoStatus(
  action: PayloadAction<{
    updateTodoStatus: UpdateTodoStatus;
  }>,
): Generator<any, void, any> {
  try {
    const { id, status } = action.payload.updateTodoStatus;
    const todo = yield call(TodoWorker.getTodo, id);
    if (todo.status === status) return;
    todo.status = status;
    yield call(TodoWorker.updateTodo, todo);
  } catch (error) {
    yield put(setTodosError({ errorMessage: 'todo 업데이트에 실패했습니다.' }));
  }
}

function* watchTodos() {
  // NOTE: 에러가 발생하면 getTodos 를 호출해서 에러 이전의 상태로 돌린다.
  yield takeEvery(
    [getTodosRequest.type, loginSuccess.type, setTodosError.type],
    getTodos,
  );
  yield takeEvery(addTodoRequest.type, addTodo);
  yield takeEvery(removeTodoRequest.type, removeTodo);
  yield takeEvery(updateTodoRequest.type, updateTodo);
  yield takeEvery(reorderTodosRequest.type, reorderTodos);
  yield takeEvery(updateTodoStatusRequest.type, updateTodoStatus);
}

export default function* watchTodo() {
  yield watchTodos();
}
