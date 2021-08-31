import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'service/redux/store';

export interface UserState {
  uid: string;
  status: 'idle' | 'loading' | 'failed';
  // status: [keyof Status];
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
      console.log('------login request------');
      state.status = 'loading';
    },
    loginSuccess: (
      state: UserState,
      action: PayloadAction<{ uid: string }>,
    ) => {
      console.log('---------login success--------', action.payload.uid);
      state.status = 'idle';
      state.uid = action.payload.uid;
    },
    loginFailure: (state: UserState) => {
      console.log('-------- login failed ---------');
      state.status = 'failed';
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  clear,
  // logoutRequest,
  // logoutSuccess,
  // logoutFailure,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
