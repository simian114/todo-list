import { Card, Menu, Dropdown, Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Todo, TodoPriority } from 'service/redux/slices/todosSlice';
import TodoItem from '../TodoItem/TodoItem';
import { sortTodos } from 'utils';

interface TodoSectionProps {
  title: string;
  tabList: Array<{ key: string; tab: string }>;
  todos: Todo[];
}

const TodoSection: React.FC<TodoSectionProps> = ({ title, tabList, todos }) => {
  const [orderKey, setOrderKey] = useState<string>('사용자지정');
  const [activeTab, setActiveTab] = useState<TodoPriority | 'all'>('all');

  const handleChangeOrder = ({ key }: { key: string }) => {
    setOrderKey(key);
  };

  const handleTabChange = (key: TodoPriority | 'all'): void => {
    setActiveTab(key);
  };

  const orderedAndFilteredTodos = filterByPriority(
    activeTab,
    sortTodos(todos, orderKey),
  );
  return (
    <StyledTodoSection
      className="todoSection"
      title={title}
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={(key) => handleTabChange(key as TodoPriority | 'all')}
      extra={
        <Dropdown
          overlay={dropdownMenu(handleChangeOrder)}
          placement="bottomLeft"
          arrow
        >
          <Button>{orderKey}</Button>
        </Dropdown>
      }
      style={{ width: '100%' }}
    >
      <StyledContainer>
        {orderedAndFilteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </StyledContainer>
    </StyledTodoSection>
  );
};

export default TodoSection;

const dropdownMenu = (
  handler: ({ key }: { key: string }) => void,
): JSX.Element => {
  return (
    <Menu onClick={handler}>
      <Menu.Item key="사용자지정">사용자지정</Menu.Item>
      <Menu.Item key="최신순">최신순</Menu.Item>
      <Menu.Item key="오래된순">오래된순</Menu.Item>
      <Menu.Item key="중요도">중요도</Menu.Item>
      <Menu.Item key="마감임박">마감임박</Menu.Item>
    </Menu>
  );
};

const filterByPriority = (
  priority: TodoPriority | 'all',
  todos: Todo[],
): Todo[] => {
  if (priority === 'all') return todos;
  return todos.filter((todo) => todo.priority === priority);
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.tablet`
    // TODO: 그리드로 변경하기 display: grid; 
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  `}
  width: 100%;
`;

const StyledTodoSection = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  ${({ theme }) => theme.tablet`
    & + & {
      margin-top: 20px;
    }
    align-items: none;
    margin: auto;
  `}
`;
