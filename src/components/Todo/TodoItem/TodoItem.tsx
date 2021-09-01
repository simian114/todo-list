import { Badge, Card, Popconfirm, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import {
  removeTodoRequest,
  Todo,
  TodoCategory,
  TodoPriority,
  TodoStatus,
  UpdateTodo,
  updateTodoRequest,
} from 'service/redux/slices/todosSlice';
import styled from 'styled-components';
import { getKST, categoryConverter } from 'utils';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { priorityConverter, statusConverter } from 'utils';
import { useDispatch } from 'react-redux';
import EditTodoModal from 'components/EditTodoModal';

interface TodoItemPRops {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemPRops> = ({ todo }) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState<boolean>(false);
  const handleToggleEdit = () => {
    setEditModal(!editModal);
  };

  const handleClickChangeStatus = () => {
    const { id, status } = todo;
    const options = {
      notStarted: 'onGoing',
      onGoing: 'completed',
      completed: 'onGoing',
    };
    const updateTodo: UpdateTodo = {
      id,
      status: options[status] as TodoStatus,
    };
    dispatch(updateTodoRequest({ updateTodo }));
  };

  const handleDelete = () => {
    dispatch(removeTodoRequest({ id: todo.id }));
  };

  const today = getKST();
  const DDay = moment(todo.due).diff(moment(today), 'day');
  return (
    <StyledTodoItem
      title={todo.text}
      extra={
        <StyledCategoryTag color={makeCategoryTagColor(todo.category)}>
          {categoryConverter(todo.category)}
        </StyledCategoryTag>
      }
      actions={[
        <EditOutlined onClick={handleToggleEdit} />,
        <Popconfirm
          title="정말로 삭제하시겠습니까?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
        >
          <DeleteOutlined />
        </Popconfirm>,
        <StyledStatusAction onClick={handleClickChangeStatus}>
          {makeStatusActionDesc(todo.status)}
        </StyledStatusAction>,
      ]}
    >
      <StyledContainer>
        <StyledDDay passed={DDay < 0}>D-{DDay}</StyledDDay>
        <StyledBadge
          count={priorityConverter(todo.priority)}
          style={{ backgroundColor: makePriorityColor(todo.priority) }}
        />
        <StyledBadge
          status={makeBadgeStatus(todo.status)}
          text={statusConverter(todo.status)}
        />
      </StyledContainer>
      {editModal && (
        <EditTodoModal
          visible={editModal}
          closeModal={handleToggleEdit}
          todo={todo}
        />
      )}
    </StyledTodoItem>
  );
};

const makeCategoryTagColor = (category: TodoCategory): string => {
  if (category === 'etc') return 'cyan';
  else if (category === 'exercise') return 'green';
  else if (category === 'life') return 'lime';
  else if (category === 'study') return 'gold';
  else return 'red';
};

const makeStatusActionDesc = (status: TodoStatus): string => {
  if (status === 'notStarted') return '시작';
  else return '토글';
};

const makePriorityColor = (priority: TodoPriority): string => {
  if (priority === 'high') return 'red';
  else if (priority === 'middle') return 'blue';
  else return 'green';
};

const makeBadgeStatus = (status: TodoStatus) => {
  if (status === 'onGoing') return 'processing';
  else if (status === 'notStarted') return 'default';
  else return 'success';
};

const StyledStatusAction = styled.div`
  user-select: none;
`;

const StyledCategoryTag = styled(Tag)`
  margin: 0;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDDay = styled.div<{ passed: boolean }>`
  width: 40px;
  margin-left: 10px;
  font-weight: 500;
  background-color: ${({ passed, theme }) =>
    passed ? theme.color.lightRed : theme.color.lightGreen};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
`;

const StyledBadge = styled(Badge)<{ backgroundColor?: string }>`
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor}`}
`;

const StyledTodoItem = styled(Card)`
  min-width: 230px;
  width: 230px;
  background-colir: pink;
  margin-bottom: 20px;
  ${({ theme }) => theme.tablet`
    max-width: 230px;
  `}
`;

export default TodoItem;
