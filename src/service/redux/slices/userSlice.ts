import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import todoWorker from 'service/firestore/todoWorker';
import { RootState } from 'service/redux/store';
import { localStorageHelper } from 'utils';

export interface UserState {
  uid: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  uid: '',
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clear: (state: UserState) => {
      state.uid = '';
      state.status = 'idle';
    },
    loginRequest: (
      state: UserState,
      // NOTE: 이거 없으면 saga의 watchLogin 에 인자안감
      action: PayloadAction<{ provider: string }>,
    ) => {
      state.status = 'loading';
    },
    loginSuccess: (
      state: UserState,
      action: PayloadAction<{ uid: string }>,
    ) => {
      localStorageHelper.setItem('todo-user', action.payload.uid);
      todoWorker.init(action.payload.uid);
      state.status = 'idle';
      state.uid = action.payload.uid;
    },
    loginFailure: (state: UserState) => {
      state.status = 'failed';
    },
    logoutRequest: () => {
      localStorageHelper.removeItem('todo-user');
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  clear,
  logoutRequest,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
