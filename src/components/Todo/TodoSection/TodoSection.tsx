import React, { useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import {
  Todo,
  TodoPriority,
  TodoStatus,
  UpdateTodoStatus,
  updateTodoStatusRequest,
} from 'service/redux/slices/todosSlice';
import { sortTodos, orderConverter } from 'utils';
import TodoItem from '../TodoItem';
import { StyledTodoSection, StyledContainer } from './styles';
import { useDragDispatch, useDragState } from 'service/context/DnDContext';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface TodoSectionProps {
  title: string;
  tabList: Array<{ key: string; tab: string }>;
  todos: Todo[];
}

const TodoSection: React.FC<TodoSectionProps> = ({ title, tabList, todos }) => {
  const { t, i18n } = useTranslation();
  const [orderKey, setOrderKey] = useState<string>(t('todoSection.custom'));
  const [activeTab, setActiveTab] = useState<TodoPriority | 'all'>('all');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const dispatch = useDispatch();
  const dndDispatch = useDragDispatch();
  const { dragged } = useDragState();

  const status = title as TodoStatus;

  const handleChangeOrder = ({ key }: { key: string }) => {
    setOrderKey(key);
  };

  const handleTabChange = (key: TodoPriority | 'all'): void => {
    setActiveTab(key);
  };

  const orderedAndFilteredTodos = filterByPriority(
    activeTab,
    sortTodos(
      todos,
      i18n.language === 'en' ? orderKey : orderConverter(orderKey),
    ),
  );

  const handleDrageLeave = () => {
    setIsDragOver(false);
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

  const menu = (
    <Menu onClick={handleChangeOrder}>
      <Menu.Item key="custom">{t('todoSection.custom')}</Menu.Item>
      <Menu.Item key="latest">{t('todoSection.latest')}</Menu.Item>
      <Menu.Item key="oldest">{t('todoSection.oldest')}</Menu.Item>
      <Menu.Item key="priority">{t('todoSection.priority')}</Menu.Item>
      <Menu.Item key="due">{t('todoSection.due')}</Menu.Item>
    </Menu>
  );

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
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
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

const filterByPriority = (
  priority: TodoPriority | 'all',
  todos: Todo[],
): Todo[] => {
  if (priority === 'all') return todos;
  return todos.filter((todo) => todo.priority === priority);
};
