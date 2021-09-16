import styled, { css } from 'styled-components';
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

export const StyledTodoSection = styled(Card)<{ isdragover?: number }>`
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
  height: 100%;
  z-index: ${({ isdragover }) => (isdragover ? `100` : `inherit`)};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px;
  transition: all 0.3s ease-in-out;
  ${({ isdragover }) =>
    isdragover &&
    css`
      box-shadow: rgba(0, 0, 0, 0.22) 0px 19px 43px;
      transform: translate3d(0px, -1px, 0px);
    `}
`;
