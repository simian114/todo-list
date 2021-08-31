import React, { useState } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { Button, DatePicker, Dropdown, Input, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getKST } from 'utils';
import categoryConverter from '../../utils/categoryConverter';

const TodoForm: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [due, setDue] = useState<Moment>(moment(getKST()));
  const [category, setCategory] = useState('업무');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('----------- submit -----------');
    console.log(`input: ${value}`);
    console.log(`due: ${due}`);
    console.log(`category: ${categoryConverter(category)}`);
    console.log('------------------------------');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleDateChange = (date: Moment | null) => {
    if (!date) return;
    setDue(date);
  };

  const handleChangeCategory = ({ key }: { key: string }) => {
    setCategory(key);
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

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput onChange={handleInputChange} placeholder="todo 입력하세요" />
      <StyledDatePicker
        onChange={handleDateChange}
        value={due}
        disabledDate={disabledDate}
      />
      <StyledDropdown overlay={menu} placement="bottomLeft" arrow>
        <Button>{category}</Button>
      </StyledDropdown>
      {/* TODO: loading 넣기 */}
      <StyledButton htmlType="submit" size="large" loading={false}>
        <StyledIcon />
      </StyledButton>
    </StyledForm>
  );
};

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
