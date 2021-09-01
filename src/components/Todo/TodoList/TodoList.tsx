import React from 'react';
import styled from 'styled-components';
import TodoSection from '../TodoSection';
import { useSelector } from 'react-redux';
import { Todo, todosSelector } from 'service/redux/slices/todosSlice';

const tabList = [
  {
    key: '전체',
    tab: '전체',
  },
  {
    key: '낮음',
    tab: '낮음',
  },
  {
    key: '중간',
    tab: '중간',
  },
  {
    key: '높음',
    tab: '높음',
  },
];

const TodoList: React.FC = () => {
  // NOTE: todos 가져와서 stats 별로 나누고 넣어주기
  const todos = useSelector(todosSelector).todos;

  const notStartedTodos = todos.filter(
    (todo: Todo) => todo.status === 'notStarted',
  );
  const onGoingTodos = todos.filter((todo: Todo) => todo.status === 'onGoing');
  const completedTodos = todos.filter(
    (todo: Todo) => todo.status === 'completed',
  );
  return (
    <StyledTodoList>
      <TodoSection title="시작안함" tabList={tabList} todos={notStartedTodos} />
      <TodoSection title="진행중" tabList={tabList} todos={onGoingTodos} />
      <TodoSection title="완료" tabList={tabList} todos={completedTodos} />
    </StyledTodoList>
  );
};

const StyledTodoList = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.tablet`
    flex-direction: column;
  `}
`;

export default TodoList;
