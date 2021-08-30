import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'service/redux/userSlice';
import { getAll } from 'service/todos';
import styled from 'styled-components';
import LoginModal from './components/LoginModal/LoginModal';

interface Props {
  auth: any;
  repository: any;
}

const App: React.FC<Props> = ({ auth, repository }) => {
  const user = useSelector(userSelector).uid;

  // const handleLogout = (e: any) => {
  //   auth.logout();
  // };

  // const handleAddTodo = () => {
  //   repository.addTodo(user);
  // };

  // const handleGetTodos = () => {
  //   repository.getTodos(user);
  // };

  // useEffect(() => {
  //   auth.onAuthChange();
  // }, [auth]);
  useEffect(() => {
    if (!user) return;
    const getAllAsync = async () => {
      const todos = await getAll(user);
      console.log(todos);
      if (!todos) {
        console.log('todos is empty!');
        return;
      }
      Object.entries(todos).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
      });
    };
    getAllAsync();
  }, [user]);

  return <StyledApp>{<LoginModal visible={!!!user} />}</StyledApp>;
};

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
