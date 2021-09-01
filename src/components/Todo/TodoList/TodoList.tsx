import React from 'react';
import styled from 'styled-components';
import TodoSection from '../TodoSection';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTodosRequest,
  Todo,
  todosSelector,
} from 'service/redux/slices/todosSlice';
import { HeartTwoTone } from '@ant-design/icons';
import { userSelector } from 'service/redux/slices/userSlice';

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

const TodoList: React.FC = () => {
  // NOTE: todos 가져와서 stats 별로 나누고 넣어주기
  const todos = useSelector(todosSelector).todos;
  const user = useSelector(userSelector).uid;
  const dispatch = useDispatch();
  const handleRefresh = () => dispatch(getTodosRequest({ userId: user }));

  const notStartedTodos = todos.filter(
    (todo: Todo) => todo.status === 'notStarted',
  );
  const onGoingTodos = todos.filter((todo: Todo) => todo.status === 'onGoing');
  const completedTodos = todos.filter(
    (todo: Todo) => todo.status === 'completed',
  );
  return (
    <>
      <HeartTwoTone twoToneColor="#eb2f96" onClick={handleRefresh} />
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

const StyledTodoList = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.tablet`
    flex-direction: column;
  `}
`;

export default TodoList;
