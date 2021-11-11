import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment, { Moment } from 'moment';
import { Menu, message } from 'antd';
import { addTodoRequest, CreateTodo } from 'service/redux/slices/todosSlice';
import { userSelector } from 'service/redux/slices/userSlice';
import { getKST } from 'utils';
import { useTodoForm } from 'utils/hooks';
import { useTranslation } from 'react-i18next';
import {
  StyledForm,
  StyledInput,
  Temp,
  StyledDatePicker,
  StyledDropdown,
  StyledButton,
  StyledIcon,
  DropdownButton,
} from './styles';

// TODO: 전부 Styles 로 가져오고 Styles.form 와 같은 방법으로 리팩토링하자!
// import * as Styles from './styles';

const todoInitialValue = (category: string, priority: string) => {
  return {
    title: '',
    due: moment(getKST()),
    status: 'notStarted',
    category,
    priority,
  };
};

const TodoForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const {
    values,
    handleInputChange,
    handleDateChange,
    handleChangeCategory,
    handleChangePriority,
    initValues,
  } = useTodoForm(todoInitialValue(t('category.work'), t('priority.middle')));
  const user = useSelector(userSelector).uid;
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: 비동기 에러가 아니기 때문에 굳이 dispatch 를 사용하지는 않는다.
    if (!checkInputValidity(values.title)) {
      message.error({
        content: t('todoform.validity'),
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
      <Menu.Item key="work">{t('category.work')}</Menu.Item>
      <Menu.Item key="study">{t('category.study')}</Menu.Item>
      <Menu.Item key="life">{t('category.life')}</Menu.Item>
      <Menu.Item key="exercise">{t('category.exercise')}</Menu.Item>
      <Menu.Item key="etc">{t('category.etc')}</Menu.Item>
    </Menu>
  );
  const PriorityMenu = (
    <Menu onClick={handleChangePriority}>
      <Menu.Item key="middle">{t('priority.middle')}</Menu.Item>
      <Menu.Item key="high">{t('priority.high')}</Menu.Item>
      <Menu.Item key="low">{t('priority.low')}</Menu.Item>
    </Menu>
  );
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        value={values.title}
        onChange={handleInputChange}
        placeholder={t('todoform.placeholder')}
      />
      <Temp>
        <StyledDatePicker
          onChange={handleDateChange}
          value={values.due}
          disabledDate={disabledDate}
        />
        <StyledDropdown overlay={menu} placement="bottomLeft" arrow>
          <DropdownButton lang={i18n.language}>
            {values.category}
          </DropdownButton>
        </StyledDropdown>

        <StyledDropdown overlay={PriorityMenu} placement="bottomLeft" arrow>
          <DropdownButton lang={i18n.language}>
            {values.priority}
          </DropdownButton>
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
    priority: values.priority,
    category: values.category,
  };
}

function disabledDate(current: Moment) {
  return current < moment().startOf('day');
}

export default TodoForm;
