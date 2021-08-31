import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from 'service/redux/slices/userSlice';
import styled from 'styled-components';
import LoginModal from './components/LoginModal/LoginModal';
import Temp from './components/Temp/Temp';
import {
  removeTodoRequest,
  Todo,
  todosSelector,
  updateTodoRequest,
} from './service/redux/slices/todosSlice';

const App: React.FC = () => {
  const user = useSelector(userSelector).uid;
  const todos = useSelector(todosSelector).todos;
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeTodoRequest({ id }));
  };
  const handleUpdate = (id: string) => {
    const temp = {
      id,
      text: '12341234',
    };
    dispatch(updateTodoRequest({ updateTodo: temp }));
  };

  return (
    <StyledApp>
      <Temp />
      {todos.map((todo: Todo) => {
        return (
          <TodoItem key={todo.id}>
            {todo.id}
            <br />
            {todo.due.toDateString()}
            <br />
            {todo.text}
            <button onClick={() => handleRemove(todo.id)}>삭제</button>
            <button onClick={() => handleUpdate(todo.id)}>업데이트</button>
          </TodoItem>
        );
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
