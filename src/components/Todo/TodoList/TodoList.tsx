import React from 'react';
import styled from 'styled-components';
import TodoSection from '../TodoSection';
import { useSelector } from 'react-redux';
import { Todo, todosSelector } from 'service/redux/slices/todosSlice';

const TodoList: React.FC = () => {
  const todos = useSelector(todosSelector).todos;

  const notStartedTodos = todos.filter(
    (todo: Todo) => todo.status === 'notStarted',
  );
  const onGoingTodos = todos.filter((todo: Todo) => todo.status === 'onGoing');
  const completedTodos = todos.filter(
    (todo: Todo) => todo.status === 'completed',
  );
  return (
    <>
      <StyledTodoList>
        <TodoSection
          title="시작안함"
          tabList={tabList}
          todos={notStartedTodos}
        />
        <TodoSection title="진행중" tabList={tabList} todos={onGoingTodos} />
        <TodoSection title="완료" tabList={tabList} todos={completedTodos} />
      </StyledTodoList>
    </>
  );
};

export default TodoList;

const tabList = [
  {
    key: 'all',
    tab: '전체',
  },
  {
    key: 'low',
    tab: '낮음',
  },
  {
    key: 'middle',
    tab: '중간',
  },
  {
    key: 'high',
    tab: '높음',
  },
];

const StyledTodoList = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.tablet`
    flex-direction: column;
  `}
`;
