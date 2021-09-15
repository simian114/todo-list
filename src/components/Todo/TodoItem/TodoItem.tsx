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
import { getKST, categoryConverter, priorityConverter } from 'utils';
import EditTodoModal from 'components/EditTodoModal';
import DetailTodoModal from 'components/DetailTodoModal';
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
      <StyledContainer onClick={() => setDetailModal(true)}>
        <StyledDDay passed={DDay < 0}>D-{Math.abs(DDay)}</StyledDDay>
        <StyledBadge
          count={priorityConverter(todo.priority)}
          style={{ backgroundColor: makePriorityColor(todo.priority) }}
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

const makeStatusActionDesc = (status: TodoStatus): string => {
  if (status === 'notStarted') return '시작';
  else return '토글';
};

const makePriorityColor = (priority: TodoPriority): string => {
  if (priority === 'high') return 'red';
  else if (priority === 'middle') return 'blue';
  else return 'green';
};

const makeProgressFormate = (checkList: CheckList) => {
  const checked = checkList
    .map((checkItem) => checkItem.checked)
    .reduce((accu, curr) => {
      return curr ? accu + 1 : accu;
    }, 0);
  if (checkList.length === 0) return <PlusOutlined />;
  if (checkList.length === checked)
    return <CheckOutlined twoToneColor="#52c41a" />;
  return `${checked} / ${checkList.length}`;
};

const makeProgressPercent = (checkList: CheckList) => {
  const checked = checkList
    .map((checkItem) => checkItem.checked)
    .reduce((accu, curr) => {
      return curr ? accu + 1 : accu;
    }, 0);
  if (checkList.length === 0 || checked === 0) return 0;
  return (checked / checkList.length) * 100;
};

export default TodoItem;
