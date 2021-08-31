import React from 'react';
import styled from 'styled-components';
import Header from './Header';

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      {/* TODO: Footer 가장 마지막에 할것 */}
    </>
  );
};

const Main = styled.main`
  height: calc(100vh-70px);
  padding-top: 70px;
`;

export default Layout;
