import React, { useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import {
  Todo,
  TodoPriority,
  TodoStatus,
  UpdateTodoStatus,
  updateTodoStatusRequest,
} from 'service/redux/slices/todosSlice';
import { sortTodos, statusConverter } from 'utils';
import TodoItem from '../TodoItem';
import { StyledTodoSection, StyledContainer } from './styles';
import { useDragDispatch, useDragState } from 'service/context/DnDContext';
import { useDispatch } from 'react-redux';

interface TodoSectionProps {
  title: string;
  tabList: Array<{ key: string; tab: string }>;
  todos: Todo[];
}

const TodoSection: React.FC<TodoSectionProps> = ({ title, tabList, todos }) => {
  const [orderKey, setOrderKey] = useState<string>('사용자지정');
  const [activeTab, setActiveTab] = useState<TodoPriority | 'all'>('all');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const dispatch = useDispatch();
  const dndDispatch = useDragDispatch();
  const { dragged } = useDragState();

  const status: TodoStatus = statusConverter(title) as TodoStatus;

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

  const handleDrageLeave = () => {
    setIsDragOver(false);
    // console.log('leave!');
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDragOver) return;
    dndDispatch({ type: 'BOX' });
    setIsDragOver(true);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const updateTodoStatus: UpdateTodoStatus = { id: dragged!, status };
    dispatch(updateTodoStatusRequest({ updateTodoStatus }));
    dndDispatch({ type: 'INIT' });
  };
  return (
    <StyledTodoSection
      title={title}
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={(key) => handleTabChange(key as TodoPriority | 'all')}
      onDragOver={handleDragOver}
      onDragLeave={handleDrageLeave}
      onDrop={handleDrop}
      isdragover={isDragOver ? 1 : 0}
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
