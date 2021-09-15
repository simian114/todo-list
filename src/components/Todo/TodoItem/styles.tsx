import { Badge, Card, Tag } from 'antd';
import styled from 'styled-components';

export const StyledStatusAction = styled.div`
  user-select: none;
`;
export const StyledCategoryTag = styled(Tag)`
  margin: 0;
`;
export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &: hover {
    cursor: pointer;
  }
`;
export const StyledDDay = styled.div<{ passed: boolean }>`
  width: 40px;
  margin-left: 10px;
  font-weight: 500;
  background-color: ${({ passed, theme }) =>
    passed ? theme.color.lightRed : theme.color.lightGreen};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
`;
export const StyledBadge = styled(Badge)<{ backgroundColor?: string }>`
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor}`}
`;
export const StyledTodoItem = styled(Card)`
  min-width: 230px;
  width: 230px;
  margin-bottom: 20px;
  ${({ theme }) => theme.tablet`
    max-width: 230px;
  `}
`;
