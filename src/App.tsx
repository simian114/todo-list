import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, userSelector } from 'service/redux/slices/userSlice';
import LoginModal from './components/LoginModal';
import Layout from './components/Layout';
import TodoForm from 'components/Todo/TodoForm';
import TodoList from './components/Todo/TodoList';
import localStorageHelper from './utils/localStorageHelper';

const App: React.FC = () => {
  const user = useSelector(userSelector).uid;
  const dispatch = useDispatch();
  useEffect(() => {
    const visitedUser = localStorageHelper.getItem('todo-user') as string;
    if (!visitedUser) return;
    dispatch(loginSuccess({ uid: visitedUser.replace(/"/, '') }));
  }, [dispatch]);

  return (
    <Layout>
      <TodoForm />
      {/* TODO: FILTER */}
      <TodoList />
      {<LoginModal visible={!!!user} />}
    </Layout>
  );
};

export default App;
