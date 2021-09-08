import { Form, Button, Checkbox, Input } from 'antd';
import styled from 'styled-components';

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0;
`;
export const StyledButton = styled(Button)<{ hidden?: boolean }>`
  ${({ hidden }) => hidden && `display: none;`}
`;
export const StyledCheckBox = styled(Checkbox)<{ hidden?: boolean }>`
  ${({ hidden }) => hidden && `display: none;`}
  margin-bottom: 0;
`;
export const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledCheckboxInput = styled(Input)<{ hidden?: boolean }>`
  ${({ hidden }) => hidden && `display: none;`}
`;
