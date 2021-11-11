import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';
import moment from 'moment';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import {
  CheckList,
  removeTodoRequest,
  Todo,
  TodoCategory,
  TodoPriority,
  TodoStatus,
  UpdateTodo,
  updateTodoRequest,
} from 'service/redux/slices/todosSlice';
import { getKST } from 'utils';
import EditTodoModal from 'components/EditTodoModal';
import DetailTodoModal from 'components/DetailTodoModal';
import { useTranslation } from 'react-i18next';
import {
  StyledTodoItem,
  StyledCategoryTag,
  StyledStatusAction,
  StyledContainer,
  StyledDDay,
  StyledBadge,
  StyledProgress,
} from './styles';

interface TodoItemPRops {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemPRops> = ({ todo }) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState<boolean>(false);
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const { t } = useTranslation();
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
  const handleEditInDetail = () => {
    setEditModal(true);
  };

  const today = getKST();
  const DDay = moment(todo.due).diff(moment(today).startOf('day'), 'day');
  return (
    <StyledTodoItem
      title={todo.title}
      extra={
        <StyledCategoryTag color={makeCategoryTagColor(todo.category)}>
          {t(`category.${todo.category}`)}
        </StyledCategoryTag>
      }
      actions={[
        <EditOutlined onClick={handleToggleEdit} />,
        <Popconfirm
          title={t(`todoItem.popTitle`)}
          okText={t(`todoItem.yes`)}
          cancelText={t(`todoItem.no`)}
          onConfirm={handleDelete}
        >
          <DeleteOutlined />
        </Popconfirm>,
        <StyledStatusAction onClick={handleClickChangeStatus}>
          {t(`todoItem.${todo.status}`)}
        </StyledStatusAction>,
      ]}
    >
      <StyledContainer onClick={() => setDetailModal(true)}>
        <StyledDDay passed={DDay < 0}>D-{Math.abs(DDay)}</StyledDDay>
        <StyledBadge
          count={t(`priority.${todo.priority}`)}
          style={{
            backgroundColor: makePriorityColor(todo.priority),
            width: '55px',
          }}
        />
        <StyledProgress
          type="circle"
          width={40}
          percent={makeProgressPercent(todo.checkList)}
          format={() => makeProgressFormate(todo.checkList)}
        />
      </StyledContainer>
      {editModal && (
        <EditTodoModal
          visible={editModal}
          closeModal={handleToggleEdit}
          todo={todo}
        />
      )}
      {detailModal && (
        <DetailTodoModal
          visible={detailModal}
          closeModal={() => setDetailModal(false)}
          todo={todo}
          edit={handleEditInDetail}
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

const makePriorityColor = (priority: TodoPriority): string => {
  if (priority === 'high') return 'red';
  else if (priority === 'middle') return 'blue';
  else return 'green';
};

const makeProgressFormate = (checkList: CheckList) => {
  const checked = checkList
    .map((checkItem) => checkItem.checked)
    .reduce((accu, curr) => (curr ? accu + 1 : accu), 0);
  if (!checkList.length) return <PlusOutlined />;
  if (checkList.length === checked)
    return <CheckOutlined twoToneColor="#52c41a" />;
  return `${checked} / ${checkList.length}`;
};

const makeProgressPercent = (checkList: CheckList) => {
  const checked = checkList
    .map((checkItem) => checkItem.checked)
    .reduce((accu, curr) => (curr ? accu + 1 : accu), 0);
  if (!checkList.length || !checked) return 0;
  return (checked / checkList.length) * 100;
};

export default TodoItem;
