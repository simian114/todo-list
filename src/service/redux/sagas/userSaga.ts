import { all, put, call, takeEvery } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from '../userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import Auth from 'service/auth';

// NOTE: 참고 블로그
// LINK: https://kimyang-sun.tistory.com/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%A6%AC%EB%8D%95%EC%8A%A4-%ED%88%B4%ED%82%B7-%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%82%AC%EA%B0%80-React-Redux-Toolkit-Redux-Saga-TypeScript-Nextjs

// NOTE: auth 인스턴스를 여기에 만드는게 맞는건가?
const auth = new Auth();

// TODO: Generator<> 의 타입지정하기
// LINK: https://stackoverflow.com/questions/66922379/yield-expression-implicitly-results-in-an-any-type-because-its-containing-ge
// NOTE: loginRequest 의 action 이 인자로 들어옴
function* login(
  action: PayloadAction<{ provider: string }>,
): Generator<any, void, any> {
  try {
    const response = yield call(auth.login, action.payload.provider);
    yield put(loginSuccess({ uid: response.user.uid }));
  } catch (error) {
    console.log(error);
    yield put(loginFailure());
  }
}

function* watchLogin() {
  yield takeEvery(loginRequest.type, login);
}

export default function* rootSaga() {
  yield all([watchLogin()]);
}
