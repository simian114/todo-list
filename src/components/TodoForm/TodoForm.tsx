import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { Button, DatePicker, Dropdown, Input, Menu, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  addTodoRequest,
  CreateTodo,
  TodoCategory,
  TodoPriority,
} from 'service/redux/slices/todosSlice';
import { userSelector } from 'service/redux/slices/userSlice';
import { getKST, categoryConverter, priorityConverter } from 'utils';
import { useTodoForm } from 'utils/hooks';

const todoInitialValue = {
  text: '',
  due: moment(getKST()),
  status: 'notStarted',
  category: '업무',
  priority: '중간',
};

const TodoForm: React.FC = () => {
  const {
    values,
    handleInputChange,
    handleDateChange,
    handleChangeCategory,
    handleChangePriority,
    initValues,
  } = useTodoForm(todoInitialValue);
  const user = useSelector(userSelector).uid;
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.text || values.text.length > 50) {
      message.error({
        content: '입력은 최대 100자 까지 가능합니다.',
        duration: 1,
      });
      return;
    }
    const todo: CreateTodo = makeCreateTodo(user, values);
    dispatch(addTodoRequest({ todo }));
    initValues();
  };

  const menu = (
    <Menu onClick={handleChangeCategory}>
      <Menu.Item key="업무">업무</Menu.Item>
      <Menu.Item key="공부">공부</Menu.Item>
      <Menu.Item key="일상">일상</Menu.Item>
      <Menu.Item key="운동">운동</Menu.Item>
      <Menu.Item key="기타">기타</Menu.Item>
    </Menu>
  );
  const PriorityMenu = (
    <Menu onClick={handleChangePriority}>
      <Menu.Item key="중간">중간</Menu.Item>
      <Menu.Item key="높음">높음</Menu.Item>
      <Menu.Item key="낮음">낮음</Menu.Item>
    </Menu>
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        value={values.text}
        onChange={handleInputChange}
        placeholder="todo 입력하세요"
      />
      <StyledDatePicker
        onChange={handleDateChange}
        value={values.due}
        disabledDate={disabledDate}
      />
      <StyledDropdown overlay={menu} placement="bottomLeft" arrow>
        <Button>{values.category}</Button>
      </StyledDropdown>

      <StyledDropdown overlay={PriorityMenu} placement="bottomLeft" arrow>
        <Button>{values.priority}</Button>
      </StyledDropdown>
      {/* TODO: loading 넣기 */}
      <StyledButton htmlType="submit" size="large" loading={false}>
        <StyledIcon />
      </StyledButton>
    </StyledForm>
  );
};

function makeCreateTodo(user: string, values: any): CreateTodo {
  return {
    user,
    text: values.text,
    due: values.due.toDate(),
    status: 'notStarted',
    priority: priorityConverter(values.priority) as TodoPriority,
    category: categoryConverter(values.category) as TodoCategory,
  };
}

function disabledDate(current: Moment) {
  return current < moment().startOf('day');
}

const StyledDropdown = styled(Dropdown)`
  height: 50px;
`;

const StyledIcon = styled(PlusOutlined)`
  font-size: 25px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 180px;
`;

const StyledForm = styled.form`
  display: flex;
  width: 100%:
`;

const StyledInput = styled(Input)`
  height: 50px;
  font-size: 20px;
`;

const StyledButton = styled(Button)`
  height: 50px;
  margin: auto;
  display: flex;
  align-items: center;
`;

export default TodoForm;
