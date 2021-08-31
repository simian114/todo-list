import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'service/redux/slices/userSlice';
import styled from 'styled-components';
import LoginModal from './components/LoginModal/LoginModal';
import Temp from './components/Temp/Temp';
import { Todo, todosSelector } from './service/redux/slices/todosSlice';

const App: React.FC = () => {
  const user = useSelector(userSelector).uid;
  const todos = useSelector(todosSelector).todos;

  return (
    <StyledApp>
      <Temp />
      {todos.map((todo: Todo) => {
        return <TodoItem key={todo.id}>{todo.due.toDateString()}</TodoItem>;
      })}
      {<LoginModal visible={!!!user} />}
    </StyledApp>
  );
};

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
`;

const TodoItem = styled.div`
  widht: 300px;
  height: 200px;
  background-color: pink;
`;

export default App;
