import styled from 'styled-components';

export const StyledTodoList = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.tablet`
    flex-direction: column;
  `}
`;
