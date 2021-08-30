import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import userReducer from 'service/redux/userSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/userSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
