import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';
import { Button, Menu, message } from 'antd';
import {
  addTodoRequest,
  CreateTodo,
  TodoCategory,
  TodoPriority,
} from 'service/redux/slices/todosSlice';
import { userSelector } from 'service/redux/slices/userSlice';
import { getKST, categoryConverter, priorityConverter } from 'utils';
import { useTodoForm } from 'utils/hooks';
import {
  StyledForm,
  StyledInput,
  Temp,
  StyledDatePicker,
  StyledDropdown,
  StyledButton,
  StyledIcon,
} from './styles';

const todoInitialValue = {
  title: '',
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
    // NOTE: 비동기 에러가 아니기 때문에 굳이 dispatch 를 사용하지는 않는다.
    if (!checkInputValidity(values.title)) {
      message.error({
        content: '입력은 최소 1자부터 최대 50자 까지 가능합니다.',
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
        value={values.title}
        onChange={handleInputChange}
        placeholder="todo 입력하세요"
      />
      <Temp>
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
      </Temp>
    </StyledForm>
  );
};

const checkInputValidity = (title: string) => {
  return !(!title || title.length > 50);
};

function makeCreateTodo(user: string, values: any): CreateTodo {
  return {
    user,
    title: values.title,
    due: values.due.toDate(),
    status: 'notStarted',
    priority: priorityConverter(values.priority) as TodoPriority,
    category: categoryConverter(values.category) as TodoCategory,
  };
}

function disabledDate(current: Moment) {
  return current < moment().startOf('day');
}

export default TodoForm;
