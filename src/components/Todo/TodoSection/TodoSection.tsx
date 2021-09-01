import { Card, Menu, Dropdown } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Todo } from 'service/redux/slices/todosSlice';
import TodoItem from '../TodoItem/TodoItem';
import { Button } from 'antd/lib/radio';

interface TodoSectionProps {
  title: string;
  tabList: Array<{ key: string; tab: string }>;
  todos: Todo[];
}

const todo: Todo = {
  id: 'string',
  user: 'string',
  text: 'string',
  due: new Date(),
  status: 'onGoing',
  priority: 'high',
  category: 'work',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const TodoSection: React.FC<TodoSectionProps> = ({ title, tabList, todos }) => {
  const [orderKey, setOrderKey] = useState<string>('사용자지정');

  const onTabChange = (key: string) => {
    console.log(key);
  };

  const handleChangeOrder = ({ key }: { key: string }) => {
    setOrderKey(key);
  };

  const menu = (
    <Menu onClick={handleChangeOrder}>
      <Menu.Item key="사용자지정">사용자지정</Menu.Item>
      <Menu.Item key="신규순">신규순</Menu.Item>
      <Menu.Item key="오래된순">오래된순</Menu.Item>
      <Menu.Item key="중요도">중요도</Menu.Item>
      <Menu.Item key="마감임박">마감임박</Menu.Item>
    </Menu>
  );

  // TODO: order 로 정렬하고 출력하기
  // const orderedAndFilteredTodos = orederBy(orderKey);
  return (
    <StyledTodoSection
      className="todoSection"
      title={title}
      tabList={tabList}
      onTabChange={onTabChange}
      // TODO: activeTabKey
      extra={
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          {/* <Button>{orderKey}</Button> */}
          <Button>{orderKey}</Button>
        </Dropdown>
      }
      style={{ width: '100%' }}
    >
      <StyledContainer>
        {todos.map((todo) => (
          <TodoItem todo={todo} />
        ))}
        <TodoItem todo={todo} />
        <TodoItem todo={todo} />
        <TodoItem todo={todo} />
        <TodoItem todo={todo} />
        <TodoItem todo={todo} />
      </StyledContainer>
    </StyledTodoSection>
  );
};

export default TodoSection;

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
