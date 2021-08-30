import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginModal from './components/LoginModal/LoginModal';

// import { Counter } from './features/counter/Counter';
interface Props {
  auth: any;
  repository: any;
}

const App: React.FC<Props> = ({ auth, repository }) => {
  const [user, setUser] = useState(null);

  // const handleLogin = async (e: any) => {
  //   // NOTE: 전달되는 data 의 user.uid 를 이용하면 된다.
  //   const response = await auth.login(e.target.textContent);
  //   const { user } = response;
  //   setUser(user.uid);
  // };
  // if (!user) {
  //   console.log('zzasdfasdfasdf');
  //   modal.info({ title: 'aa', content: <div>abcd</div> });
  // }

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

  return <StyledApp>{<LoginModal visible={!!!user} />}</StyledApp>;
};

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  // background-color: black;
`;

export default App;
