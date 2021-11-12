import React from 'react';
import { useSelector } from 'react-redux';
import DragProvider from 'service/context/DnDContext';
import { Todo, todosSelector } from 'service/redux/slices/todosSlice';
import TodoSection from '../TodoSection';
import { StyledTodoList } from './styles';
import { useTranslation } from 'react-i18next';

const statusList = ['notStarted', 'onGoing', 'completed'];
const priority = ['all', 'low', 'middle', 'high'];

const TodoList: React.FC = () => {
  const todos = useSelector(todosSelector).todos;
  const { t, i18n } = useTranslation();

  const tabList = priority.map((key) => {
    return {
      key,
      // NOTE: t 의 두번째 인자에 값을 넣으면 default value 가 된다.
      tab: t(`priority.${key}`, i18n.language === 'en' ? 'all' : '전체'),
    };
  });
  return (
    <DragProvider>
      <StyledTodoList>
        {statusList.map((status) => (
          <TodoSection
            key={status}
            // title={t(`status.${status}`)}
            title={status}
            tabList={tabList}
            todos={todos.filter((todo: Todo) => todo.status === status)}
          ></TodoSection>
        ))}
      </StyledTodoList>
    </DragProvider>
  );
};

export default TodoList;
