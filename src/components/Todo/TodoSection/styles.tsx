import styled from 'styled-components';
import { Card } from 'antd';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.tablet`
    // TODO: 그리드로 변경하기 display: grid; 
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  `}
  width: 100%;
`;
export const StyledTodoSection = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  ${({ theme }) => theme.tablet`
    & + & {
      margin-top: 20px;
    }
    align-items: none;
    margin: auto;
  `}
`;
