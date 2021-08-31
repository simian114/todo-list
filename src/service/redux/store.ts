import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from 'service/redux/slices/userSlice';
import todosReducer from 'service/redux/slices/todosSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // TODO: serializableCheck: false 를 하지 않으면 getAllSuccess 에서 에러가 발생
    // LINK: https://stackoverflow.com/a/63244831 이유 알아내자
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware,
    ),
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
