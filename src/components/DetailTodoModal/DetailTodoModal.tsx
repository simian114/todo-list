import React, { useState } from 'react';
import { Modal } from 'antd';
import { Todo, updateTodoRequest } from 'service/redux/slices/todosSlice';
import { getDate } from 'utils';
import CheckList from './CheckList';
import { useDispatch } from 'react-redux';
import { StyledTitle, StyledDescription, StyledDate } from './styles';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
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
      okText={t('Modal.DetailOkText')}
      onOk={updateCheckList}
      cancelText={t('Modal.DetailCancelText')}
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
        {t('Modal.DetailCreatedAt')}:{' '}
        {todo.createdAt.toLocaleString(i18n.language)}
        <br />
        {t('Modal.DetailDue')}: {todo.updatedAt.toLocaleString(i18n.language)}
      </StyledDate>
    </Modal>
  );
};

export default DetailTodoModal;
