import React, { useState } from 'react';
import { Modal } from 'antd';
import { Todo, updateTodoRequest } from 'service/redux/slices/todosSlice';
import { getDate } from 'utils';
import CheckList from './CheckList';
import { useDispatch } from 'react-redux';
import { StyledTitle, StyledDescription, StyledDate } from './styles';

interface DetailTodoModalProps {
  visible: boolean;
  todo: Todo;
  closeModal: () => void;
  edit: () => void;
}

const DetailTodoModal: React.FC<DetailTodoModalProps> = ({
  visible,
  todo: todoProp,
  closeModal,
  edit,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [todo, setTodo] = useState({ ...todoProp });
  const dispatch = useDispatch();

  const updateCheckList = () => {
    const updateTodo = { ...todo };
    dispatch(updateTodoRequest({ updateTodo }));
    closeModal();
  };

  return (
    <Modal
      visible={visible}
      okText="적용"
      onOk={updateCheckList}
      cancelText="닫기"
      onCancel={closeModal}
    >
      <StyledTitle>{todo.title}</StyledTitle>
      {!!todo.description && (
        <>
          <StyledDescription>{todo.description}</StyledDescription>
          <br />
        </>
      )}
      <CheckList
        todo={todo}
        isEdit={isEdit}
        handleEditToggle={() => setIsEdit(!isEdit)}
        setTodo={setTodo}
      />
      <br />
      <StyledDate>
        생성 날짜: {getDate(todo.createdAt)}
        <br />
        목표 날짜: {getDate(todo.updatedAt)}
      </StyledDate>
    </Modal>
  );
};

export default DetailTodoModal;
