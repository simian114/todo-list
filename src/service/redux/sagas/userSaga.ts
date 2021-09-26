import { put, call, takeEvery } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  clear,
} from '../slices/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import Auth from 'service/auth';
import { getUser, logoutUser } from 'service/firestore/userService';

// TODO: Generator<> 의 타입지정하기
// LINK: https://stackoverflow.com/questions/66922379/yield-expression-implicitly-results-in-an-any-type-because-its-containing-ge
// NOTE: loginRequest 의 action 이 인자로 들어옴
function* login(
  action: PayloadAction<{ provider: string }>,
): Generator<any, void, any> {
  try {
    const response = yield call(Auth.login, action.payload.provider);
    const uid = response.user.uid;
    yield call(getUser, uid);
    yield put(loginSuccess({ uid }));
  } catch (error) {
    console.log(error);
    yield put(loginFailure());
  }
}

function* logout(): Generator<any, void, any> {
  logoutUser();
  yield put(clear());
}

export function* watchLogin() {
  yield takeEvery(loginRequest.type, login);
}

export function* watchLogout() {
  yield takeEvery(logoutRequest.type, logout);
}
