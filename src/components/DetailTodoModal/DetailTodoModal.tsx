import React from 'react';
import { Modal, Checkbox } from 'antd';
import { Todo } from 'service/redux/slices/todosSlice';
import styled from 'styled-components';
import { getDate } from 'utils';

interface DetailTodoModalProps {
  visible: boolean;
  todo: Todo;
  closeModal: () => void;
  edit: () => void;
}

const DetailTodoModal: React.FC<DetailTodoModalProps> = ({
  visible,
  todo,
  closeModal,
  edit,
}) => {
  return (
    <Modal
      visible={visible}
      okText="종료"
      onOk={closeModal}
      cancelText="수정"
      onCancel={edit}
      closable={false}
      maskClosable={false}
    >
      <StyledTitle>{todo.title}</StyledTitle>
      {!!todo.description && (
        <>
          <StyledDescription>{todo.description}</StyledDescription>
          <br />
        </>
      )}
      <StyledCheckList>
        {/* TODO: 체크박스와 아이템 */}
        체크리스트
        <StyledListItem>
          <Checkbox>text를 title로 수정</Checkbox>
        </StyledListItem>
        <StyledListItem>
          <Checkbox>description 필드 생성</Checkbox>
        </StyledListItem>
        <StyledListItem>
          <Checkbox>detail modal 컴포넌트 생성</Checkbox>
        </StyledListItem>
        <StyledListItem>
          <Checkbox>checklist 필드 생성</Checkbox>
        </StyledListItem>
      </StyledCheckList>
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

const StyledDate = styled.p``;

const StyledTitle = styled.h1`
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
  font-size: 18px;
`;

const StyledDescription = styled.p`
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
  font-size: 16px;
`;

const StyledCheckList = styled.ul`
  font-weight: 600px;
  font-size: 16px;
  font-style: italic;
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
`;

const StyledListItem = styled.li`
  font-size: 14px;
  font-style: normal;
`;
