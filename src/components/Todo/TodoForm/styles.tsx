import styled from 'styled-components';
import { Button, DatePicker, Dropdown, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const Temp = styled.div`
  display: flex;
`;
export const StyledDropdown = styled(Dropdown)`
  height: 50px;
  ${({ theme }) => theme.tablet` 
    flex: 1;
  `};
`;
export const StyledIcon = styled(PlusOutlined)`
  font-size: 25px;
`;
export const StyledDatePicker = styled(DatePicker)`
  width: 180px;
  ${({ theme }) => theme.tablet` 
    flex: 1;
  `};
`;
export const StyledForm = styled.form`
  display: flex;
  width: 100%;

  ${({ theme }) => theme.tablet` 
    flex-direction: column;
  `};
`;
export const StyledInput = styled(Input)`
  height: 50px;
  font-size: 20px;
`;
export const StyledButton = styled(Button)`
  height: 50px;
  margin: auto;
  display: flex;
  align-items: center;
`;
